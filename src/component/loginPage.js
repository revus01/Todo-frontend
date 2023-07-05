import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router';


const defaultTheme = createTheme();

export default function LoginPage() {

  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem("userData") !== null){
      navigate("/user/todolist")
    }
  })

  
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios.post('/user/login',{
      email: data.get('email'),
      password: data.get('password')
      })
      .then(response => {alert("로그인 성공!"); localStorage.setItem("userData", JSON.stringify(response.data));})
      .catch(error => {alert("이메일 혹은 비밀번호가 맞지 않습니다. 다시 로그인을 시도해주세요.")})

  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            로그인
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <div style={{float:"right"}}>
                <Link href="/signup" variant="body2">
                  {"아직 계정이 없으신가요? 회원가입하기"}
                </Link>
            </div>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}