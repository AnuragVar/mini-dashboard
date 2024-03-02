import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { useState } from "react";

const user = {
  avatar: "/assets/avatars/avatar-anika-visser.png",
  city: "Los Angeles",
  country: "USA",
  jobTitle: "Senior Developer",
  name: "Anika Visser",
  timezone: "GTM-7",
};

export const PostProfile = () => {
  const [file, setFile] = useState([]);
  const [fileUploadError, setFileUploadError] = useState(false);
  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        ></Box>
      </CardContent>
      <Divider />
      <CardActions>
        <label>Upload Picture</label>
        <input
          accept="image/*"
          multiple
          id="images"
          type="file"
          className=" rounded-lg border-gray-300 border p-4"
          onChange={(e) => {
            setFile(e.target.files);
            setFileUploadError(null);
          }}
        ></input>
      </CardActions>
    </Card>
  );
};
