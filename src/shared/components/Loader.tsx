import { Backdrop, CircularProgress } from "@mui/material";

export default function Loader ({ open = true }: { open?: boolean }) {

  return (
    <Backdrop
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};