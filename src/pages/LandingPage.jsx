import React from "react"
import { Link } from "react-router-dom"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import { positions } from "@mui/system"
// import MenuIcon from "@mui/icons-material/Menu"
import ApartmentImage from "../assets/images/Apartment.svg"
import { Container, Grid } from "@mui/material"

function LandingPage() {
  return (
    <>
      <Box sx={{ backgroundColor: "#b7cdcd", minHeight: "100vh" }}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position='static' color='transparent'>
            <Toolbar>
              <IconButton
                size='large'
                edge='start'
                color='inherit'
                aria-label='menu'
                sx={{ mr: 2 }}
              >
                {/* <MenuIcon /> */}
              </IconButton>
              <Typography variant='h5' component='div' sx={{ flexGrow: 1 }}>
                Granat
              </Typography>
              {/* <Link to='login'>Login</Link> */}
              <Button component={Link} to='login' color='inherit'>
                Login
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
        <Box
          sx={{
            height: "92vh",
          }}
        >
          <Grid container sx={{ height: "100%", paddingInline: 12 }}>
            <Grid item sm={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 4,
                  paddingInline: 5,

                  height: "100%",
                }}
              >
                <Typography
                  component='h1'
                  variant='h3'
                  sx={{ fontWeight: 800, letterSpacing: 2, lineHeight: 1.3 }}
                >
                  Simplify your property management today
                </Typography>
                <Typography variant='body2'>
                  the Granat provides a platform for landlords and tenants to
                  communicate with each other. Get started today!
                </Typography>
              </Box>
            </Grid>
            <Grid item sm={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 4,
                  paddingInline: 5,

                  height: "100%",
                }}
              >
                <img
                  src={ApartmentImage}
                  alt='landing illustration'
                  style={{ maxWidth: "100%", marginBottom: "2rem" }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
        {/* <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "80vh",
    
          }}
        >
          <Typography
            variant='body2'
            sx={{
              fontSize: "23px",
              color: "#687690",
              fontWeight: "500",
              mt: 20,
            }}
          >
            
          </Typography>
          <Typography
            variant='h3'
            sx={{ fontsize: "10px", color: "#5A6473", my: 8 }}
          >
            
          </Typography>
          <Box
            sx={{
              height: "100%",
              display: "-webkit-flex",
              float: "right",
              mt: 10,
              flexDirection: "row-reverse",
              alignItems: "flex-end",
            }}
          >
            
          </Box>
        </Box> */}
      </Box>
    </>
  )
}

export default LandingPage
