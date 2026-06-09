import LoginForm from "@/modules/User/LoginForm";
import { Container } from "@mui/material";

export default function LoginPage () {

  return (
    <Container
      sx={{
        width: '300px',
        margin: 'auto',
      }}
    >
      <LoginForm />
    </Container>
  );
};