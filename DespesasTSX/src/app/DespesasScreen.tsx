import { Box, Button, SelectChangeEvent } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Barra } from "../componentes/Barra";
import { SelectAuto } from "../componentes/SelectAuto";
import { DespTotal } from "../componentes/DespTotal";
import { Tablemain } from "../componentes/Tablemain";
import { Tablesumary } from "../componentes/Tablesumary";
import { indexvalue } from "../sources/sources";
import { meses } from "../sources/meses";
import { getDespesas, getDespesasMes, IDespesas, IUser } from "./backend";
import { useEffect, useState } from "react";

interface IDespesasScreen {
  onSignOut: () => void;
  user: IUser;
}

export function DespesasScreen(props: IDespesasScreen) {
  const [anos, setAnos] = useState<string[]>([]); //utilizado para criar o menu de anos
  const [dadofiltrado, setDadofiltrado] = useState<IDespesas[]>([]); //utilizado para renderizar os dados conforme seleção
  const [total, setTotal] = useState<number>(0); //utilizado para guardar o valor da soma das despesas filtradas
  const [anofilter, setAnofilter] = useState<string>("2020"); //utilizado para guardar o ano que se deseja filtrar
  const [mesfilter, setMesfilter] = useState<string>("Junho"); //utilizado para guardar o mês do select
  const [mesnumber, setMesnumber] = useState<string>("06"); //utilizado para guardar o mês aque se deseja filtrar
  const [show, setShow] = useState<boolean>(true); //utilizado para mostrar ou as despesas ou o resumo
  const { mesano } = useParams<{ mesano: string | any }>(); //utilizado para capturar um trecho da rota
  const navigate = useNavigate(); //utilizado para atualizar o endereço da rota

  const handleChangeano = (event: SelectChangeEvent) => {
    setAnofilter(event.target.value);
    navigate(`/despesas/${event.target.value}-${mesnumber}`);
  };
  const handleChangemes = (event: SelectChangeEvent) => {
    setMesfilter(event.target.value);
    setMesnumber(indexvalue(event.target.value, meses));
    navigate(`/despesas/${anofilter}-${indexvalue(event.target.value, meses)}`);
  };
  const clickDespesas = () => {
    setShow(true);
  };
  const clickSumary = () => {
    setShow(false);
  };
  // Carregamento inicial dos dados para criação dos selects
  useEffect(() => {
    getDespesas().then((desp) => {
      setAnos(
        desp
          .map((ma) => {
            return ma.mes.split("-")[0];
          })
          .filter((value, index, self) => self.indexOf(value) === index)
      );
    });
  }, []);
  //Carregamento dos dados filtrados para a renderização das tabelas
  useEffect(() => {
    setAnofilter(mesano?.split("-")[0]);
    setMesnumber(mesano?.split("-")[1]);
    setMesfilter(meses[parseInt(mesano?.split("-")[1]) - 1]);
    getDespesasMes(anofilter, mesnumber).then((desp) => {
      setDadofiltrado(desp);
      setTotal(
        desp
          .map((totals) => {
            return totals.valor;
          })
          .reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
          )
      );
    });
  }, [mesnumber, anofilter, mesano]);

  return (
    <Box>
      <Barra user={props.user} onSignOut={props.onSignOut}></Barra>
      <Box display="flex" alignItems="center" padding="8px 50px">
        <Box flex="1">
          <SelectAuto
            filter={anofilter}
            handleChange={handleChangeano}
            itens={anos}
            label="Ano"
          />
          <SelectAuto
            filter={mesfilter}
            handleChange={handleChangemes}
            itens={meses}
            label="Mês"
          />
        </Box>
        <DespTotal total={total} />
      </Box>
      <Box textAlign="left" padding="4px 46px">
        <Button onClick={clickDespesas}>Despesas</Button>
        <Button onClick={clickSumary}>Resumo</Button>
      </Box>
      <Box padding="4px 200px">
        {show && <Tablemain dadofiltrado={dadofiltrado} />}
        {!show && <Tablesumary dado={dadofiltrado} />}
      </Box>
    </Box>
  );
}
