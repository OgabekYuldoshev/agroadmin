import { useEffect, useState } from "react";
import { Grid, Card, Icon, IconButton, Pagination } from "@mui/material";
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
import { useLocation, useNavigate, createSearchParams } from "react-router-dom";
// import { baseUrl } from "utils";

function Tables() {
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    dispatch(getOrders(location.search));
  }, [location]);
  const [ID, setID] = useState(null);
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(cur => !cur);

  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.app);
  console.log(orders)
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
    },
    {
      name: "Komentariya",
      wrap: true,
      selector: (row) => row.notes,
    },
    {
      title: "Action",
      right: true,
      cell: (row) => (
        <IconButton onClick={() => {
          setID(row.id)
          toggle()
        }}>
          <Icon fontSize="small" color="info">
            visibility
          </Icon>
        </IconButton>
      ),
    },

  ];

  const handlePaginate = (e, page) => {
    console.log(location.pathname, page)
    navigate({
      pathname: location.pathname,
      search: `?${createSearchParams({
        page
      })}`
    });
  }

  const PaginationCom = () => {
    return <Pagination defaultPage={orders?.current_page} onChange={handlePaginate} count={orders?.last_page} color="primary" style={{ margin: 'auto' }} />
  }

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
                <DataTable pagination
                  paginationPerPage={50}
                  paginationComponent={PaginationCom}
                  noDataComponent="Ma'lumot topilmadi!" columns={columns} data={orders?.data} />
                <View open={open} id={ID} toggle={toggle} />
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
