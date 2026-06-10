import { authService } from "@/api/auth/auth";
import { Stack, TextField, Button } from "@mui/material";
import { useState } from "react";

export default function RegisterForm () {

  const [form, setForm] = useState({
    login: '',
    password: '',
    passwordConfirm: '',
    email: '',
  });


  const handleSubmit = async () => {
    if (!form.login || !form.password || !form.passwordConfirm || !form.email) {
      return;
    }

    if (form.password !== form.passwordConfirm) {
      return;
    }

    const response = await authService.register();

    if (!response) {
      return;
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Stack spacing={2}>
        <TextField
          label="Username"
          variant="outlined"
          value={form.login}
          onChange={(e) => setForm({ ...form, login: e.target.value })}
        />
      <TextField
          label="Email"
          variant="outlined"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          type="password"
          value={form.passwordConfirm}
          onChange={(e) => setForm({ ...form, passwordConfirm: e.target.value })}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
        >
          Register
        </Button>
      </Stack>
    </form>
  );
};