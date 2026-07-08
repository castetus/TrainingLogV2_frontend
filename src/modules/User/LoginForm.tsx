import { authService } from "@/api/services/auth/auth";
import { useAuthStore } from "@/store";
import { Alert, Button, Stack, TextField } from "@mui/material";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { loginSchema, type LoginFormValues } from "./User.validation";
import { Google } from "@mui/icons-material";
import { useGoogleAuth } from "./useGoogleAuth";

export default function LoginForm () {

  const navigate = useNavigate();
  const authStore = useAuthStore();

  const { openGoogleWindow } = useGoogleAuth();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = form;

  const loginUser = async (data: LoginFormValues) => {
    try {
      await authService.login(data);
      authStore.setAuth(true);
      navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError('root', {
          type: 'server',
          message: error.response?.data?.message,
        });
      }
    }
  };

  return (
    <>
      {errors.root?.message && (
        <Alert severity="error">
          {errors.root.message}
        </Alert>
      )}
      <form onSubmit={handleSubmit(loginUser)}>
        <Stack spacing={2}>
          <TextField
            label="Email"
            variant="outlined"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register('email')}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register('password')}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            loading={isSubmitting}
          >
          Login
        </Button>
          <Button
            variant="contained"
            onClick={openGoogleWindow}
          >
            <Google sx={{marginRight: '8px'}} />
            Continue with Google
          </Button>
      </Stack>
    </form>
    </>
  )
};