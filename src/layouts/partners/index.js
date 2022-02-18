import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Avatar, Chip, Icon, IconButton } from "@mui/material"
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "react-data-table-component";

import { useDispatch, useSelector } from "react-redux";
import { getPartner } from "redux/reducers/Partners";
import { Link } from "react-router-dom";
import ModalCom from "./operations/Modal"
import MDButton from "components/MDButton";
function Tables() {
  useEffect(() => {
    dispatch(getPartner());
  }, []);

  const [edit, setEdit] = useState({ opened: false, id: null })
  const handleEdit = (id) => setEdit({
    opened: !edit?.opened,
    id: id || null
  })

  const dispatch = useDispatch();
  const { partners } = useSelector((state) => state.partner);

  const columns = [
    {
      name: "Rasm",
      width: '100px',
      cell: () => (
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      ),
    },
    {
      name: "Nomi",
      width: '400px',
      selector: (row) => row.name,
    },
    {
      name: "Web Sahifasi",
      width: '300px',
      cell: (row) => (<a target="_blank" href={row.link}>{row.link}</a>),
    },
    {
      name: "Status",
      cell: row => row.is_active ? <Chip label="Active" color="success" /> : <Chip label="Unactive" color="error" />
    },
    {
      name: "",
      width: '250px',
      cell: row => (
        <MDBox display="flex">
          <IconButton onClick={() => handleEdit(row.id)}>
            <Icon fontSize="small" color="success">edit</Icon>
          </IconButton>
        </MDBox>
      )
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
                  Hamkorlar
                </MDTypography>
                <MDButton onClick={handleEdit} >Hamkor qo'shish</MDButton>
              </MDBox>
              <MDBox p={3}>
                <DataTable columns={columns} data={partners} pagination />
                <ModalCom toggle={() => handleEdit({ open: false, id: null })} item={edit} />
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
