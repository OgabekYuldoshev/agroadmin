import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "redux/reducers/Category";
import { Icon, Chip, IconButton, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import MDButton from "components/MDButton";
import AddCategory from "./operations/AddCategory";
import EditModal from "./operations/Edit";
import { baseUrl } from "utils"

function Category() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((current) => !current);

  const [edit, setEdit] = useState({ opened: false, id: null });
  const handleEdit = (id) =>
    setEdit({
      opened: !edit?.opened,
      id: id,
    });

  useEffect(() => {
    dispatch(getCategory({ parent_id: null, level: 1 }));
  }, [dispatch]);

  const { categories } = useSelector((state) => state.category);

  const columns = [
    {
      name: "Rasm",
      width: "100px",
      cell: (row) => <Avatar alt={row.name} src={baseUrl + row.image} />,
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
          <Link to={`/category/${row.id}`}>
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
  //     id: 'id',
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
  //       <MDBox display="flex">
  //         <Link to={`/category/${row.id}`}>
  //           <IconButton>
  //             <Icon fontSize="small" color="info">
  //               visibility
  //             </Icon>
  //           </IconButton>
  //         </Link>
  //         <IconButton onClick={() => handleEdit(row.id)}>
  //           <Icon fontSize="small" color="success">
  //             edit
  //           </Icon>
  //         </IconButton>
  //         {/* <IconButton onClick={()=>dispatch()}>
  //           <Icon fontSize="small" color="error">delete</Icon>
  //         </IconButton> */}
  //       </MDBox>
  //     ),
  //   },
  // ];



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
                <AddCategory width={800} toggle={toggle} open={open} />
                <MDButton onClick={toggle}>Kategorya qo'shish</MDButton>
              </MDBox>
              <MDBox p={3}>
                <EditModal
                  width={800}
                  toggle={() => handleEdit({ open: false, id: null })}
                  item={edit}
                />
                <DataTable paginationPerPage={100} noDataComponent="Ma'lumot mavjud emas!" columns={columns} data={categories} />
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
