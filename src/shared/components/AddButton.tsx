import Fab from '@mui/material/Fab';
import { Add } from '@mui/icons-material';

export default function AddButton ({ onClick }: { onClick: () => void }) {
  return (
    <Fab
      color="primary"
      aria-label="add"
      sx={{
        position: 'fixed',
        bottom: '72px',
        right: '12px'
      }}
      onClick={onClick}
    >
      <Add />
    </Fab>
  );
};