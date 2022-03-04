import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListSubheader,
  IconButton,
  Icon,
} from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getSlider, deleteSlider } from "redux/reducers/Units";
// import { Link } from "react-router-dom";
import ModalCom from "./operations/Modal";
import MDButton from "components/MDButton";
import { baseUrl } from "utils";

function Tables() {
  useEffect(() => {
    dispatch(getSlider());
  }, []);

  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((current) => !current);

  const dispatch = useDispatch();
  const { sliders } = useSelector((state) => state.units);

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
                  Sliderlar
                </MDTypography>
                <MDButton onClick={toggle}>Slide qo'shish</MDButton>
              </MDBox>
              <MDBox p={3}>
                <ModalCom open={open} toggle={toggle} />
                <ImageList cols={5} gap={8}>
                  {sliders.map((item, index) => (
                    <ImageListItem key={index}>
                      <img src={`${baseUrl + item.image}`} alt={item.name} loading="lazy" />
                      <ImageListItemBar
                        title={item.name}
                        actionIcon={
                          <IconButton onClick={() => dispatch(deleteSlider(item.id))}>
                            <Icon color="error">delete</Icon>
                          </IconButton>
                        }
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
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
