import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

type DeleteModalProps = {
  isOpened: boolean;
  entityName: string;
  onClose: () => void;
  onDelete: () => Promise<void>;
  isDeleting?: boolean;
};

export default function DeleteModal ({
  isOpened,
  entityName,
  onClose,
  onDelete,
  isDeleting,
}: DeleteModalProps) {

  return (
    <Dialog
      open={isOpened}
      onClose={() => onClose()}
      role="alertdialog"
    >
      <DialogTitle>
        {`Delete ${entityName}?`}
      </DialogTitle>
      <DialogActions>
        <Button onClick={() => onClose()} autoFocus>
          Cancel
        </Button>
        <Button onClick={onDelete} loading={isDeleting}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
};