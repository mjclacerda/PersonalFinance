import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

interface propsselecauto {
  filter: string;
  handleChange: any;
  itens: string[];
  label: string;
}

export function SelectAuto({
  filter,
  handleChange,
  itens,
  label,
}: propsselecauto) {
  return (
    <FormControl variant="standard">
      <InputLabel id="selectano">{label}</InputLabel>
      <Select
        labelId="selectano"
        id="ano"
        value={filter ?? ""} //é preciso fazer esse tratamento para que a célula nunca receba underfined
        onChange={handleChange}
        label="Ano"
      >
        {itens.map((a) => (
          <MenuItem value={a} key={a}>
            {a}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
