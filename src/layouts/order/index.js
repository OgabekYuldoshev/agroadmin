import { useEffect, useState } from "react";
import { Grid, Card, Icon, IconButton } from "@mui/material";
import DataTable from "react-data-table-component";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "redux/reducers/App";
// import { Link } from "react-router-dom";
import View from "./operations/Veiw";
// import { baseUrl } from "utils";

function Tables() {
  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const [edit, setEdit] = useState({ id: null, opened: false });
  const handleEdit = (id) => setEdit({ id, opened: !edit?.opened });

  const dispatch = useDispatch();
  const { address } = useSelector((state) => state.app);
  const columns = [
    {
      name: "Sarlovha",
      selector: (row) => row.title,
    },
    {
      name: "Nomi",
      wrap: true,
      selector: (row) => row.name,
    },
    {
      name: "Address",
      wrap: true,
      selector: (row) => row.address,
    },
    {
      name: "Tel",
      selector: (row) => row.tel,
    },
    {
      name: "Qo'shimcha",
      wrap: true,
      selector: (row) => row.shop_phone_number,
    },
    {
      title: "Action",
      right: true,
      cell: (row) => (
        <MDBox display="flex">
          <IconButton onClick={() => handleEdit(row.id)}>
            <Icon fontSize="small" color="success">
              visbility
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
                  Buyurtmalar
                </MDTypography>
              </MDBox>
              <MDBox p={3}>
                <DataTable columns={columns} data={address} pagination />
                <View item={edit} toggle={handleEdit} />
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
