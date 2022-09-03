import LogoutIcon from "@mui/icons-material/Logout";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useState, MouseEvent } from "react";
import { IUser, logOutendpoint } from "../app/backend";

interface IUserMenu {
  onSignOut: () => void;
  user: IUser;
}

export default function UserMenu(props: IUserMenu) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  function signOut() {
    logOutendpoint();
    props.onSignOut;
    location.reload(); //Utilizado para fazer um refresh da página assim que for feito o logout
  }
  return (
    <Box display="flex" alignItems="center">
      <Typography variant="caption" component="div">
        {props.user.name}
      </Typography>
      <IconButton
        color="inherit"
        aria-label="logout"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <LogoutIcon />
      </IconButton>
      <Menu
        id="demo-positioned-menu"
        anchorEl={anchorEl}
        aria-labelledby="demo-positioned-button"
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={open}
        onClose={handleClose}
      >
        <Box padding="4px 10px"></Box>
        <MenuItem onClick={signOut}>Logout</MenuItem>
      </Menu>
    </Box>
  );
}
