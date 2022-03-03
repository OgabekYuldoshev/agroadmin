
import { Grid, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import MDBox from "components/MDBox"
import MDInput from "components/MDInput"
import MDButton from "components/MDButton"
import ModalCom from "components/MDModal"
import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import { createImages } from "redux/reducers/Media"
import * as Yup from "yup"

const PhotoSchema = Yup.object({
    title_uz: Yup.string().required(),
    title_ru: Yup.string().required(),
    title_en: Yup.string().required(),
    type_id: Yup.string().required(),
    images: Yup.array().required()
})

export default (props) => {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            title_uz: "",
            title_ru: "",
            title_en: "",
            type_id: "",
            images: ''
        },
        validationSchema: PhotoSchema,
        onSubmit: (values) => {
            const formData = new FormData();
            for (const name in values) {
                if (name === "images") {
                    for (let i = 0; i < values[name]?.length; i++) {
                        if (i === 0) {
                            formData.append(`image`, values[name][i]);
                        }
                        formData.append(`images[${i}]`, values[name][i]);
                    }
                } else {
                    formData.append(name, values[name]);
                }
            }
            dispatch(createImages(formData))
            formik.handleReset()
            props?.toggle()
        }
    })

    console.log(formik)

    return (
        <ModalCom {...props} width={800}>
            <MDBox onSubmit={formik.handleSubmit} component="form" role="form" sx={{ flexGrow: 1 }}>
                <Typography mb={3}>Yangi joylashuv qo'shish</Typography>
                <Grid container spacing={4}>
                    <Grid item xs={3} display="grid" gap={2}>
                        <MDInput type="name" name="title_uz" fullWidth onChange={formik.handleChange} onBlur={formik.handleBlur} label="Sarlovha UZ" />
                    </Grid>
                    <Grid item xs={3} display="grid" gap={2}>
                        <MDInput type="name" name="title_ru" fullWidth onChange={formik.handleChange} onBlur={formik.handleBlur} label="Sarlovha RU" />
                    </Grid>
                    <Grid item xs={3} display="grid" gap={2}>
                        <MDInput type="name" name="title_en" fullWidth onChange={formik.handleChange} onBlur={formik.handleBlur} label="Sarlovha EN" />
                    </Grid>
                    <Grid item xs={3} display="grid" gap={2}>
                        <FormControl fullWidth>
                            <InputLabel id="partner">Type</InputLabel>
                            <Select
                                labelId="type_id"
                                id="type_id"
                                name="type_id"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{ padding: "12px 5px" }}
                                label="Turi"
                            >
                                <MenuItem value={1}>
                                    Seminarlar
                                </MenuItem>
                                <MenuItem value={2}>
                                    Do'konlar
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} display="grid" gap={2}>
                        <MDInput
                            type="file"
                            fullWidth
                            name="images"
                            inputProps={{ multiple: true, accept: ".png, .jpg, .jpeg" }}
                            label="Rasm"
                            onChange={(e) => formik.setFieldValue(`images`, Array.from(e.target.files))}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12} display="flex" mt={2} justifyContent="space-between">
                    <MDButton type="button" onClick={props?.toggle} color="error">
                        Bekor qilish
                    </MDButton>
                    <MDButton type="submit" color="success" disabled={!(formik.isValid && formik.dirty)}>
                        Yaratish
                    </MDButton>
                </Grid>
            </MDBox>
        </ModalCom >
    )
}
