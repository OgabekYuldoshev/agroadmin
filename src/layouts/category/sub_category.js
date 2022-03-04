import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Icon, IconButton } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import moment from "moment";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "react-data-table-component";
import Chip from "@mui/material/Chip";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "redux/reducers/Category";
import { useLocation, useParams, Link } from "react-router-dom";
import MDButton from "components/MDButton";
import AddSubCategory from "./operations/AddSubCategory";
import AddSubSubCategory from "./operations/AddSub-SubCategory";

import EditModal from "./operations/Edit";
function Category() {
  const dispatch = useDispatch();
  const location = useLocation()
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((current) => !current);

  const [edit, setEdit] = useState({ opened: false, id: null });
  const handleEdit = (val) =>
    setEdit({
      opened: !edit?.opened,
      id: val,
    });

  const [sub, setSub] = useState({ opened: false, id: null });
  const handleSub = (val) =>
    setSub({
      opened: !sub?.opened,
      id: val,
    });

  useEffect(() => {
    dispatch(getCategory({ parent_id: id, level: 2 }));
  }, [id])

  const { categories } = useSelector((state) => state.category);
  console.log(categories)

  const columns = [
    {
      name: "ID",
      cell: (row) => row.id,
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
      name: "Level",
      selector: (row) => row.level,
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
      width: "250px",
      cell: (row) => (
        <MDBox display="flex">
          <Link to={`${location.pathname}/${row.id}`}>
            <IconButton>
              <Icon fontSize="small" color="info">
                visibility
              </Icon>
            </IconButton>
          </Link>
          <IconButton onClick={() => handleEdit(row.id)}>
            <Icon fontSize="small" color="success">
              edit
            </Icon>
          </IconButton>
        </MDBox>
      ),
    },
  ];


  // const columns = [
  //   {
  //     title: "ID",
  //     width: "100px",
  //     selector: (row) => row.id,
  //   },
  //   {
  //     title: "Name UZ",
  //     selector: (row) => row.name_uz,
  //   },
  //   {
  //     title: "Name RU",
  //     selector: (row) => row.name_ru,
  //   },
  //   {
  //     title: "Name EN",
  //     selector: (row) => row.name_en,
  //   },
  //   {
  //     title: "Level",
  //     selector: (row) => row.level,
  //   },
  //   {
  //     title: "Status",
  //     cell: (row) =>
  //       row.is_active ? (
  //         <Chip label="Active" color="success" />
  //       ) : (
  //         <Chip label="Unactive" color="error" />
  //       ),
  //   },
  //   {
  //     title: "Action",
  //     right: true,
  //     cell: (row) => (

  //     ),
  //   },
  // ];

  console.log(sub)

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
                  Kategoryalar
                </MDTypography>
                <AddSubCategory width={800} toggle={toggle} open={open} />
                <MDButton onClick={toggle}>Sub kategorya qo'shish</MDButton>
              </MDBox>
              <MDBox p={3}>
                <EditModal
                  width={800}
                  toggle={() => handleEdit({ open: false, id: null })}
                  item={edit}
                />
                <DataTable noDataComponent="Ma'lumot mavjud emas!" columns={columns} data={categories} />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Category;
