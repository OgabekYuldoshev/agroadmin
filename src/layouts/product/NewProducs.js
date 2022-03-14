import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormControl, Typography, InputLabel, Select, MenuItem, Autocomplete, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { getCurrenciesList, getUnitList } from "redux/reducers/Units";
import { createProduct } from "redux/reducers/Products";
import { getAllCategory } from "redux/reducers/Category";
import { getPartner } from "redux/reducers/Partners";
import CKEditorComponent from "components/CKEditor";
import MDTypography from "components/MDTypography";
import { useFormik } from "formik";
import * as yup from "yup";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const Validator = yup.object({
  name_uz: yup.string().required(),
  name_ru: yup.string().required(),
  name_en: yup.string().required(),
  specification_uz: yup.string().required(),
  specification_ru: yup.string().required(),
  specification_en: yup.string().required(),
  price: yup.string().required(),
  currency_id: yup.string().required(),
  category_id: yup.string().required(),
  sub_category_id: yup.string(),
  nett_weight: yup.string().required(),
  unit_id: yup.string().required(),
  partner_id: yup.string().required(),
  images: yup.array().required()
});

function NewProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { currencies, unit } = useSelector((state) => state.units);
  const { all } = useSelector((state) => state.category);
  const { partners } = useSelector((state) => state.partner);

  useEffect(() => {
    dispatch(getCurrenciesList());
    dispatch(getUnitList());
    dispatch(getAllCategory());
    dispatch(getPartner());
  }, []);

  const formik = useFormik({
    validationSchema: Validator,
    initialValues: {
      name_uz: "",
      name_en: "",
      name_ru: "",
      specification_uz: "",
      specification_en: "",
      specification_ru: "",
      price: "",
      currency_id: 1,
      category_id: "",
      sub_category_id: "",
      nett_weight: "",
      unit_id: "",
      partner_id: "",
      images: "",
    },
    onSubmit: (values) => {
      const formData = new FormData();
      for (const name in values) {
        if (name === "images") {
          for (let i = 0; i < values[name]?.length; i++) {
            formData.append(`images[${i}]`, values[name][i]);
          }
        } else {
          formData.append(name, values[name]);
        }
      }
      dispatch(createProduct(formData)).then(unwrapResult).then(() => navigate('/products'))
    },
  });
  console.log(all)

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} p={3} bgColor="white" borderRadius={10}>
        <Typography mb={2}>Yangi mahsulot yaratish</Typography>
        <MDBox onSubmit={formik.handleSubmit} role="form" component="form" fullWidth>
          <Grid container spacing={2} fullWidth>
            <Grid item xs={4}>
              <MDInput
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                name="name_uz"
                label="Nomi UZ"
              />
            </Grid>
            <Grid item xs={4}>
              <MDInput
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                name="name_ru"
                label="Nomi RU"
              />
            </Grid>
            <Grid item xs={4}>
              <MDInput
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                name="name_en"
                label="Nomi EN"
              />
            </Grid>
            <Grid item xs={4} display="flex" gap={1}>
              <MDInput
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                type="number"
                name="price"
                label="Narxi"
              />
              <FormControl style={{ width: "30%" }}>
                <InputLabel id="price_type">Narx Turi</InputLabel>
                <Select
                  labelId="price_type"
                  id="price_type"
                  name="currency_id"
                  disabled
                  value={formik.values.currency_id}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{ padding: "12px 5px" }}
                  label="Kategoryasi"
                >
                  {currencies?.map((item, index) => (
                    <MenuItem key={index} value={item?.id}>
                      {item?.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4} display="flex" gap={1}>
              <MDInput
                fullWidth
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="nett_weight"
                label="Hajmi"
              />
              <FormControl style={{ width: "30%" }}>
                <InputLabel id="price_type">Hajim turi</InputLabel>
                <Select
                  labelId="weigth"
                  id="weigth"
                  name="unit_id"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{ padding: "12px 5px" }}
                  label="Hajim turi"
                >
                  {unit?.map((item, index) => (
                    <MenuItem key={index} value={item?.id}>
                      {item?.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <MDInput
                type="file"
                fullWidth
                name="images"
                inputProps={{ multiple: true, accept: ".png, .jpg, .jpeg" }}
                label="Rasm"
                onChange={(e) => {
                  if (e.target?.files?.length > 3) {
                    e.target.value = ''
                    toast.warning("Siz maksimum 3ta rasm tanlay olasiz!")
                  } else {
                    formik.setFieldValue(`images`, Array.from(e.target.files))
                  }
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="category">Kategoryasi</InputLabel>
                {/* <Autocomplete
                  disablePortal
                  id="category_id"
                  options={all}
                  getOptionLabel={option => option?.name_uz}
                  onChange={(e, val) => formik.setFieldValue("category_id", val.id)}
                  name="category_id"
                  renderInput={(params) => <TextField {...params} label="Kategoryasi" />}
                /> */}
                <Select
                  labelId="category"
                  id="category"
                  name="category_id"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{ padding: "12px 5px" }}
                  label="Kategoryasi"
                >
                  {all?.map((item, index) => (
                    <MenuItem key={index} value={item?.id}>
                      {item?.name_uz}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="sub_category">Sub kategoryasi</InputLabel>
                <Select
                  labelId="sub_category"
                  id="sub_category"
                  name="sub_category_id"
                  onChange={formik.handleChange}
                  disabled={!formik.values.category_id || !(subCategories()?.childs?.length)}
                  onBlur={formik.handleBlur}
                  style={{ padding: "12px 5px" }}
                  label="Sub kategoryasi"
                >
                  {subCategories()?.childs?.map((item, index) => (
                    <MenuItem key={index} value={item?.id}>
                      {item?.name_uz}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid> */}
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="partner">Hamkor</InputLabel>
                <Select
                  labelId="partner"
                  id="partner"
                  name="partner_id"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{ padding: "12px 5px" }}
                  label="Hamkor"
                >
                  {partners?.map((item, index) => (
                    <MenuItem key={index} value={item?.id}>
                      {item?.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* <Grid item xs={4}>
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
                        </Grid> */}
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <MDTypography variant="label" fontSize={15} component="label" mb={1}>
                    Mahsulot haqida UZ
                  </MDTypography>
                  <CKEditorComponent
                    onChange={(undefined, editor) =>
                      formik.setFieldValue("specification_uz", editor?.getData())
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <MDTypography variant="label" fontSize={15} component="label" mb={1}>
                    Mahsulot haqida RU
                  </MDTypography>
                  <CKEditorComponent
                    onChange={(undefined, editor) =>
                      formik.setFieldValue("specification_ru", editor?.getData())
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <MDTypography variant="label" fontSize={15} component="label" mb={1}>
                    Mahsulot haqida EN
                  </MDTypography>
                  <CKEditorComponent
                    onChange={(undefined, editor) =>
                      formik.setFieldValue("specification_en", editor?.getData())
                    }
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="space-between">
              <Link to="/products">
                <MDButton type="button" color="error">
                  Bekor qilish
                </MDButton>
              </Link>
              <MDButton type="submit" color="success" disabled={!(formik.isValid && formik.dirty)}>
                Yaratish
              </MDButton>
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

export default NewProduct;
