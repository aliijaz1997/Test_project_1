import React from "react"
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography
} from "@mui/material"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"

import Image from "next/image"
import TuringIcon from "../public/tlogo.png"
import axios from "axios"
import { BaseUrl } from "../src/utils/baseUrl"
import { AuthContext } from "../src/context/authContext"
import { useRouter } from "next/router"

interface LoginProps {}

const loginUrl: string = `${BaseUrl}/auth/login`
function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Turing Technologies
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}
const Login: LoginProps = () => {
  const authContext = React.useContext(AuthContext)
  const router = useRouter()

  React.useEffect(() => {
    // checks if the user is authenticated
    authContext.isUserAuthenticated() ? router.push("/") : router.push("/login")
  }, [authContext.isUserAuthenticated()])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    axios
      .post(loginUrl, {
        username: data.get("email"),
        password: data.get("password")
      })
      .then(res => {
        authContext.setUserAuthInfo({ token: res.data.access_token })
      })
  }
  return (
    <Box sx={{ backgroundColor: "#F4EFEE", height: "100vh" }}>
      <CssBaseline />
      <Box
        sx={{
          p: "1rem",
          backgroundColor: "white",
          display: "flex",
          justifyContent: "space-between",
          boxShadow: "0px 0px 8px 2px gray"
        }}
      >
        <Image src={TuringIcon} width={400} height={50} alt="TuringICon" />
      </Box>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Box>
  )
}

export default Login
