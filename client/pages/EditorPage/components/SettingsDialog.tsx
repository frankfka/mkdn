import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  Switch,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import React from 'react';
import { useEditorContext } from '../../../context/EditorContext';
import SpacingContainer from '../../../components/SpacingContainer/SpacingContainer';

type Props = {
  open: boolean;
  setOpen(val: boolean): void;
};

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    overflowY: 'hidden',
  },
}));

const SettingsDialog: React.FC<Props> = ({ open, setOpen }) => {
  const classes = useStyles();
  const theme = useTheme();
  const showDetailSettingsDescription = useMediaQuery(
    theme.breakpoints.up('sm')
  );

  const editorContext = useEditorContext();

  const closeDialog = () => setOpen(false);

  return (
    <Dialog open={open} onClose={closeDialog} fullWidth>
      <DialogTitle>Editor Settings ⚙️</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <SpacingContainer justifyContent="space-between" alignItems="center">
          <div>
            <Typography variant="body1">Autosave</Typography>
            {showDetailSettingsDescription && (
              <Typography variant="caption">
                Automatically save your work to local browser storage.
              </Typography>
            )}
          </div>
          <Switch
            checked={editorContext.editorSettings?.editorAutosaveEnabled}
            onChange={(e) =>
              editorContext.setEditorSettings((prev) => ({
                ...prev,
                editorAutosaveEnabled: e.target.checked,
              }))
            }
          />
        </SpacingContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SettingsDialog;
