import React from 'react';
import Link from 'next/link';
import {
  IconButton,
  Link as MaterialLink,
  Menu,
  MenuItem,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

type Props = {};

const MobileNavMenu: React.FC<Props> = ({}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement>();

  return (
    <div>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={!!anchorEl}
        onClose={() => setAnchorEl(undefined)}
      >
        <MenuItem>
          {/*TODO: full width and passHref*/}
          <Link href="/viewer">
            <MaterialLink underline="none">View</MaterialLink>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href="/" passHref>
            <MaterialLink underline="none">Create</MaterialLink>
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MobileNavMenu;
