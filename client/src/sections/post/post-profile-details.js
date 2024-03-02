import { useCallback, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";
// react plugin for creating date-time-picker
import Datetime from "react-datetime";
import DateTimePicker from "react-datetime-picker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// @material-ui/core componentsimport { makeStyles } from "@mui/styles";

const states = [
  {
    value: "alabama",
    label: "Alabama",
  },
  {
    value: "new-york",
    label: "New York",
  },
  {
    value: "san-francisco",
    label: "San Francisco",
  },
  {
    value: "los-angeles",
    label: "Los Angeles",
  },
];

export const PostProfileDetails = () => {
  const [values, setValues] = useState({ title: "", description: "" });
  const [schedule, setSchedule] = useState(false);

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
  }, []);
  const handlePost = async () => {
    console.log(2);
    setValues({ title: "", description: "" });
  };
  const handleDrafts = async () => {
    try {
      console.log(values.title);
      const res = await fetch(`http://localhost:5000/iii/drafts/createDrafts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching drafts:", error);
    }
  };
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  async function handleScheduleSubmit() {
    try {
      console.log(date, time,values);
      const res = await fetch(`http://localhost:5000/iii/drafts/schedulePost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, date, time }),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching drafts:", error);
    }
  }
  return (
    <>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Card>
          <CardHeader subheader="Put the post details" title="Add Post" />
          <CardContent sx={{ pt: 0 }}>
            <Box sx={{ m: -1.5 }}>
              <Grid container spacing={3}>
                <Grid xs={15} md={6}>
                  <TextField
                    fullWidth
                    helperText="Please specify the title"
                    label="title"
                    name="title"
                    onChange={handleChange}
                    required
                    value={values.title}
                  />
                </Grid>
                <Grid xs={12} md={15}>
                  <TextField
                    fullWidth
                    label="description"
                    name="description"
                    onChange={handleChange}
                    required
                    value={values.description}
                  />
                </Grid>
              </Grid>
            </Box>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button disabled={schedule} variant="contained" onClick={() => handlePost()}>
              Post It!!
            </Button>
            <Button disabled={schedule} variant="contained" onClick={() => handleDrafts()}>
              Draft
            </Button>
            <Button variant="contained" onClick={() => setSchedule(!schedule)}>
              Schedule
            </Button>
          </CardActions>
        </Card>
      </form>
      {schedule && (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", padding: "10px" }}>
          <div>
            <label>Date:</label>
            <input
              placeholder="YYYY/MM/DD"
              style={{ padding: "2px" }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <label>Time:</label>
            <input
              placeholder="HH:MM"
              style={{ padding: "2px" }}
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <Button variant="contained" onClick={() => handleScheduleSubmit()}>
            Submit
          </Button>
        </div>
      )}
    </>
  );
};
