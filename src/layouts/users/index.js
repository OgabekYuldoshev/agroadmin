import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import moment from "moment";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "react-data-table-component";

import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "redux/reducers/Auth";
function Tables() {
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.auth);

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
    },
    {
      name: "IP",
      selector: (row) => row.ip,
    },
    {
      name: "F.I.O",
      selector: (row) => `${row.first_name} ${row.last_name} ${row.second_name}`,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Tel",
      selector: (row) => row.phone_number,
    },
    {
      name: "Sana",
      selector: (row) => moment(row.created_at).format("LLL"),
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
              >
                <MDTypography variant="h6" color="white">
                  Foydalanuvchilar
                </MDTypography>
              </MDBox>
              <MDBox p={3}>
                <DataTable columns={columns} data={users} pagination />
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
