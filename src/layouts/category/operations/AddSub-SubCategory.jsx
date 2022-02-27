
import { Grid, TextField, Typography, Icon, IconButton, Chip, } from "@mui/material"
import { unwrapResult } from "@reduxjs/toolkit"
import MDBox from "components/MDBox"
import MDButton from "components/MDButton"
import MDInput from "components/MDInput"
import ModalCom from "components/MDModal"
import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getSubSubCategory } from "redux/reducers/Category";
import { createCategory } from "redux/reducers/Category"
import * as Yup from "yup"
import DataTable from "react-data-table-component"
import EditModal from "./Edit"
import { useState } from "react"

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
    const { subSubCategories } = useSelector((state) => state.category);
    const { item } = props
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name_uz: null,
            name_ru: null,
            name_en: null,
            description_uz: null,
            description_ru: null,
            description_en: null,
            parent_id: item?.id,
            level: 3
        },
        validationSchema: CategorySchema,
        onSubmit: (val) => {
            dispatch(createCategory(val)).then(unwrapResult).then(() => {
                formik.handleReset()
                props?.toggle()
            })
        }
    })
    console.log(item)
    useEffect(() => {
        if (item?.id) {
            dispatch(getSubSubCategory(item?.id));
        }
    }, [item?.id]);



    const [edit, setEdit] = useState({ opened: false, id: null });
    const handleEdit = (val) =>
        setEdit({
            opened: !edit?.opened,
            id: val,
        });
    const columns = [
        {
            name: "ID",
            cell: (row) => row.id,
        },
        {
            name: "Nomi UZ",
            width: "150px",
            selector: (row) => row.name_uz,
        },
        {
            name: "Nomi RU",
            width: "150px",
            selector: (row) => row.name_ru,
        },
        {
            name: "Nomi EN",
            width: "150px",
            selector: (row) => row.name_en,
        },
        {
            name: "Level",
            selector: (row) => row.level,
        },
        {
            name: "Status",
            cell: (row) =>
                row.is_active ? (
                    <Chip label="Active" color="success" />
                ) : (
                    <Chip label="Unactive" color="error" />
                ),
        },
        {
            name: "",
            right: true,
            width: "150px",
            cell: (row) => (
                <MDBox display="flex">
                    <IconButton>
                        <Icon fontSize="small" color="success" onClick={() => handleEdit(row.id)}>
                            edit
                        </Icon>
                    </IconButton>
                </MDBox>
            ),
        },
    ];

    // const columns = [
    //     {
    //         title: "ID",
    //         width: "100px",
    //         selector: (row) => row.id,
    //     },
    //     {
    //         title: "Name UZ",
    //         selector: (row) => row.name_uz,
    //     },
    //     {
    //         title: "Name RU",
    //         selector: (row) => row.name_ru,
    //     },
    //     {
    //         title: "Name EN",
    //         selector: (row) => row.name_en,
    //     },
    //     {
    //         title: "Level",
    //         selector: (row) => row.level,
    //     },
    //     {
    //         title: "Status",
    //         cell: (row) =>
    //             row.is_active ? (
    //                 <Chip label="Active" color="success" />
    //             ) : (
    //                 <Chip label="Unactive" color="error" />
    //             ),
    //     },
    //     {
    //         title: "Action",
    //         right: true,
    //         cell: (row) => (

    //         ),
    //     },
    // ];


    console.log(formik)
    return (
        <ModalCom toggle={props.toggle} open={props.item?.opened} {...props}>
            <MDBox onSubmit={formik.handleSubmit} component="form" role="form" sx={{ flexGrow: 1 }}>
                <Typography mb={3}>Yangi sub-sub kategorya qo'shish</Typography>
                <Grid container spacing={4}>
                    {/* <Grid item xs={12}>
                        <MDInput type="file" accept="image/png,image/jpg,image/jpeg" fullWidth name="image" onChange={(event) => {
                            formik.setFieldValue("image", event.target.files[0])
                        }} label="File" />
                    </Grid> */}
                    <Grid item xs={12} display="flex" justifyContent="space-between" gap={2}>
                        <MDInput name="name_uz" fullWidth onChange={formik.handleChange} onBlur={formik.handleBlur} label="Nomi UZ" />
                        <MDInput name="name_ru" fullWidth onChange={formik.handleChange} onBlur={formik.handleBlur} label="Nomi RU" />
                        <MDInput name="name_en" fullWidth onChange={formik.handleChange} onBlur={formik.handleBlur} label="Nomi EN" />
                    </Grid>
                    <Grid item xs={12} display="flex" justifyContent="space-between" gap={2}>
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
                    <Grid item xs={12} display="flex" justifyContent="space-between" gap={2}>
                        <EditModal
                            width={800}
                            toggle={() => handleEdit({ open: false, id: null })}
                            item={edit}
                        />
                        <DataTable noDataComponent="Ma'lumot mavjud emas!" columns={columns} data={subSubCategories} />
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