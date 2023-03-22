import { Grid, Paper, Typography } from '@mui/material'
import React from 'react'

function DashboardHome() {
  return (
    <Grid container spacing={3}>
      <Grid container spacing={2} padding={3}>
        <Grid item lg={4} md={6} sm={6} xs={12}>
          <Paper
            sx={{
              padding: 4,
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Typography component="h2" variant="h5">
              Appartments
            </Typography>
            <Typography component="h2" variant="h6">
              2
            </Typography>
          </Paper>
        </Grid>
        <Grid item lg={4} md={6} sm={6} xs={12}>
          <Paper
            sx={{
              padding: 4,
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Typography component="h2" variant="h5">
              Houses
            </Typography>
            <Typography component="h2" variant="h6">
              77
            </Typography>
          </Paper>
        </Grid>
        <Grid item lg={4} md={6} sm={6} xs={12}>
          <Paper
            sx={{
              padding: 4,
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Typography component="h2" variant="h5">
              Tenants
            </Typography>
            <Typography component="h2" variant="h6">
              10
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default DashboardHome
