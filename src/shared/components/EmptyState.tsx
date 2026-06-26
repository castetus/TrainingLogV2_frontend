import { Box, Typography } from "@mui/material";

export default function EmptyState ({ title = 'Nothing here, try to add something' }: { title?: string }) {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        minHeight: '50vh',
      }}
    >
      <Typography
        variant="h6"
        color="text.secondary"
      >
        {title}
      </Typography>
    </Box>
  );
};