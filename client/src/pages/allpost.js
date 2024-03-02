import Head from "next/head";
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid, Button } from "@mui/material";
import { Layout as DashboardLayout } from "../layouts/dashboard/layout";
import { useEffect, useState } from "react";

const Page = () => {
  const [posts, setPosts] = useState([]);

  const fetchDrafts = async () => {
    try {
      // Make a fetch call to your API to get drafts
      const res = await fetch("http://localhost:5000/iii/drafts/getAllDrafts", {
        method: "GET",
      });
      const data = await res.json();
      console.log(data);
      setPosts(data);
    } catch (error) {
      console.error("Error fetching drafts:", error);
    }
  };

  useEffect(() => {
    // Call the function to fetch drafts when the component mounts
    fetchDrafts();
  }, []);


  return (
    <>
      <Head>
        <title>All Drafts</title>
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
              <Typography variant="h4">All Drafts</Typography>
            </div>
            <div
              style={{
                borderRadius: "1%",
                padding: "8px",
                boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              {posts.map((post) => (
                <Posts key={post} post={post} onPostSubmit={fetchDrafts}/>
              ))}
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

function Posts({ post, onPostSubmit }) {
  async function handleSubmit(title) {
    try {
      console.log(title);
      const res = await fetch(`http://localhost:5000/iii/drafts/submitDrafts/${title}`, {
        method: "POST",
      });
      const data = await res.json();
      console.log(data);
      onPostSubmit();
    } catch (error) {
      console.error("Error fetching drafts:", error);
    }
  }

  return (
    <div style={{ padding: "2px", gap: "5px", boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)" }}>
      <p style={{ fontSize: "20px" }}>{post.title}</p>
      <p>{post.description}</p>
      <Button variant="contained" onClick={() => handleSubmit(post.title)}>
        Post It!!
      </Button>
    </div>
  );
}

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
