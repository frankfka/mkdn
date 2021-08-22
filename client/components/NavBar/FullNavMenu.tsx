import React from 'react';
import SpacingContainer from '../SpacingContainer/SpacingContainer';
import { Button } from '@material-ui/core';
import SubjectOutlinedIcon from '@material-ui/icons/SubjectOutlined';
import AddIcon from '@material-ui/icons/Add';

type Props = {};

const FullNavMenu: React.FC<Props> = ({}) => {
  return (
    <SpacingContainer alignItems="center">
      <Button
        variant="outlined"
        color="primary"
        target="_blank"
        href="/viewer"
        startIcon={<SubjectOutlinedIcon />}
      >
        View
      </Button>
      <Button
        variant="contained"
        color="primary"
        target="_blank"
        href="/"
        startIcon={<AddIcon />}
      >
        Create
      </Button>
    </SpacingContainer>
  );
};

export default FullNavMenu;
