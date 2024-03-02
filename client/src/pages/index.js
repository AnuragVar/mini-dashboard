import Head from "next/head";
import { subDays, subHours } from "date-fns";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "../layouts/dashboard/layout";
import { OverviewImpressions } from "../sections/overview/overview-Impressions";
import { OverviewDetails } from "../sections/overview/overview-Details";
import { OverviewTotalLikes } from "../sections/overview/overview-TotalLikes";
import { OverviewFollowers } from "../sections/overview/overview-Followers";
import { OverviewTotalComments } from "../sections/overview/overview-TotalComments";
import { OverviewTraffic } from "../sections/overview/overview-traffic";
import { useEffect, useState } from "react";

const now = new Date();

const Page = () => {
  const [stats, setStats] = useState({
    stats: {
      this_year: [],
      last_year: [],
    },
    impressions: {
      amount: 20,
      difference: 20,
      positive: true,
    },
    new_followers: {
      amount: 20,
      difference: 20,
      positive: false,
    },
    total_likes: 0,
    total_comments: 0,
    trafficStats: [63, 15, 22],
  });
  const [done, setDone] = useState(false);
  useEffect(
    function () {
      const callPostsRequest = async () => {
        try {
          console.log("hi");
          const res = await fetch(`http://localhost:5000/iii/posts/getStats`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await res.json();
          console.log(data);
          if (data.success) {
            setStats(data.data[0]);
            setDone(true);
          }
        } catch (err) {
          console.log("error", err);
        }
      };
      callPostsRequest();
    },
    [done]
  );

  return (
    <>
      <Head>
        <title>Overview</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        {console.log(stats)}
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewImpressions
                difference={12}
                positive
                sx={{ height: "100%" }}
                value={stats.impressions?.amount}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewFollowers
                difference={16}
                positive={false}
                sx={{ height: "100%" }}
                value={stats?.new_followers?.amount}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalLikes sx={{ height: "100%" }} value={stats?.total_likes} />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalComments sx={{ height: "100%" }} value={stats?.total_comments} />
            </Grid>
            <Grid xs={12} lg={8}>
              <OverviewDetails
                chartSeries={[
                  {
                    name: "This year",
                    data: stats?.stats?.this_year || [3, 4, 6, 4, 5, 4, 5, 6, 3, 5, 3, 2],
                  },
                  {
                    name: "Last year",
                    data: stats?.stats?.last_year || [3, 4, 6, 4, 5, 4, 5, 6, 3, 5, 3, 2],
                  },
                ]}
                sx={{ height: "100%" }}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4}>
              <OverviewTraffic
                chartSeries={stats?.trafficStats}
                labels={["Desktop", "Tablet", "Phone"]}
                sx={{ height: "100%" }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
