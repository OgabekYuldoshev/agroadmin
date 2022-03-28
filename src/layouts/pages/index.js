import { useEffect } from "react";
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

  const TYPE = {
    1: "Haqida",
    2: "Xizmatlar",
    3: "Hoidali Ilovalar",
    4: "Media",
  };

  const columns = [
    {
      name: "ID",
      width: "50px",
      selector: (row) => row.id,
    },
    {
      name: "Sarlovha UZ",
      width: "150px",
      selector: (row) => row.title_uz,
    },
    {
      name: "Sarlovha RU",
      width: "150px",
      selector: (row) => row.title_ru,
    },
    {
      name: "Sarlovha EN",
      width: "150px",
      selector: (row) => row.title_en,
    },
    {
      name: "Content UZ",
      width: "150px",
      selector: (row) => row.content_uz,
    },
    {
      name: "Content RU",
      width: "150px",
      selector: (row) => row.content_ru,
    },
    {
      name: "Content EN",
      width: "150px",
      selector: (row) => row.content_en,
    },
    {
      name: "Type",
      width: "100px",
      selector: (row) => TYPE[row.page_id],
    },
    {
      name: "",
      right: true,
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
                <DataTable
                  columns={columns}
                  noDataComponent="Ma'lumot mavjud emas!"
                  data={pages}
                  pagination
                />
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
