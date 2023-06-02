"use client";
import * as React from "react";
import { ConnectWallet } from "@thirdweb-dev/react";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

export default function Header() {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Typography variant="h2" gutterBottom>
            Habit maker
          </Typography>
          <Typography variant="h6" gutterBottom>
            Just make habits
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <ConnectWallet />
        </Grid>
      </Grid>
    </div>
  );
}
