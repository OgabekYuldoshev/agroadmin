import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "redux/reducers/Products";
import { FormControl, Typography, InputLabel, Select, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { getCurrenciesList, getUnitList } from "redux/reducers/Units"
import { createProduct } from "redux/reducers/Products"
import { getCategory } from "redux/reducers/Category"
import { getPartner } from "redux/reducers/Partners"
import CKEditorComponent from "components/CKEditor";
import MDTypography from "components/MDTypography";
import { useFormik } from "formik";
import * as yup from "yup"

const Validator = yup.object({
    name: yup.object({
        uz: yup.string().required(),
        ru: yup.string().required(),
        en: yup.string().required()
    }),
    specification: yup.object({
        uz: yup.string().required(),
        ru: yup.string().required(),
        en: yup.string().required()
    }),
    code: yup.string().required(),
    price: yup.string().required(),
    currency_id: yup.string().required(),
    category_id: yup.string().required(),
    product_type: yup.string().required(),
    nett_weight: yup.string().required(),
    unit_id: yup.string().required(),
    partner_id: yup.string().required(),
    images: yup.mixed().required(),
})

function Tables() {
    const dispatch = useDispatch();
    const { currencies, unit } = useSelector(state => state.units)
    const { categories } = useSelector(state => state.category)
    const { partners } = useSelector(state => state.partner)

    useEffect(() => {
        dispatch(getCurrenciesList())
        dispatch(getUnitList())
        dispatch(getCategory())
        dispatch(getPartner())
    }, [])

    const formik = useFormik({
        validationSchema: Validator,
        initialValues: {
            name: {
                uz: null,
                en: null,
                ru: null
            },
            specification: {
                uz: null,
                en: null,
                ru: null
            },
            code: null,
            price: null,
            currency_id: null,
            category_id: null,
            product_type: null,
            nett_weight: null,
            unit_id: null,
            partner_id: null,
            images: null
        },
        onSubmit: (values) => {
            const formData = new FormData()
            for (const name in values) {
                formData.append(name, values[name])
            }
            dispatch(createProduct(formData))
        }
    })

    console.log(formik)

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox mb={2} p={3} bgColor="white" borderRadius={10}>
                <Typography mb={2}>Yangi mahsulot yaratish</Typography>
                <MDBox onSubmit={formik.handleSubmit} role="form" component="form" fullWidth>
                    <Grid container spacing={2} fullWidth>
                        <Grid item xs={4}>
                            <MDInput onChange={formik.handleChange} onBlur={formik.handleBlur} fullWidth name="name[uz]" label="Nomi UZ" />
                        </Grid>
                        <Grid item xs={4}>
                            <MDInput onChange={formik.handleChange} onBlur={formik.handleBlur} fullWidth name="name[ru]" label="Nomi RU" />
                        </Grid>
                        <Grid item xs={4}>
                            <MDInput onChange={formik.handleChange} onBlur={formik.handleBlur} fullWidth name="name[en]" label="Nomi EN" />
                        </Grid>
                        <Grid item xs={4}>
                            <MDInput onChange={formik.handleChange} onBlur={formik.handleBlur} fullWidth name="code" label="Mahsulot kodi" />
                        </Grid>
                        <Grid item xs={4} display="flex" gap={1}>
                            <MDInput onChange={formik.handleChange} onBlur={formik.handleBlur} fullWidth type="number" name="price" label="Narxi" />
                            <FormControl style={{ width: "30%" }}>
                                <InputLabel id="price_type">Narx Turi</InputLabel>
                                <Select
                                    labelId="price_type"
                                    id="price_type"
                                    name="currency_id"
                                    onChange={formik.handleChange} onBlur={formik.handleBlur}
                                    style={{ padding: '12px 5px', }}
                                    label="Kategoryasi"
                                >
                                    {
                                        currencies?.map((item, index) => (
                                            <MenuItem key={index} value={item?.id}>{item?.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4} display="flex" gap={1}>
                            <MDInput fullWidth type="number" onChange={formik.handleChange} onBlur={formik.handleBlur} name="nett_weight" label="Hajmi" />
                            <FormControl style={{ width: "30%" }}>
                                <InputLabel id="price_type">Hajim turi</InputLabel>
                                <Select
                                    labelId="weigth"
                                    id="weigth"
                                    name="unit_id"
                                    onChange={formik.handleChange} onBlur={formik.handleBlur}
                                    style={{ padding: '12px 5px', }}
                                    label="Hajim turi"
                                >
                                    {
                                        unit?.map((item, index) => (
                                            <MenuItem key={index} value={item?.id}>{item?.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <MDInput type="file" fullWidth name="image" multiple label="Rasm" onChange={(e) => formik.setFieldValue("images", e.target.files[0])} />
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel id="category">Kategoryasi</InputLabel>
                                <Select
                                    labelId="category"
                                    id="category"
                                    name="category_id"
                                    onChange={formik.handleChange} onBlur={formik.handleBlur}
                                    style={{ padding: '12px 5px' }}
                                    label="Kategoryasi"
                                >
                                    {
                                        categories?.map((item, index) => (
                                            <MenuItem key={index} value={item?.id}>{item?.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel id="partner">Hamkor</InputLabel>
                                <Select
                                    labelId="partner"
                                    id="partner"
                                    name="partner_id"
                                    onChange={formik.handleChange} onBlur={formik.handleBlur}
                                    style={{ padding: '12px 5px' }}
                                    label="Hamkor"
                                >
                                    {
                                        partners?.map((item, index) => (
                                            <MenuItem key={index} value={item?.id}>{item?.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel id="product_type">Mahsulot Turi</InputLabel>
                                <Select
                                    labelId="product_type"
                                    id="product_type"
                                    name="product_type"
                                    onChange={formik.handleChange} onBlur={formik.handleBlur}
                                    style={{ padding: '12px 5px' }}
                                    label="Hamkor"
                                >
                                    <MenuItem value={1}>Arzon</MenuItem>
                                    <MenuItem value={2}>Qimmat</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <MDTypography variant='label' fontSize={15} component='label' mb={1}>Mahsulot haqida UZ</MDTypography>
                                    <CKEditorComponent onChange={(undefined, editor) => formik.setFieldValue("specification[uz]", editor?.getData())} />
                                </Grid>
                                <Grid item xs={4}>
                                    <MDTypography variant='label' fontSize={15} component='label' mb={1}>Mahsulot haqida RU</MDTypography>
                                    <CKEditorComponent onChange={(undefined, editor) => formik.setFieldValue("specification[ru]", editor?.getData())} />
                                </Grid>
                                <Grid item xs={4}>
                                    <MDTypography variant='label' fontSize={15} component='label' mb={1}>Mahsulot haqida EN</MDTypography>
                                    <CKEditorComponent onChange={(undefined, editor) => formik.setFieldValue("specification[en]", editor?.getData())} />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} display="flex" justifyContent='space-between'>
                            <Link to="/products">
                                <MDButton type="button" color="error">Bekor qilish</MDButton>
                            </Link>
                            <MDButton type="submit" color="success" disabled={!(formik.isValid && formik.dirty)}>Yaratish</MDButton>
                        </Grid>
                    </Grid>
                </MDBox>
                {/* <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="success"
                borderRadius="lg"
                coloredShadow="info"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h6" color="white">
                  Mahsulotlar
                </MDTypography>
                <Link to={'/products/new'}>
                  <MDButton>Yangi mahsulot qo'shish</MDButton>
                </Link>
              </MDBox>
              <MDBox p={3}>
                <DataTable
                  // paginationDefaultPage={total}
                  paginationPerPage={25}
                  // paginationRowsPerPageOptions={[10, 25, 50, 75]}
                  // onChangeRowsPerPage={(e) => console.log(e)}
                  // onChangePage={(e) => console.log(e)}
                  columns={columns}
                  data={products}
                  pagination />
              </MDBox>
            </Card>
          </Grid>
        </Grid> */}
            </MDBox>
            <Footer />
        </DashboardLayout>
    );
}

export default Tables;
