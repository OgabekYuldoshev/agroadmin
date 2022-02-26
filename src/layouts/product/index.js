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
import qs from "qs"
import MDInput from "components/MDInput";
function Tables() {
  const navigate = useNavigate()
  const location = useLocation()
  const [search, setSearch] = useState('')
  useEffect(() => {
    dispatch(getProducts(location.search));
  }, [location]);

  const defaultQuery = qs.parse(location.search, { ignoreQueryPrefix: true })
  console.log(defaultQuery)

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  const columns = [
    {
      title: 'rasm',
      cell: (row) => (
        <Avatar sizes="lg" variant="square" alt={row.name_uz} src={row.photos?.length ? baseUrl + row.photos[0]?.image : 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png'} />
      )
    },
    {
      title: "Mahsulot raqami",
      selector: (row) => row.code,
    },
    {
      title: "Nomi UZ",
      selector: (row) => row.name_uz,
    },
    {
      title: "Nomi RU",
      selector: (row) => row.name_ru,
    },
    {
      title: "Nomi EN",
      selector: (row) => row.name_en,
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

  const handlePaginate = (e, page) => {
    console.log(location.pathname, page)
    navigate({
      pathname: location.pathname,
      search: `?${createSearchParams({
        ...defaultQuery,
        page
      })}`
    });
  }

  const handleSearch = () => {
    const query = {
      ...defaultQuery,
      search
    }
    dispatch(getProducts(`?${qs.stringify(query)}`))
  }

  const PaginationCom = () => {
    return <Pagination defaultPage={products?.current_page} onChange={handlePaginate} count={products?.last_page} color="success" style={{ margin: 'auto' }} />
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
                <MDBox display="flex" justifyContent="flex-end" gap='5px'>
                  <MDInput type="text" value={search} label="ID, Code, Nomi" onChange={(e) => setSearch(e.target.value)} />
                  <MDButton onClick={handleSearch} color="success">
                    <Icon>search</Icon>
                  </MDButton>
                </MDBox>
                <DataTable
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

export default Tables;
