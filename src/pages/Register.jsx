import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import { Controller, useForm } from 'react-hook-form'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import loginImage from '../assets/images/login.svg'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login, register, reset } from '../features/auth/authSlice'
import { width } from '@mui/system'
import { Alert } from '@mui/material'

const theme = createTheme()

export default function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isError, isSuccess, message, isLoading } = useSelector(
    (state) => state.auth
  )

  function registerSubmit(data) {
    data = { ...data, roleId: 2 }
    console.log(data)
    if (data.password === data.confirmpassword) {
      dispatch(register(data))
      // reset()
    }
  }

  const nav = React.useCallback(() => {
    navigate('/login')
  }, [isSuccess, navigate])

  React.useEffect(() => {
    if (isSuccess) {
      nav()
    }

    return () => reset()
  }, [isSuccess, nav])

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      confirmpassword: '',
      password: ''
    }
  })
  const onSubmit = (data) => registerSubmit(data)

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component="main"
        sx={{ height: '100vh', maxHeight: '100vh' }}
      >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={6}
          sx={{
            height: ' 100%',
            width: '100%',
            background: '#edf9eb'
          }}
        >
          <Box
            md={6}
            // xs={false}
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              bottom: 0,
              height: '100%',
              display: ' flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '45%'
              // background: '#333'
            }}
          >
            <img
              src={loginImage}
              width="100%"
              alt="login illustration"
              // height={"700px"}
              // backgroundPosition='center'
              // backgroundSize='cover'
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Box
            sx={{
              // mx: 2,
              m: 'auto',
              maxWidth: '550px',
              width: '90%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.light' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Typography color={'GrayText'} variant="body1">
              Create your account
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1 }}
            >
              <Controller
                name={'firstname'}
                control={control}
                rules={{
                  required: true
                }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    margin="normal"
                    onChange={onChange}
                    value={value}
                    required
                    fullWidth
                    label="First Name"
                    name="firstname"
                    autoFocus
                    error={errors.firstname}
                  />
                )}
              />

              <Controller
                name={'lastname'}
                control={control}
                rules={{
                  required: true
                }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    margin="normal"
                    onChange={onChange}
                    value={value}
                    required
                    fullWidth
                    label="Last Name"
                    name="lastname"
                    autoFocus
                    error={errors.lastname}
                  />
                )}
              />

              <Controller
                name={'email'}
                control={control}
                rules={{
                  required: true
                }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    margin="normal"
                    onChange={onChange}
                    value={value}
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    error={errors.email}
                  />
                )}
              />

              <Controller
                name={'password'}
                control={control}
                rules={{
                  required: true
                }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    margin="normal"
                    onChange={onChange}
                    value={value}
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    autoFocus
                    error={errors.password}
                  />
                )}
              />

              <Controller
                name={'confirmpassword'}
                control={control}
                rules={{
                  required: true
                }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    margin="normal"
                    onChange={onChange}
                    value={value}
                    required
                    fullWidth
                    label="Confirm Password"
                    name="confirmpassword"
                    type="password"
                    autoFocus
                    error={errors.password}
                  />
                )}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading}
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>

              {isError && (
                <Box sx={{ mb: 3 }}>
                  <Alert severity="error">
                    {message ? message?.msg : null}
                  </Alert>
                </Box>
              )}

              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link href="/login" variant="body2">
                    {'Already have an account? Sign In'}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
