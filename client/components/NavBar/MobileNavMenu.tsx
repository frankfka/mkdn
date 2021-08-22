import { IconButton, Menu, MenuItem } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Link from 'next/link';
import React from 'react';

type Props = {};

const MobileNavMenu: React.FC<Props> = ({}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement>();

  return (
    <div>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <MoreVertIcon color="primary" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={!!anchorEl}
        onClose={() => setAnchorEl(undefined)}
      >
        <Link href="/viewer" passHref>
          <MenuItem>View</MenuItem>
        </Link>
        <Link href="/" passHref>
          <MenuItem>Create</MenuItem>
        </Link>
      </Menu>
    </div>
  );
};

export default MobileNavMenu;
