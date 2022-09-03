import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import PaidIcon from "@mui/icons-material/Paid";
import UserMenu from "./UserMenu";
import { IUser } from "../app/backend";

interface IBarra {
  onSignOut: () => void;
  user: IUser;
}

export function Barra(props: IBarra) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <PaidIcon />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Despesas Pessoais
          </Typography>
          <UserMenu user={props.user} onSignOut={props.onSignOut} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
