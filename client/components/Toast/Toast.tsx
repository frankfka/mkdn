import { Snackbar } from '@material-ui/core';
import { Alert, Color as AlertType } from '@material-ui/lab';
import React, { useCallback } from 'react';

type Props = {
  state: ToastState | undefined;
  setState(state?: ToastState): void;
};

export type ToastState = {
  type: AlertType;
  message: string;
};

const Toast: React.FC<Props> = ({ state, setState }) => {
  const onClose = useCallback(() => {
    setState(undefined);
  }, [setState]);

  if (!state) {
    return null;
  }

  return (
    <Snackbar open autoHideDuration={3000} onClose={onClose}>
      <Alert onClose={onClose} severity={state.type}>
        {state.message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
