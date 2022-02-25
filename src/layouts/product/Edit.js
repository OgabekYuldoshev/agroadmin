import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useDispatch, useSelector } from "react-redux";
// import { getProducts } from "redux/reducers/Products";
import { FormControl, Typography, InputLabel, Select, MenuItem } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { getCurrenciesList, getUnitList } from "redux/reducers/Units";
import { updateProduct, getSingleProduct } from "redux/reducers/Products";
import { getCategory } from "redux/reducers/Category";
import { getPartner } from "redux/reducers/Partners";
import CKEditorComponent from "components/CKEditor";
import MDTypography from "components/MDTypography";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";

const Validator = yup.object({
  name_uz: yup.string().required(),
  name_en: yup.string().required(),
  name_ru: yup.string().required(),
  specification_uz: yup.string().required(),
  specification_ru: yup.string().required(),
  specification_en: yup.string().required(),
  code: yup.string().required(),
  price: yup.string().required(),
  currency_id: yup.string().required(),
  category_id: yup.string().required(),
  nett_weight: yup.string().required(),
  unit_id: yup.string().required(),
  is_active: yup.boolean().required(),
  partner_id: yup.string().required(),
  images: yup.mixed(),
});

function EditProduct() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { single } = useSelector((state) => state.products);
  const { currencies, unit } = useSelector((state) => state.units);
  const { categories } = useSelector((state) => state.category);
  const { partners } = useSelector((state) => state.partner);

  useEffect(() => {
    dispatch(getSingleProduct(id));
    dispatch(getCurrenciesList());
    dispatch(getUnitList());
    dispatch(getCategory());
    dispatch(getPartner());
  }, [dispatch]);

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: Validator,
    initialValues: {
      name_uz: single?.name_uz || "",
      name_en: single?.name_en || "",
      name_ru: single?.name_ru || "",
      specification_uz: single?.specification_uz || "",
      specification_en: single?.specification_en || "",
      specification_ru: single?.specification_ru || "",
      code: single?.code || "",
      price: single?.price || "",
      currency_id: 2,
      is_active: single?.price || '',
      category_id: single?.category_id || "",
      nett_weight: single?.unit_id || "",
      unit_id: single?.unit_id || "",
      partner_id: single?.partner_id || "",
      images: "",
    },
    onSubmit: (values) => {
      const formData = new FormData();
      for (const name in values) {
        formData.append(name, values[name]);
      }
      dispatch(updateProduct({ id, data: formData }));
    },
  });

  console.log(single)

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} p={3} bgColor="white" borderRadius={10}>
        <Typography mb={2}>Mahsulotni o'zgartirish</Typography>
        <MDBox onSubmit={formik.handleSubmit} role="form" component="form" fullWidth>
          <Grid container spacing={2} fullWidth>
            <Grid item xs={4}>
              <MDInput
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                value={formik.values.name_uz}
                name="name_uz"
                label="Nomi UZ"
              />
            </Grid>
            <Grid item xs={4}>
              <MDInput
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                value={formik.values.name_ru}
                name="name_ru"
                label="Nomi RU"
              />
            </Grid>
            <Grid item xs={4}>
              <MDInput
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                value={formik.values.name_en}
                name="name_en"
                label="Nomi EN"
              />
            </Grid>
            <Grid item xs={4}>
              <MDInput
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                name="code"
                value={formik.values.code}
                label="Mahsulot kodi"
              />
            </Grid>
            <Grid item xs={4} display="flex" gap={1}>
              <MDInput
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                value={formik.values.price}
                type="number"
                name="price"
                label="Narxi"
              />
              <FormControl style={{ width: "30%" }}>
                <InputLabel id="currency_id">Narx Turi</InputLabel>
                <Select
                  labelId="currency_id"
                  id="currency_id"
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
                value={formik.values.nett_weight}
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
                  value={formik.values.unit_id}
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
                <Select
                  labelId="category"
                  id="category"
                  name="category_id"
                  value={formik.values.category_id}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{ padding: "12px 5px" }}
                  label="Kategoryasi"
                >
                  {categories?.map((item, index) => (
                    <MenuItem key={index} value={item?.id}>
                      {item?.name_uz}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="active">Activity</InputLabel>
                <Select
                  labelId="active"
                  id="active"
                  name="is_active"
                  value={formik.values.is_active}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{ padding: "12px 5px" }}
                  label="Activity"
                >
                  <MenuItem value={true}>
                    Active
                  </MenuItem>
                  <MenuItem value={false}>
                    Unactive
                  </MenuItem>
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
                  fullWidth
                  value={formik.values.partner_id}
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
                <Grid item xs={4}>
                  <MDTypography variant="label" fontSize={15} component="label" mb={1}>
                    Mahsulot haqida UZ
                  </MDTypography>
                  <CKEditorComponent
                    data={formik.values.specification_uz}
                    onChange={(undefined, editor) =>
                      formik.setFieldValue("specification_uz", editor?.getData())
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <MDTypography variant="label" fontSize={15} component="label" mb={1}>
                    Mahsulot haqida RU
                  </MDTypography>
                  <CKEditorComponent
                    data={formik.values.specification_ru}
                    onChange={(undefined, editor) =>
                      formik.setFieldValue("specification_ru", editor?.getData())
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <MDTypography variant="label" fontSize={15} component="label" mb={1}>
                    Mahsulot haqida EN
                  </MDTypography>
                  <CKEditorComponent
                    data={formik.values.specification_en}
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

export default EditProduct;
