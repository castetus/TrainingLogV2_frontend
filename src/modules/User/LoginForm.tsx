import { authService } from "@/api/auth/auth";
import { useNotificationStore } from "@/store";
import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function LoginForm () {

  const navigate = useNavigate();
  const notificationStore = useNotificationStore();

  const [form, setForm] = useState({
    login: '',
    password: '',
  });

  const handleSubmit = async () => {
    if (!form.login || !form.password) {
      return;
    }

    const succesfulLogin = await authService.login(form);

    if (!succesfulLogin) {
      notificationStore.showNotification({ text: 'Login failed', type: 'error' });
      return;
    }

    navigate('/');
  }

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
          label="Password"
          variant="outlined"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
        >
          Login
        </Button>
      </Stack>
    </form>
  )
};