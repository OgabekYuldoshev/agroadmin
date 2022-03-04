import { useEffect, useState } from "react";
import { Grid, Card, Icon, IconButton, Avatar } from "@mui/material";
import DataTable from "react-data-table-component";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getImages } from "redux/reducers/Media";
// import { Link } from "react-router-dom";
import ModalCom from "./operations/NewAlbom";
import MDButton from "components/MDButton";
import { Link } from "react-router-dom"
import { baseUrl } from "utils";
import { deleteImages } from "redux/reducers/Media";
// import { baseUrl } from "utils";

function Tables() {
  useEffect(() => {
    dispatch(getImages());
  }, []);

  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((current) => !current);
  const dispatch = useDispatch();
  const { photos } = useSelector((state) => state.media);

  const columns = [
    {
      name: "Rasm",
      width: "100px",
      cell: (row) => <Avatar sizes="lg" variant="square" alt={row.name_uz} src={baseUrl + row?.image} />,
    },
    {
      name: "Sarlovha UZ",
      selector: (row) => row.title_uz,
    },
    {
      name: "Sarlovha RU",
      selector: (row) => row.title_ru,
    },
    {
      name: "Sarlovha EN",
      selector: (row) => row.title_en,
    },
    {
      name: "Type",
      wrap: true,
      selector: (row) => parseInt(row?.type_id) === 1 ? 'Seminarlar' : "Do'konlar",
    },
    {
      title: "Action",
      right: true,
      cell: (row) => (
        <MDBox display="flex">
          <Link to={`/photos/${row.id}`}>
            <IconButton>
              <Icon fontSize="small" color="success">
                edit
              </Icon>
            </IconButton>
          </Link>
          <IconButton >
            <Icon fontSize="small" onClick={() => dispatch(deleteImages(row?.id))} color="error">
              delete
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
                  Albomlar
                </MDTypography>
                <MDButton onClick={toggle}>Albom yaratish</MDButton>
              </MDBox>
              <MDBox p={3}>
                <ModalCom open={open} toggle={toggle} />
                <DataTable noDataComponent="Ma'lumot mavjud emas!" columns={columns} data={photos} pagination />
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
