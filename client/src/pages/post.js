import Head from "next/head";
import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
  CardActions,
  Button,
} from "@mui/material";
import { Layout as DashboardLayout } from "../layouts/dashboard/layout";
import { AccountProfile, PostProfile } from "../sections/post/account-profile";
import { AccountProfileDetails, PostProfileDetails } from "../sections/post/post-profile-details";
import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();
  const handleShowAllPosts = () => {
    // Use the push method to navigate to the "allposts" page
    router.push("/allpost");
  };

  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">Posts</Typography>
            </div>
            <div>
              <CardActions sx={{ justifyContent: "flex-end" }}>
                <Button variant="contained" onClick={handleShowAllPosts}>
                  Show All Posts
                </Button>
              </CardActions>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} md={6} lg={8}>
                  <PostProfileDetails />
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
