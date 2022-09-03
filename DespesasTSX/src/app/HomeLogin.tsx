import {
  Alert,
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useState, FormEvent } from "react";
import { IUser, logInendpoint } from "./backend";

interface IHomeLoging {
  onSignIn: (user: IUser) => void;
}

export function HomeLogin(props: IHomeLoging) {
  const [email, setEmail] = useState(""); //Guarda o email para login
  const [password, setPassword] = useState(""); //Guarda a senha
  const [error, setError] = useState(""); //Guarda eventuais erros de login

  //Função para o processo de login
  function signIn(e: FormEvent) {
    e.preventDefault(); //previne que seja feito um "POST", para quando se deseja controlar como será feito o POST
    logInendpoint(email, password).then(props.onSignIn, (e) =>
      setError("Email não encontrado ou senha incorreta")
    );
  }

  return (
    <Box>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Box display="flex" alignItems="center" padding="4px 8px">
            <Typography variant="h6" component="div">
              Bem Vindo
            </Typography>
            <HomeIcon />
          </Box>
        </Toolbar>
      </AppBar>
      <Box padding="10px 4px">
        <Container maxWidth="sm">
          <form onSubmit={signIn}>
            <TextField
              margin="normal"
              fullWidth
              required
              id="outlined-required"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              required
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="error">{error}</Alert>
              </Stack>
            )}
            <Box textAlign="center" marginTop="16px">
              <Button type="submit" variant="text">
                Entrar
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </Box>
  );
}
