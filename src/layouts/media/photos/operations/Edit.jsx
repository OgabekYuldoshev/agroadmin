import { useEffect } from "react";
import {
    Grid, FormControl, InputLabel, Select, MenuItem, Typography, ImageList, ImageListItem, ImageListItemBar, IconButton, Icon
} from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useDispatch, useSelector } from "react-redux";
import { updateImages, getSingleImages, deleteOneImages } from "redux/reducers/Media";
import { updateProductImage } from 'redux/reducers/App'
import { useFormik } from "formik";
import * as Yup from "yup"
import MDButton from "components/MDButton";
import { useNavigate, useParams } from "react-router-dom";
import MDInput from "components/MDInput";
import { baseUrl } from "utils";
import { unwrapResult } from "@reduxjs/toolkit";

const PhotoSchema = Yup.object({
    title_uz: Yup.string().required(),
    title_ru: Yup.string().required(),
    title_en: Yup.string().required(),
    type_id: Yup.string().required()
})

function View() {
    const navigate = useNavigate()
    const { id } = useParams()
    useEffect(() => {
        dispatch(getSingleImages(id));
    }, [id]);
    const { single } = useSelector((state) => state.media);
    console.log(single)

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title_uz: single?.title_uz || "",
            title_ru: single?.title_ru || "",
            title_en: single?.title_en || "",
            type_id: single?.type_id || ''
        },
        validationSchema: PhotoSchema,
        onSubmit: (values) => {
            dispatch(updateImages({ id, data: values }))
        }
    })
    const dispatch = useDispatch();
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox onSubmit={formik.handleSubmit} mb={2} p={3} bgColor="white" borderRadius={10} component="form" role="form" sx={{ flexGrow: 1 }}>
                <Typography mb={3}>Yangi joylashuv qo'shish</Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <ImageList sx={{ width: "100%", height: "100%" }} cols={6}>
                            {single?.media_images?.map((item) => (
                                <ImageListItem key={item.image}>
                                    <img
                                        src={baseUrl + item.image}
                                        alt={item.id}
                                        loading="lazy"
                                    />
                                    <ImageListItemBar
                                        title={item.name}
                                        actionIcon={
                                            <IconButton onClick={() => dispatch(deleteOneImages(item.id)).then(unwrapResult).then(() => dispatch(getSingleImages(id)))}>
                                                <Icon color="error">delete</Icon>
                                            </IconButton>
                                        }
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </Grid>
                    <Grid item xs={3} display="grid" gap={2}>
                        <MDInput type="name" value={formik.values.title_uz} name="title_uz" fullWidth onChange={formik.handleChange} onBlur={formik.handleBlur} label="Sarlovha UZ" />
                    </Grid>
                    <Grid item xs={3} display="grid" gap={2}>
                        <MDInput type="name" value={formik.values.title_ru} name="title_ru" fullWidth onChange={formik.handleChange} onBlur={formik.handleBlur} label="Sarlovha RU" />
                    </Grid>
                    <Grid item xs={3} display="grid" gap={2}>
                        <MDInput type="name" value={formik.values.title_en} name="title_en" fullWidth onChange={formik.handleChange} onBlur={formik.handleBlur} label="Sarlovha EN" />
                    </Grid>
                    <Grid item xs={3} display="grid" gap={2}>
                        <FormControl fullWidth>
                            <InputLabel id="partner">Type</InputLabel>
                            <Select
                                labelId="type_id"
                                id="type_id"
                                name="type_id"
                                onChange={formik.handleChange}
                                value={formik.values.type_id}
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
                            onChange={(e) => {
                                const formData = new FormData()
                                for (let i = 0; i < e.target.files?.length; i++) {
                                    formData.append(`images[${i}]`, e.target.files[i]);
                                }
                                formData.append("model", "MediaImages")
                                dispatch(updateProductImage({ id: single?.id, data: formData })).then(unwrapResult).then(() => dispatch(getSingleImages(id)))
                                formik.setFieldValue(`images`, Array.from(e.target.files))
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12} display="flex" mt={2} justifyContent="space-between">
                    <MDButton type="button" onClick={() => navigate('/photos')} color="error">
                        Bekor qilish
                    </MDButton>
                    <MDButton type="submit" color="success" disabled={!(formik.isValid && formik.dirty)}>
                        O'zgartirish
                    </MDButton>
                </Grid>
            </MDBox>
            <Footer />
        </DashboardLayout>
    );
}

export default View;
