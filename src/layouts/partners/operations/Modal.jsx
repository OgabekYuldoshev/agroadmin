
import { Grid, TextField, Typography, FormControl, Select, InputLabel, MenuItem } from "@mui/material"
import { unwrapResult } from "@reduxjs/toolkit"
import MDBox from "components/MDBox"
import MDButton from "components/MDButton"
import MDInput from "components/MDInput"
import ModalCom from "components/MDModal"
import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { createPartner, updatePartner } from "redux/reducers/Partners"
import { updateImage } from "redux/reducers/App"
import * as Yup from "yup"

const PartnerSchema = Yup.object({
    image: Yup.mixed(),
    name: Yup.string().required(),
    link: Yup.string().required(),
    type_id: Yup.string().required()
})

export default (props) => {
    const dispatch = useDispatch()
    const { partners } = useSelector(state => state.partner)
    const found = partners?.find(item => item.id === props.item?.id)
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            image: null,
            name: found?.name || '',
            link: found?.link || '',
            type_id: found?.type_id || '',
            is_active: found?.is_active || ''
        },
        validationSchema: PartnerSchema,
        onSubmit: (values) => {
            const formData = new FormData()
            for (const name in values) {
                formData.append(name, values[name])
            }
            if (found) {
                dispatch(updatePartner({ id: found?.id, value: formData })).then(unwrapResult).then(() => {
                    formik.handleReset()
                    props?.toggle()
                })
            } else {
                dispatch(createPartner(formData)).then(unwrapResult).then(() => {
                    formik.handleReset()
                    props?.toggle()
                })
            }
        }
    })

    return (
        <ModalCom toggle={props.toggle} open={props.item?.opened} {...props}>
            <MDBox onSubmit={formik.handleSubmit} component="form" role="form" sx={{ flexGrow: 1 }}>
                <Typography mb={3}>Yangi hamkor qo'shish</Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <MDInput type="file" inputProps={{ accept: '.png, .jpg, .jpeg' }} fullWidth name="image" onChange={(event) => {
                            const data = new FormData()
                            data.append('image', event.target.files[0])
                            data.append('model', "Partners")
                            data.append('path', 'partners')
                            dispatch(updateImage({ id: found?.id, data }))
                            formik.setFieldValue("image", event.target.files[0])
                        }} label="File" />
                    </Grid>

                    <Grid item xs={12} display="flex" justifyContent="space-between" gap={2}>
                        <MDInput name="name" defaultValue={formik.values.name} fullWidth onChange={formik.handleChange} onBlur={formik.handleBlur} label="Nomi" />
                    </Grid>
                    <Grid item xs={6} display="grid" gap={2}>
                        <MDInput type="link" name="link" defaultValue={formik.values.link} fullWidth onChange={formik.handleChange} onBlur={formik.handleBlur} label="Web sahifa urli" />
                    </Grid>
                    {found ? (<Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="status">Status</InputLabel>
                            <Select
                                labelId="status"
                                id="status"
                                style={{ padding: '10px 5px' }}
                                defaultValue={formik.values.is_active}
                                label="Status"
                                onChange={(e) => {
                                    formik.setFieldValue('is_active', e.target.value)
                                }}
                            >
                                <MenuItem value={true}>Active</MenuItem>
                                <MenuItem value={false}>Unactive</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>) : (<Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="status">Type</InputLabel>
                            <Select
                                labelId="status"
                                id="status"
                                style={{ padding: '10px 5px' }}
                                defaultValue={formik.values.is_active}
                                label="Status"
                                onChange={(e) => {
                                    formik.setFieldValue('type_id', e.target.value)
                                }}
                            >
                                <MenuItem value={1}>Asosiy Hamkor</MenuItem>
                                <MenuItem value={2}>Hamkor</MenuItem>
                                <MenuItem value={3}>Mijozlar</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>)}

                    <Grid item xs={12} display="flex" gap={2} justifyContent="flex-end">
                        <MDButton type="button" onClick={props.toggle} color="error">Bekor qilish</MDButton>
                        <MDButton type="submit" disabled={!(formik.isValid && formik.dirty)} color="success">O'zartirish</MDButton>
                    </Grid>
                </Grid>
            </MDBox>
        </ModalCom >
    )
}