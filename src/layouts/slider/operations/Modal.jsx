
import { Grid, Typography } from "@mui/material"
import { unwrapResult } from "@reduxjs/toolkit"
import MDBox from "components/MDBox"
import MDButton from "components/MDButton"
import MDInput from "components/MDInput"
import ModalCom from "components/MDModal"
import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { createSlider } from "redux/reducers/Units"
import * as Yup from "yup"

const SlideSchema = Yup.object({
    image: Yup.mixed().required(),
    name: Yup.string().required()
})

export default (props) => {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            image: "",
            name: ""
        },
        validationSchema: SlideSchema,
        onSubmit: (values) => {
            const formData = new FormData()
            for (const name in values) {
                formData.append(name, values[name])
            }
            dispatch(createSlider(formData)).then(unwrapResult)
            formik.handleReset()
            props?.toggle()
        }
    })

    return (
        <ModalCom {...props}>
            <MDBox onSubmit={formik.handleSubmit} component="form" role="form" sx={{ flexGrow: 1 }}>
                <Typography mb={3}>Yangi slide qo'shish</Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} display="grid" gap={2}>
                        <MDInput type="name" name="name" defaultValue={formik.values.link} fullWidth onChange={formik.handleChange} onBlur={formik.handleBlur} label="Name" />
                    </Grid>
                    <Grid item xs={12}>
                        <MDInput type="file" inputProps={{ accept: ".png,.jpg,.jpeg" }} fullWidth name="image" onChange={(event) => {
                            formik.setFieldValue("image", event.target.files[0])
                        }} label="File" />
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