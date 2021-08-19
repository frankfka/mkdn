import { BoxProps, Typography } from '@material-ui/core';
import React from 'react';
import CenteredInfoContainer from '../CenteredInfoContainer/CenteredInfoContainer';

type Props = Partial<BoxProps>;

const ErrorView: React.FC<Props> = (props) => {
  return (
    <CenteredInfoContainer {...props}>
      <Typography variant="h3" paragraph>
        Something went wrong.
      </Typography>
      <Typography variant="subtitle1" paragraph>
        Please refresh the page and try again.
      </Typography>
    </CenteredInfoContainer>
  );
};

export default ErrorView;
