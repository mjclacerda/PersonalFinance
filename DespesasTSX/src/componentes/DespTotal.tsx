import { Box, Typography } from "@mui/material";

export function DespTotal({ total = 0 }) {
  return (
    <Box alignItems="center" padding="8px 10px">
      <Typography variant="subtitle2">
        Despesa Total: R$ {total.toFixed(2)}
      </Typography>
    </Box>
  );
}
