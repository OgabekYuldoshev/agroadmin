import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Card, Avatar, TextField } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "redux/reducers/Products";
import { Chip, IconButton, Icon, Pagination } from "@mui/material";
import { Link, useLocation, useNavigate, createSearchParams } from "react-router-dom";
import MDButton from "components/MDButton";
import { baseUrl } from "utils";
import qs from "qs";
import MDInput from "components/MDInput";
function Products() {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (!!location.search) {
      console.log("params");
      dispatch(getProducts(location.search));
    } else {
      console.log("no params");
      dispatch(getProducts(""));
    }
  }, [location]);

  const defaultQuery = qs.parse(location.search, { ignoreQueryPrefix: true });

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  const columns = [
    {
      name: "Rasm",
      width: "100px",
      cell: (row) => (
        <Avatar
          sizes="lg"
          variant="square"
          alt={row.name_uz}
          src={
            row.photos?.length
              ? baseUrl + row.photos[0]?.image
              : "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
          }
        />
      ),
    },
    {
      name: "Nomi UZ",
      width: "200px",
      selector: (row) => row.name_uz,
    },
    {
      name: "Nomi RU",
      width: "200px",
      selector: (row) => row.name_ru,
    },
    {
      name: "Nomi EN",
      width: "200px",
      selector: (row) => row.name_en,
    },
    {
      name: "Kategoryasi UZ",
      width: "200px",
      wrap: true,
      selector: (row) => row.categories?.name_uz,
    },
    {
      name: "Narxi",
      cell: (row) => (
        <span>
          {row.price} {row.currencies?.name}
        </span>
      ),
    },
    {
      name: "Status",
      cell: (row) =>
        parseInt(row.is_active) === 1 ? (
          <Chip label="Active" color="success" />
        ) : (
          <Chip label="Unactive" color="error" />
        ),
    },
    {
      name: "",
      right: true,
      width: "150px",
      cell: (row) => (
        <MDBox display="flex">
          <Link to={`/products/edit/${row.id}`}>
            <IconButton>
              <Icon fontSize="small" color="info">
                edit
              </Icon>
            </IconButton>
          </Link>
        </MDBox>
      ),
    },
  ];

  const handlePaginate = (e, page) => {
    console.log(location.pathname, page);
    navigate({
      pathname: location.pathname,
      search: `?${createSearchParams({
        ...defaultQuery,
        page,
      })}`,
    });
  };

  const handleSearch = () => {
    const query = {
      ...defaultQuery,
      search,
    };
    dispatch(getProducts(`?${qs.stringify(query)}`));
  };

  const PaginationCom = () => {
    return (
      <Pagination
        defaultPage={products?.current_page}
        onChange={handlePaginate}
        count={products?.last_page}
        color="success"
        style={{ margin: "auto" }}
      />
    );
  };

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
                <MDBox display="flex" justifyContent="flex-end" gap="5px">
                  <MDInput
                    type="text"
                    value={search}
                    label="ID, Code, Nomi"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <MDButton onClick={handleSearch} color="success">
                    <Icon>search</Icon>
                  </MDButton>
                </MDBox>
                <DataTable
                  noHeader
                  pagination
                  paginationPerPage={50}
                  paginationComponent={PaginationCom}
                  noDataComponent="Ma'lumot mavjud emas!"
                  columns={columns}
                  data={products?.data}
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

export default Products;
