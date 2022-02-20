import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Avatar, Chip, Icon, IconButton } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "react-data-table-component";

import { useDispatch, useSelector } from "react-redux";
import { getPage, deletePage } from "redux/reducers/Units";
import { Link } from "react-router-dom";
import MDButton from "components/MDButton";

function Tables() {
  useEffect(() => {
    dispatch(getPage());
  }, []);

  const dispatch = useDispatch();
  const { pages } = useSelector((state) => state.units);

  const columns = [
    {
      name: "id",
      width: "50px",
      selector: (row) => row.ID,
    },
    {
      name: "Sarlovha",
      width: "300px",
      selector: (row) => row.title,
    },
    {
      name: "Content",
      width: "350px",
      selector: (row) => row.content,
    },
    {
      name: "Type",
      width: "100px",
      selector: (row) => (row.page_id === 1 ? "Haqida" : "Xizmatlar"),
    },
    {
      name: "",
      right: true,
      width: "250px",
      cell: (row) => (
        <MDBox display="flex">
          <Link to={`/pages/edit/${row.id}`}>
            <IconButton>
              <Icon fontSize="small" color="success">
                edit
              </Icon>
            </IconButton>
          </Link>
          <IconButton onClick={() => dispatch(deletePage(row.id))}>
            <Icon fontSize="small" color="error">
              delete
            </Icon>
          </IconButton>
        </MDBox>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h6" color="white">
                  Sahifalar
                </MDTypography>
                <Link to="/pages/new">
                  <MDButton>Sahifa qo'shish</MDButton>
                </Link>
              </MDBox>
              <MDBox p={3}>
                <DataTable columns={columns} data={pages} pagination />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
