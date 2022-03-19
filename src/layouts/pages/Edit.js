import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useDispatch, useSelector } from "react-redux";
import { Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Link, useParams, useNavigate } from "react-router-dom";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { updatePage, getPage } from "redux/reducers/Units";
import CKEditorComponent from "components/CKEditor";
import MDTypography from "components/MDTypography";
import { useFormik } from "formik";
import * as yup from "yup";
import { unwrapResult } from "@reduxjs/toolkit";

const Validator = yup.object({
  title_uz: yup.string().required(),
  title_ru: yup.string().required(),
  title_en: yup.string().required(),
  content_uz: yup.string().required(),
  content_ru: yup.string().required(),
  content_en: yup.string().required(),
});

function EditPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPage());
  }, [id]);
  const navigate = useNavigate();
  const { pages } = useSelector((state) => state.units);
  const found = pages?.find((item) => item.id === parseInt(id));
  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: Validator,
    initialValues: {
      title_uz: found?.title_uz || "",
      title_ru: found?.title_ru || "",
      title_en: found?.title_en || "",
      page_id: found?.page_id || "",
      content_uz: found?.content_uz || "",
      content_ru: found?.content_ru || "",
      content_en: found?.content_en || "",
    },
    onSubmit: (values) => {
      dispatch(updatePage({ id, data: values }))
        .then(unwrapResult)
        .then(() => navigate("/pages"));
    },
  });
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} p={3} bgColor="white" borderRadius={10}>
        <Typography mb={2}>Yangi sahifa yaratish</Typography>
        <MDBox onSubmit={formik.handleSubmit} role="form" component="form" fullWidth>
          <Grid container spacing={2} fullWidth>
            <Grid item xs={3}>
              <MDInput
                value={formik.values.title_uz}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                name="title_uz"
                label="Sarlovha UZ"
              />
            </Grid>
            <Grid item xs={3}>
              <MDInput
                value={formik.values.title_ru}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                name="title_ru"
                label="Sarlovha RU"
              />
            </Grid>
            <Grid item xs={3}>
              <MDInput
                value={formik.values.title_en}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                name="title_en"
                label="Sarlovha EN"
              />
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel id="page_id">Type</InputLabel>
                <Select
                  labelId="page_id"
                  id="page_id"
                  name="page_id"
                  value={formik.values.page_id}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{ padding: "12px 5px" }}
                  label="Type"
                >
                  <MenuItem value={1}>Haqida</MenuItem>
                  <MenuItem value={2}>Xizmatlar</MenuItem>
                  <MenuItem value={3}>Foydali ilovalar</MenuItem>
                  <MenuItem value={4}>Media</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <MDTypography variant="label" fontSize={15} component="label" mb={1}>
                Content UZ
              </MDTypography>
              <CKEditorComponent
                data={formik.values.content_uz}
                onChange={(undefined, editor) =>
                  formik.setFieldValue("content_uz", editor?.getData())
                }
              />
            </Grid>
            <Grid item xs={12}>
              <MDTypography variant="label" fontSize={15} component="label" mb={1}>
                Content RU
              </MDTypography>
              <CKEditorComponent
                data={formik.values.content_ru}
                onChange={(undefined, editor) =>
                  formik.setFieldValue("content_ru", editor?.getData())
                }
              />
            </Grid>
            <Grid item xs={12}>
              <MDTypography variant="label" fontSize={15} component="label" mb={1}>
                Content EN
              </MDTypography>
              <CKEditorComponent
                data={formik.values.content_en}
                onChange={(undefined, editor) =>
                  formik.setFieldValue("content_en", editor?.getData())
                }
              />
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="space-between">
              <Link to="/pages">
                <MDButton type="button" color="error">
                  Bekor qilish
                </MDButton>
              </Link>
              <MDButton type="submit" color="success" disabled={!(formik.isValid && formik.dirty)}>
                Yangilash
              </MDButton>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default EditPage;
