import LoginForm from "@/modules/User/LoginForm";
import RegisterForm from "@/modules/User/RegisterForm";
import { Box, Container, Link, Stack } from "@mui/material";
import { useState } from "react";

export default function LoginPage () {

  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <Container
      sx={{
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: '30px 0',
      }}
    >
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <Stack
          spacing={6}
        >
          {isRegistering ? <RegisterForm /> : <LoginForm />}
        </Stack>
      </Box>
      <Link onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? 'Already have an account? Login' : 'Don\'t have an account? Register'}
      </Link>
    </Container>
  );
};