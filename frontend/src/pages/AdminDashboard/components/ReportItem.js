import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { Stack, Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

export default function ReportItem() {
  return (
    <Card sx={{display:'contents'}}>
      <Grid container sx={{
        minWidth: 1000,
        maxWidth: 1800,
        maxHeight: 200,
        display: "flex",
        background: "#f1f0f5",
        margin: 1,
        borderRadius: 3,
      }} >
        <Grid xs={2}>
          <CardMedia
            component="img"
            image="data:image/png;base64,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"
            alt="green iguana"
            sx={{ height: 180, width: 180, padding: 1, borderRadius: 5 }}
          />
        </Grid>
        <Grid xs={8}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </Grid>
        <Grid xs={2}>
          <CardActions>
            <Stack spacing={2} margin={4}>
              <Button variant="contained" color="success">
                Submit
              </Button>
              <Button variant="contained" color="warning">
                Delete
              </Button>
            </Stack>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
}
