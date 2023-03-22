// import { Box } from '@mui/system'
import { Box, Card, CardContent, Grid, Typography } from '@mui/material'

import React from 'react'

function Appartments() {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item sm={12} md={3}>
          <Card>
            <Box sx={{ height: 200, background: '#333' }}>
              <img
                style={{ objectFit: 'cover' }}
                src="https://www.svgrepo.com/show/475076/house.svg"
                alt="apartment"
                srcset=""
                height={'100%'}
                width="100%"
              />
            </Box>

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Appartment name
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Location
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default Appartments
