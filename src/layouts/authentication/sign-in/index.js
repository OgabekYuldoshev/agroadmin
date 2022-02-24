import { useState } from "react";
// @mui material components
import Card from "@mui/material/Card";
import { TailSpin } from "react-loader-spinner"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { login } from "redux/reducers/Auth";
// Images
import { useSelector } from "react-redux"
function Basic() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: null,
      password: null,
    },
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  const { isLoading } = useSelector(state => state.auth)

  return (
    <BasicLayout image={'https://images.unsplash.com/photo-1625124376314-7a32b35db9e0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1175&q=80'}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Admin
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox onSubmit={formik.handleSubmit} component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="email"
                label="Email"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="password"
                label="Password"
                fullWidth
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton disabled={isLoading} type="submit" variant="gradient" color="info" fullWidth>
                {
                  isLoading ? <TailSpin color="#FFFFFF" height={20} width={20} /> : <span>sign in</span>
                }
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
