import { IconButton, Menu, MenuItem } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {};

const MobileNavMenu: React.FC<Props> = ({}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement>();

  const currentPath = useRouter().pathname;

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
          <MenuItem selected={currentPath === '/viewer'}>View</MenuItem>
        </Link>
        <Link href="/" passHref>
          <MenuItem selected={currentPath === '/'}>Create</MenuItem>
        </Link>
      </Menu>
    </div>
  );
};

export default MobileNavMenu;
