import LoginForm from "@/modules/User/LoginForm";
import RegisterForm from "@/modules/User/RegisterForm";
import { Container, Link, Stack } from "@mui/material";
import { useState } from "react";

export default function LoginPage () {

  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <Container
      sx={{
        width: '300px',
        margin: 'auto',
      }}
    >
      <Stack
        spacing={6}
      >
      { isRegistering ? <RegisterForm /> : <LoginForm /> }

      <Link onClick={() => setIsRegistering(!isRegistering)}>
        { isRegistering ? 'Already have an account? Login' : 'Don\'t have an account? Register' }
      </Link>
      </Stack>
    </Container>
  );
};