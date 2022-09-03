import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { IDespesas } from "../app/backend";
import { unique } from "../sources/sources";
import { Chart } from "react-google-charts";

const header = ["Categoria", "Total"];
interface Iproptable {
  dado: IDespesas[];
}

export function Tablesumary({ dado }: Iproptable) {
  const categorias = dado
    .map((cat: IDespesas) => {
      return cat.categoria;
    })
    .filter(unique);
  const dadosporcategorias = categorias.map((cat: string) => {
    const gastocat = dado
      .filter((gasto: IDespesas) => gasto.categoria === cat)
      .map((gasto: IDespesas) => gasto.valor)
      .reduce((acum: number, value: number) => acum + value, 0);
    return { categoria: cat, valor: gastocat };
  });
  const data = [
    ["Categoria", "valor"],
    ...dadosporcategorias.map((el) => {
      return [el.categoria, el.valor];
    }),
  ];

  const options = {
    title: "Distribuição dos Gastos (%)",
  };

  return (
    <Box display="flex">
      <Container maxWidth="md">
        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width={"100%"}
          height={"400px"}
        />
      </Container>
      <Container maxWidth="xs">
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
            {dadosporcategorias.map((el) => (
              <TableRow key={el.categoria}>
                <TableCell align="left">{el.categoria}</TableCell>
                <TableCell align="left">R$ {el.valor.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </Box>
  );
}
