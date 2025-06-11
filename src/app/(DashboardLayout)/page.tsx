"use client";
import { Grid, Box } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
// components
import SalesOverview from "@/app/(DashboardLayout)/components/dashboard/SalesOverview";
import DashboardNotice from "./components/dashboard/DashboardNotice";
import DashboardInquiry from "./components/dashboard/DashboardInquiry";

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid
            size={{
              xs: 12,
              lg: 12,
            }}
          >
            <SalesOverview />
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 4,
            }}
          ></Grid>

          <Grid
            size={{
              xs: 12,
              lg: 12,
            }}
          >
            <DashboardNotice />
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 12,
            }}
          >
            <DashboardInquiry />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
