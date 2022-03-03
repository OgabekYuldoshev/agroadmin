
import { Grid, TextField, Typography, FormControl, Select, InputLabel, MenuItem } from "@mui/material"
import { unwrapResult } from "@reduxjs/toolkit"
import MDBox from "components/MDBox"
import MDButton from "components/MDButton"
import MDInput from "components/MDInput"
import ModalCom from "components/MDModal"
import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { updateCategory } from "redux/reducers/Category"
import { updateImage } from "redux/reducers/App"
import * as Yup from "yup"

const CategorySchema = Yup.object({
    image: Yup.mixed(),
    name_uz: Yup.string().required(),
    name_en: Yup.string().required(),
    name_ru: Yup.string().required(),
    description_uz: Yup.string().required(),
    description_en: Yup.string().required(),
    description_ru: Yup.string().required(),
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
            name_uz: found?.name_uz,
            name_ru: found?.name_ru,
            name_en: found?.name_en,
            parent_id: found?.parent_id,
            description_uz: found?.description_uz,
            description_ru: found?.description_ru,
            description_en: found?.description_en,
            is_active: parseInt(found?.is_active) === 1 ? true : false,
            level: found?.level
        },
        validationSchema: CategorySchema,
        onSubmit: (values) => {
            // const formData = new FormData()
            // for (const name in values) {
            //     formData.append(name, values[name])
            // }
            dispatch(updateCategory({ id: props.item?.id, data: values })).then(unwrapResult).then(() => {
                formik.handleReset()
                props?.toggle()
            })
        }
    })
    console.log(found)
    return (
        <ModalCom toggle={props.toggle} open={props.item?.opened} {...props}>
            <MDBox onSubmit={formik.handleSubmit} component="form" role="form" sx={{ flexGrow: 1 }}>
                <Typography mb={3}>O'zgartirish</Typography>
                <Grid container spacing={4}>
                    {
                        parseInt(found?.level) === 1 && (
                            <Grid item xs={12}>
                                <MDInput type="file" accept="image/png,image/jpg,image/jpeg" fullWidth name="image" onChange={(event) => {
                                    const data = new FormData()
                                    data.append('image', event.target.files[0])
                                    dispatch(updateImage({ id: found?.id, model: "Category", data }))
                                    formik.setFieldValue("image", event.target.files[0])
                                }} label="File" />
                            </Grid>
                        )
                    }
                    <Grid item xs={12} display="flex" justifyContent="space-between" gap={2}>
                        <MDInput defaultValue={formik.values.name_uz} name="name_uz" fullWidth onChange={formik.handleChange} onBlur={formik.handleBlur} label="Nomi UZ" />
                        <MDInput defaultValue={formik.values.name_ru} name="name_ru" fullWidth onChange={formik.handleChange} onBlur={formik.handleBlur} label="Nomi RU" />
                        <MDInput defaultValue={formik.values.name_en} name="name_en" fullWidth onChange={formik.handleChange} onBlur={formik.handleBlur} label="Nomi EN" />
                    </Grid>
                    <Grid item xs={12} display="grid" gap={2}>
                        <TextField
                            fullWidth
                            id="outlined-multiline-flexible"
                            label="Qisqacha UZ"
                            name="description_uz"
                            multiline
                            defaultValue={formik.values.description_uz}
                            onChange={formik.handleChange} onBlur={formik.handleBlur}
                        />
                        <TextField
                            fullWidth
                            id="outlined-multiline-flexible"
                            label="Qisqacha RU"
                            name="description_ru"
                            multiline
                            defaultValue={formik.values.description_ru}
                            onChange={formik.handleChange} onBlur={formik.handleBlur}
                        />
                        <TextField
                            fullWidth
                            id="outlined-multiline-flexible"
                            label="Qisqacha UN"
                            name="description_en"
                            multiline
                            defaultValue={formik.values.description_en}
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