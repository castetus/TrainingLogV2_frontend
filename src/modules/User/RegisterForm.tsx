import { authService } from "@/api/services/auth/auth";
import { Stack, TextField, Button, Alert } from "@mui/material";
import { registerSchema } from "./User.validation";
import type { RegisterFormValues } from "./User.validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/store";
import { Google } from "@mui/icons-material";
import { useGoogleAuth } from "./useGoogleAuth";

export default function RegisterForm () {

  const navigate = useNavigate();
  const authStore = useAuthStore();

  const { openGoogleWindow } = useGoogleAuth();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await authService.register(data);
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

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField
            label="Username"
            variant="outlined"
            {...register('name')}
          />
          <TextField
            label="Email"
            variant="outlined"
            {...register('email')}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            {...register('password')}
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            type="password"
            {...register('passwordConfirm')}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            loading={isSubmitting}
          >
            Register
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
  );
};