
import { Grid, TextField, Typography } from "@mui/material"
import { unwrapResult } from "@reduxjs/toolkit"
import MDBox from "components/MDBox"
import MDButton from "components/MDButton"
import MDInput from "components/MDInput"
import ModalCom from "components/MDModal"
import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { createCategory } from "redux/reducers/Category"
import * as Yup from "yup"

const CategorySchema = Yup.object({
    image: Yup.mixed(),
    name: Yup.string().required(),
    description: Yup.string().required()
})

export default (props) => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const formik = useFormik({
        initialValues: {
            name: null,
            description: null,
            parent_id: id,
            level: 2
        },
        validationSchema: CategorySchema,
        onSubmit: (val) => {
            dispatch(createCategory(val)).then(unwrapResult).then(() => {
                formik.handleReset()
                props?.toggle()
            })
        }
    })
    return (
        <ModalCom {...props}>
            <MDBox onSubmit={formik.handleSubmit} component="form" role="form" sx={{ flexGrow: 1 }}>
                <Typography mb={3}>Yangi sub kategorya qo'shish</Typography>
                <Grid container spacing={4}>
                    {/* <Grid item xs={12}>
                        <MDInput type="file" accept="image/png,image/jpg,image/jpeg" fullWidth name="image" onChange={(event) => {
                            formik.setFieldValue("image", event.target.files[0])
                        }} label="File" />
                    </Grid> */}
                    <Grid item xs={12}>
                        <MDInput name="name" fullWidth onChange={formik.handleChange} onBlur={formik.handleBlur} label="Nomi" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="outlined-multiline-flexible"
                            label="Qisqacha"
                            name="description"
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