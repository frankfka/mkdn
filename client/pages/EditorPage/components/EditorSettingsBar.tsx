import React from 'react';
import { IconButton } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import SpacingContainer from '../../../components/SpacingContainer/SpacingContainer';

type Props = {
  onSettingsClicked(): void;
};

const EditorSettingsBar: React.FC<Props> = ({ onSettingsClicked }) => {
  return (
    <SpacingContainer direction="row-reverse">
      <IconButton color="secondary" onClick={onSettingsClicked} size="small">
        <SettingsIcon />
      </IconButton>
    </SpacingContainer>
  );
};

export default EditorSettingsBar;
