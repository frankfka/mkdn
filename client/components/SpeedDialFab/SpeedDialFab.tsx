import { createStyles, makeStyles } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
import React from 'react';

export type SpeedDialAction<TName extends string> = {
  icon: React.ReactNode;
  name: TName;
};

export type SpeedDialFabProps<TName extends string> = {
  actions: SpeedDialAction<TName>[];
  onActionClicked(actionName: TName): void | Promise<void>;
  open: boolean;
  setIsOpen(val: boolean): void;
};

const useStyles = makeStyles((theme) =>
  createStyles({
    speedDial: {
      position: 'fixed',
      bottom: theme.spacing(4),
      right: theme.spacing(4),
    },
  })
);

const SpeedDialFab = <TName extends string>({
  open,
  setIsOpen,
  onActionClicked,
  actions,
}: React.PropsWithChildren<SpeedDialFabProps<TName>>) => {
  const classes = useStyles();

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const onActionIconClicked = (action: SpeedDialAction<TName>) => {
    onActionClicked(action.name);
  };

  return (
    <div>
      <SpeedDial
        ariaLabel="Actions speed dial"
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

export default SpeedDialFab;
