import React from 'react';

import {
  Backdrop,
  Button,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShareIcon from '@material-ui/icons/Share';
import SaveIcon from '@material-ui/icons/Save';

import { ActionConfig, ActionName } from './EditorPageActions';

type Props = {
  open: boolean;
  setIsOpen(val: boolean): void;
  onActionClicked(actionName: ActionName): void;
};

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {},
    speedDial: {
      position: 'fixed',
      bottom: theme.spacing(4),
      right: theme.spacing(4),
    },
  })
);

export const actions: ActionConfig[] = [
  { icon: <SaveIcon />, name: 'Download' },
  { icon: <ShareIcon />, name: 'Publish' },
];

const EditorPageActionsFab: React.FC<Props> = ({
  open,
  setIsOpen,
  onActionClicked,
}) => {
  const classes = useStyles();

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const onActionIconClicked = (action: ActionConfig) => {
    onActionClicked(action.name);
  };

  return (
    <div className={classes.root}>
      <SpeedDial
        ariaLabel="Save actions"
        className={classes.speedDial}
        icon={<MoreVertIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={() => onActionIconClicked(action)}
          />
        ))}
      </SpeedDial>
    </div>
  );
};

export default EditorPageActionsFab;
