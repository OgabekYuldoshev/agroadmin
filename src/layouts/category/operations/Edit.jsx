
import { Grid, TextField, Typography, FormControl, Select, InputLabel, MenuItem } from "@mui/material"
import { unwrapResult } from "@reduxjs/toolkit"
import MDBox from "components/MDBox"
import MDButton from "components/MDButton"
import MDInput from "components/MDInput"
import ModalCom from "components/MDModal"
import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { updateCategory } from "redux/reducers/Category"
import * as Yup from "yup"

const CategorySchema = Yup.object({
    image: Yup.mixed(),
    name: Yup.string().required(),
    description: Yup.string().required(),
    is_active: Yup.boolean().required(),
})

export default (props) => {
    const dispatch = useDispatch()
    const { categories } = useSelector(state => state.category)
    const found = categories?.find(item => item.id === props.item?.id)
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            image: null,
            name: found?.name,
            parent_id: found?.parent_id,
            description: found?.description,
            is_active: found?.is_active,
            level: found?.level
        },
        validationSchema: CategorySchema,
        onSubmit: (val) => {
            dispatch(updateCategory({ id: props.item?.id, data: val })).then(unwrapResult).then(() => {
                formik.handleReset()
                props?.toggle()
            })
        }
    })

    return (
        <ModalCom toggle={props.toggle} open={props.item?.opened} {...props}>
            <MDBox onSubmit={formik.handleSubmit} component="form" role="form" sx={{ flexGrow: 1 }}>
                <Typography mb={3}>Yangi sub kategorya qo'shish</Typography>
                <Grid container spacing={4}>
                    {
                        found?.level === 1 && (
                            <Grid item xs={12}>
                                <MDInput type="file" accept="image/png,image/jpg,image/jpeg" fullWidth name="image" onChange={(event) => {
                                    formik.setFieldValue("image", event.target.files[0])
                                }} label="File" />
                            </Grid>
                        )
                    }
                    <Grid item xs={12}>
                        <MDInput name="name" fullWidth onChange={formik.handleChange} onBlur={formik.handleBlur} label="Nomi" value={formik.values.name} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="outlined-multiline-flexible"
                            label="Qisqacha"
                            name="description"
                            multiline
                            value={formik.values.description}
                            onChange={formik.handleChange} onBlur={formik.handleBlur}
                        />
                    </Grid>
                    <Grid item xs={12}>
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
                    </Grid>
                    <Grid item xs={12} display="flex" gap={2} justifyContent="flex-end">
                        <MDButton type="button" onClick={props.toggle} color="error">Bekor qilish</MDButton>
                        <MDButton type="submit" disabled={!(formik.isValid && formik.dirty)} color="success">O'zartirish</MDButton>
                    </Grid>
                </Grid>
            </MDBox>
        </ModalCom >
    )
}