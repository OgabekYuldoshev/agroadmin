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
import { getProducts } from "redux/reducers/Products";
import { Chip, IconButton, Icon } from "@mui/material";
import { Link } from "react-router-dom";
import MDButton from "components/MDButton";
function Tables() {
  useEffect(() => {
    dispatch(getProducts({ size: 25 }));
  }, []);

  const dispatch = useDispatch();
  const { products, per_page, current_page, total } = useSelector((state) => state.products);
  console.log(products);

  const columns = [
    {
      title: "Mahsulot raqami",
      selector: (row) => row.code,
    },
    {
      title: "Nomi",
      dataIndex: "name",
      key: "name",
      selector: (row) => row.name,
    },
    {
      title: "Narxi",
      dataIndex: "",
      key: "",
      cell: (row) => (
        <span>
          {row.price} {row.currencies?.name}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "",
      key: "",
      cell: (row) =>
        row?.is_active ? (
          <Chip label="Active" color="success" />
        ) : (
          <Chip label="Unactive" color="error" />
        ),
    },
    {
      title: "Action",
      cell: (row) => (
        <MDBox display="flex">
          <Link to={`/products/edit/${row.id}`}>
            <IconButton>
              <Icon fontSize="small" color="info">
                edit
              </Icon>
            </IconButton>
          </Link>
          {/* <IconButton onClick={() => handleEdit(row.id)}>
            <Icon fontSize="small" color="success">
              edit
            </Icon>
          </IconButton> */}
          {/* <IconButton onClick={()=>dispatch()}>
            <Icon fontSize="small" color="error">delete</Icon>
          </IconButton> */}
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
                <Link to={"/products/new"}>
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
