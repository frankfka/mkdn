import { IconButton, makeStyles, TextField } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField/TextField';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import React, { useCallback } from 'react';

type Props = TextFieldProps & {
  readonly?: boolean;
};

const useStyles = makeStyles((theme) => ({
  copyButton: {
    margin: theme.spacing(1, 2),
  },
}));

const TextFieldWithCopy: React.FC<Props> = ({
  InputProps,
  readonly,
  ...restProps
}) => {
  const classes = useStyles();

  const onCopyClicked = useCallback(() => {
    typeof restProps.value === 'string' &&
      navigator.clipboard.writeText(restProps.value);
  }, [restProps.value]);

  const mergedInputProps = {
    ...InputProps,
    readonly,
    endAdornment: (
      <IconButton
        className={classes.copyButton}
        size="small"
        edge="end"
        color="primary"
        onClick={onCopyClicked}
      >
        <FileCopyOutlinedIcon />
      </IconButton>
    ),
  };

  return <TextField InputProps={mergedInputProps} {...restProps} />;
};

export default TextFieldWithCopy;
