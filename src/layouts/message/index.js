import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "redux/reducers/Units";
// import { Link } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getDate } from "utils";

function Tables() {
  useEffect(() => {
    dispatch(getMessages());
  }, []);

  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.units);

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
                  Xabarlar
                </MDTypography>
              </MDBox>
              <MDBox p={3}>
                {messages?.map((item, index) => (
                  <Accordion key={index}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={item?.email}
                      id={item?.email}
                    >
                      <Typography fontSize={15} fontWeight="bold" pr={1}>
                        {item.name}
                      </Typography>
                      <Typography fontSize={14}>{`<${item.email}>`}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography fontSize={14}>{item?.text}</Typography>
                      <Typography pt={2} textAlign="end" fontSize={14}>
                        {getDate(item?.created_at)}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
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
