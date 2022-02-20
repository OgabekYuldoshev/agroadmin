
import { Grid, Typography } from "@mui/material"
import GoogleMap from "components/GoogleMap"
import MDBox from "components/MDBox"
import MDButton from "components/MDButton"
import MDInput from "components/MDInput"
import ModalCom from "components/MDModal"
import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import { createAddress } from "redux/reducers/App"
import * as Yup from "yup"

const AddressSchema = Yup.object({
    title: Yup.string().required(),
    name: Yup.string().required(),
    address: Yup.string().required(),
    map: Yup.string(),
    tel: Yup.string().required(),
    shop_phone_number: Yup.string(),
    email: Yup.string().required(),
    facebook: Yup.string(),
    telegram: Yup.string(),
    instagram: Yup.string()
})

export default (props) => {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            title: "",
            name: "",
            address: "",
            map: "39.6406042,66.8278027",
            tel: "",
            shop_phone_number: "",
            email: "",
            facebook: "",
            telegram: "",
            instagram: ""
        },
        validationSchema: AddressSchema,
        onSubmit: (values) => {
            dispatch(createAddress(values))
            formik.handleReset()
            props?.toggle()
        }
    })

    return (
        <ModalCom {...props} width={800}>
            <MDBox onSubmit={formik.handleSubmit} component="form" role="form" sx={{ flexGrow: 1 }}>
                <Typography mb={3}>Yangi joylashuv qo'shish</Typography>
                <Grid container spacing={4}>
                    <Grid item xs={4} display="grid" gap={2}>
                        <MDInput type="name" name="title" fullWidth onChange={formik.handleChange} onBlur={formik.handleBlur} label="Sarlovha" />
                    </Grid>
                    <Grid item xs={4} display="grid" gap={2}>
                        <MDInput type="name" name="name" fullWidth onChange={formik.handleChange} onBlur={formik.handleBlur} label="Nomi" />
                    </Grid>
                    <Grid item xs={4} display="grid" gap={2}>
                        <MDInput type="name" name="address" fullWidth onChange={formik.handleChange} onBlur={formik.handleBlur} label="To'liq manzil" />
                    </Grid>
                    <Grid item xs={4} display="grid" gap={2}>
                        <MDInput type="tel" name="tel" fullWidth onChange={formik.handleChange} onBlur={formik.handleBlur} label="Telfon" />
                    </Grid>
                    <Grid item xs={4} display="grid" gap={2}>
                        <MDInput type="name" name="shop_phone_number" fullWidth onChange={formik.handleChange} onBlur={formik.handleBlur} label="Qo'shimcha telfon raqam" />
                    </Grid>
                    <Grid item xs={4} display="grid" gap={2}>
                        <MDInput type="email" name="email" fullWidth onChange={formik.handleChange} onBlur={formik.handleBlur} label="Email" />
                    </Grid>
                    <Grid item xs={4} display="grid" gap={2}>
                        <MDInput type="name" name="facebook" fullWidth onChange={formik.handleChange} onBlur={formik.handleBlur} label="Facebook" />
                    </Grid>
                    <Grid item xs={4} display="grid" gap={2}>
                        <MDInput type="name" name="telegram" fullWidth onChange={formik.handleChange} onBlur={formik.handleBlur} label="Telegram" />
                    </Grid>
                    <Grid item xs={4} display="grid" gap={2}>
                        <MDInput type="name" name="instagram" fullWidth onChange={formik.handleChange} onBlur={formik.handleBlur} label="Instagram" />
                    </Grid>
                    <Grid item xs={12} display="grid" gap={2}>
                        <GoogleMap value={formik.values.map} onClick={(e) => formik.setFieldValue("map", `${e.lat},${e.lng}`)} />
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