import { Grid, Paper, Typography } from '@mui/material'
import axios from 'axios'
import React from 'react'
import UserTable from '../components/users/UserTable'

function DashboardHome() {
  const [users, setUsers] = React.useState([])
  const [houses, setHouses] = React.useState([])
  const [appartments, setAppartments] = React.useState([])

  React.useEffect(() => {
    getUsers()
    getHouses()
    // getAppartments()
  }, [])

  const getUsers = async () => {
    try {
      const response = await axios.get('users')
      // console.log(response)
      setUsers(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getHouses = async () => {
    try {
      const response = await axios.get('house')
      console.log(response)
      setHouses(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  // const getAppartments = async () => {
  //   try {
  //     const response = await axios.get('house')
  //     console.log(response)
  //     setHouses(response.data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
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
              {houses?.length}
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
              {users?.length}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <UserTable users={users} houses={houses} />
    </Grid>
  )
}

export default DashboardHome
