import { Grid, GridProps, makeStyles } from '@material-ui/core';
import React from 'react';

type Props = Partial<GridProps> & {
  fullWidthChildren?: boolean;
  itemClassName?: string;
};

const useStyles = makeStyles((theme) => ({
  gridItem: {
    width: (props: Props) => (props.fullWidthChildren ? '100%' : undefined),
  },
}));

const SpacingContainer: React.FC<Props> = ({
  children,
  itemClassName,
  ...props
}) => {
  const classes = useStyles(props);

  return (
    <Grid container spacing={props.spacing ?? 2} {...props}>
      {React.Children.map(children, (child) => {
        return child ? (
          <Grid item className={itemClassName ?? classes.gridItem}>
            {child}
          </Grid>
        ) : undefined;
      })}
    </Grid>
  );
};

export default SpacingContainer;
