import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Person } from '@mui/icons-material';
import { deepOrange } from '@mui/material/colors';
import axios from 'axios';
import { useNavigate } from 'react-router';

const defaultTheme = createTheme();

export default function SignUpPage() {

  const navigate = useNavigate();

  const [isPasswordSame, setIsPasswordSame] = useState(true);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if(data.get('email').match(emailRegEx) === null){
      alert("이메일 형식을 맞춰주세요.")
    }else if(!isPasswordSame){
      alert("비밀번호가 다릅니다.");
    }else{
      axios.post('/user/signup',{
        username: data.get('username'),
        email: data.get('email'),
        password: data.get('password')
        })
        .then(response => {alert("회원가입이 완료되었습니다."); navigate("/login") })
        .catch(error => {alert("동일한 이메일로 회원가입한 기록이 있습니다. 다른 이메일을 사용해주세요.")})
    }
  };


  const compare = (passwd, confirmPasswd) =>{
    if(passwd === confirmPasswd){
        setIsPasswordSame(true)
    }else{
        setIsPasswordSame(false)
    }
  }


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
          <Avatar sx={{ m: 1, bgcolor: deepOrange[500] }}>
            <Person />
          </Avatar>
          <Typography component="h1" variant="h5" marginTop={"10px"}>
            회원가입
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="username"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  type="password"
                  name="password"
                  autoComplete="password"
                  onChange={(a)=>{setPassword(a.target.value); compare(a.target.value, confirmPassword)}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirm_password"
                  label="Confirm password"
                  type="password"
                  id="confirm_password"
                  autoComplete="confirm_password"
                  onChange={(a)=>{setConfirmPassword(a.target.value); compare(password, a.target.value)}}
                />
              </Grid>
            </Grid>
            {!isPasswordSame
            ?<Typography component="h6" variant="h6">
                패스워드가 일치하지 않습니다.
            </Typography>
            : <></>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  이미 회원가입을 하셨나요? 로그인 하기
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}