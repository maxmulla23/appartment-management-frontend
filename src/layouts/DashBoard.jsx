import * as React from "react"
import { styled, createTheme, ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import MuiDrawer from "@mui/material/Drawer"
import Box from "@mui/material/Box"
import MuiAppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
// import List from '@mui/material/List'
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import Badge from "@mui/material/Badge"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
// import Paper from '@mui/material/Paper'
// import Link from '@mui/material/Link'
import MenuIcon from "@mui/icons-material/Menu"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import NotificationsIcon from "@mui/icons-material/Notifications"
import { Link, Outlet, useNavigate } from "react-router-dom"
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popover,
} from "@mui/material"
// import { mainListItems, secondaryListItems } from './listItems'
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined"
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined"
import { logout } from "../features/auth/authSlice"
import {
  AccountCircle,
  ContentPasteGo,
  Home,
  NotificationImportant,
  Person,
  VerifiedUser,
} from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"

const drawerWidth = 240

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}))

const mdTheme = createTheme()

function DashboardContent() {
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)
  React.useEffect(() => {
    if (!user || user === null) {
      navigate("/login")
    }
  }, [user, navigate])
  const [open, setOpen] = React.useState(true)
  // const [openPop, setopenPop] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const dispatch = useDispatch()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleLogout = () => {
    dispatch(logout())
    navigate("/")
  }

  const openPop = Boolean(anchorEl)
  const id = openPop ? "simple-popover" : undefined

  const toggleDrawer = () => {
    setOpen(!open)
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position='absolute' open={open} color='transparent'>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge='start'
              color='inherit'
              aria-label='open drawer'
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component='h1'
              variant='h6'
              color='inherit'
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color='inherit' onClick={handleClick}>
              <AccountCircle />
            </IconButton>
            <Popover
              id={id}
              open={openPop}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <List>
                <ListItemButton component={Link} to='/dashboard/appartments'>
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText
                    primary={`${user?.user.firstname} ${user?.user.lastname}`}
                  />
                </ListItemButton>
                <ListItemButton onClick={handleLogout} alignItems='center'>
                  <ListItemText primary='Log Out' />
                </ListItemButton>
              </List>
            </Popover>
          </Toolbar>
        </AppBar>
        <Drawer
          variant='permanent'
          open={open}
          sx={{
            "& .MuiDrawer-paper": {
              // background: '#333'
            },
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              {open && <ChevronLeftIcon />}
            </IconButton>
          </Toolbar>
          <Divider />
          <List>
            {user?.user.roleId == 1 && (
              <ListItemButton component={Link} to='/dashboard'>
                <ListItemIcon>
                  <DashboardCustomizeOutlinedIcon />
                  {/* <DashboardIcon /> */}
                </ListItemIcon>
                <ListItemText primary='Dashboard' />
              </ListItemButton>
            )}

            {user?.user.roleId == 2 && (
              <ListItemButton component={Link} to='/dashboard/home'>
                <ListItemIcon>
                  <Home />
                  {/* <DashboardIcon /> */}
                </ListItemIcon>
                <ListItemText primary='Home' />
              </ListItemButton>
            )}

            {user?.user.roleId == 1 && (
              <ListItemButton component={Link} to='/dashboard/appartments'>
                <ListItemIcon>
                  <HomeWorkOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary='Appartments' />
              </ListItemButton>
            )}

            {user?.user.roleId == 1 && (
              <ListItemButton component={Link} to='/dashboard/complaints'>
                <ListItemIcon>
                  <ContentPasteGo />
                </ListItemIcon>
                <ListItemText primary='Complaints' />
              </ListItemButton>
            )}
            {user?.user.roleId == 1 && (
              <ListItemButton component={Link} to='/dashboard/notices'>
                <ListItemIcon>
                  <NotificationImportant />
                </ListItemIcon>
                <ListItemText primary='Notices' />
              </ListItemButton>
            )}
          </List>
        </Drawer>
        <Box
          component='main'
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
            <Outlet />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default function Dashboard() {
  return <DashboardContent />
}
