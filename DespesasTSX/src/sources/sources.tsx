export function indexvalue(item: string, itens: string[]) {
  if (itens.indexOf(item) < 10) {
    return `0${(itens.indexOf(item) + 1).toString()}`;
  }
  return `${(itens.indexOf(item) + 1).toString()}`;
}

//Função para a obtenção de valores únicos em um array

export function unique(value: number | string, index: number, self: any) {
  return self.indexOf(value) === index;
}
