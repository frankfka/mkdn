import { BoxProps, CircularProgress } from '@material-ui/core';
import React from 'react';
import CenteredInfoContainer from '../CenteredInfoContainer/CenteredInfoContainer';

type Props = Partial<BoxProps>;

const LoadingView: React.FC<Props> = (props) => {
  return (
    <CenteredInfoContainer {...props}>
      <CircularProgress color="secondary" />
    </CenteredInfoContainer>
  );
};

export default LoadingView;
