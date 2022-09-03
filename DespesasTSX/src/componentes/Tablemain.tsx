import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Container from "@mui/material/Container";
import { IDespesas } from "../app/backend";

const header = ["Despesas", "Categoria", "Dia", "Valor (R$)"];
interface Ipropmain {
  dadofiltrado: IDespesas[];
}

export function Tablemain({ dadofiltrado }: Ipropmain) {
  return (
    <Container maxWidth="md">
      <Table aria-label="a dense table">
        <TableHead>
          <TableRow>
            {header.map((item) => (
              <TableCell className="" align="left" key={item}>
                {item}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dadofiltrado.map((item: IDespesas) => (
            <TableRow key={item.id}>
              <TableCell align="left">{item.descricao}</TableCell>
              <TableCell align="left">{item.categoria}</TableCell>
              <TableCell align="left">{item.dia}</TableCell>
              <TableCell align="left">{item.valor}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
