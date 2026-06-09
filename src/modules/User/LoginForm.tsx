import { Button, Stack, TextField } from "@mui/material";

export default function LoginForm () {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // Handle login logic here
      }}
    >
      <Stack spacing={2}>
        <TextField label="Username" variant="outlined" />
        <TextField label="Password" variant="outlined" type="password" />
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