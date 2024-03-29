import { useEffect, useState } from "react";
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
import { getPartner } from "redux/reducers/Partners";

import ModalCom from "./operations/Modal";
import MDButton from "components/MDButton";
import { baseUrl } from "utils"
function Tables() {
  useEffect(() => {
    dispatch(getPartner());
  }, []);

  const [edit, setEdit] = useState({ opened: false, id: null });
  const handleEdit = (id) =>
    setEdit({
      opened: !edit?.opened,
      id: id || null,
    });

  const dispatch = useDispatch();
  const { partners } = useSelector((state) => state.partner);

  const columns = [
    {
      name: "Rasm",
      width: "100px",
      cell: (row) => <Avatar alt={row.name} src={baseUrl + row.image} />,
    },
    {
      name: "Nomi",
      width: "300px",
      selector: (row) => row.name,
    },
    {
      name: "Web Sahifasi",
      width: "250px",
      cell: (row) => (
        <a target="_blank" href={row.link}>
          {row.link}
        </a>
      ),
    },
    {
      name: "Turi",
      selector: (row) => parseInt(row.type_id) === 1 ? 'Asosiy hamkor' : row.type_id === 2 ? "Hamkor" : "Mijoz",
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
          <IconButton onClick={() => handleEdit(row.id)}>
            <Icon fontSize="small" color="success">
              edit
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
                  Hamkorlar
                </MDTypography>
                <MDButton onClick={handleEdit}>Hamkor qo'shish</MDButton>
              </MDBox>
              <MDBox p={3}>
                <DataTable noDataComponent="Ma'lumot mavjud emas!" columns={columns} data={partners} paginationPerPage={100} />
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
