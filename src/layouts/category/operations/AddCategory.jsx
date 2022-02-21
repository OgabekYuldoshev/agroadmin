
import { Grid, TextField, Typography } from "@mui/material"
import { unwrapResult } from "@reduxjs/toolkit"
import MDBox from "components/MDBox"
import MDButton from "components/MDButton"
import MDInput from "components/MDInput"
import ModalCom from "components/MDModal"
import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import { createCategory } from "redux/reducers/Category"
import * as Yup from "yup"

const CategorySchema = Yup.object({
    image: Yup.mixed(),
    name_uz: Yup.string().required(),
    name_en: Yup.string().required(),
    name_ru: Yup.string().required(),
    description_uz: Yup.string().required(),
    description_en: Yup.string().required(),
    description_ru: Yup.string().required()

})

export default (props) => {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            image: null,
            name_uz: null,
            name_ru: null,
            name_en: null,
            description_uz: null,
            description_ru: null,
            description_en: null,
            level: 1
        },
        validationSchema: CategorySchema,
        onSubmit: (values) => {
            const formData = new FormData()
            for (const name in values) {
                formData.append(name, values[name])
            }
            dispatch(createCategory(formData)).then(unwrapResult).then(() => {
                formik.handleReset()
                props?.toggle()
            })
        }
    })

    console.log(formik.values)

    return (
        <ModalCom {...props}>
            <MDBox onSubmit={formik.handleSubmit} component="form" role="form" sx={{ flexGrow: 1 }}>
                <Typography mb={3}>Yangi kategorya qo'shish</Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <MDInput type="file" accept="image/png,image/jpg,image/jpeg" fullWidth name="image" onChange={(event) => {
                            formik.setFieldValue("image", event.target.files[0])
                        }} label="File" />
                    </Grid>
                    <Grid item xs={12} display="flex" justifyContent="space-between" gap={2}>
                        <MDInput name="name_uz" fullWidth onChange={formik.handleChange} onBlur={formik.handleBlur} label="Nomi UZ" />
                        <MDInput name="name_ru" fullWidth onChange={formik.handleChange} onBlur={formik.handleBlur} label="Nomi RU" />
                        <MDInput name="name_en" fullWidth onChange={formik.handleChange} onBlur={formik.handleBlur} label="Nomi EN" />
                    </Grid>
                    <Grid item xs={12} display="grid" gap={2}>
                        <TextField
                            fullWidth
                            id="outlined-multiline-flexible"
                            label="Qisqacha UZ"
                            name="description_uz"
                            multiline
                            onChange={formik.handleChange} onBlur={formik.handleBlur}
                        />
                        <TextField
                            fullWidth
                            id="outlined-multiline-flexible"
                            label="Qisqacha RU"
                            name="description_ru"
                            multiline
                            onChange={formik.handleChange} onBlur={formik.handleBlur}
                        />
                        <TextField
                            fullWidth
                            id="outlined-multiline-flexible"
                            label="Qisqacha UN"
                            name="description_en"
                            multiline
                            onChange={formik.handleChange} onBlur={formik.handleBlur}
                        />
                    </Grid>
                    <Grid item xs={12} display="flex" gap={2} justifyContent="flex-end">
                        <MDButton type="button" onClick={props.toggle} color="error">Bekor qilish</MDButton>
                        <MDButton type="submit" disabled={!(formik.isValid && formik.dirty)} color="success">Saqlash</MDButton>
                    </Grid>
                </Grid>
            </MDBox>
        </ModalCom>
    )
}