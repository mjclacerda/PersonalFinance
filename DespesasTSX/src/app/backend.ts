//Declarações typescript
export interface IDespesas {
  id: number;
  descricao: string;
  categoria: string;
  valor: number;
  mes: string;
  dia: string;
}
export interface IUser {
  email: string;
  name: string;
}
//Função para pegar todas as despesas
export function getDespesas(): Promise<IDespesas[]> {
  return fetch(`http://localhost:3001/despesas`, {
    credentials: "include", //Esse parâmetro precisa ser passado para indicar que queremos que as credenciais sejam enviadas/atualizadas
  }).then(handleresp);
}
//Função para pegar as despesas filtradas por ano e mês
export function getDespesasMes(
  year: string | undefined,
  month: string | undefined
): Promise<IDespesas[]> {
  return fetch(
    `http://localhost:3001/despesas?mes=${year}-${month}&_sort=dia`,
    { credentials: "include", method: "GET" }
  ).then(handleresp);
}
//Função para entrar na tela de login do usuário
export function getUserendpoint(): Promise<IUser> {
  return fetch(`http://localhost:3001/auth/user`, {
    credentials: "include",
    method: "GET",
  }).then(handleresp);
}
//Função para fazer o login
export function logInendpoint(email: string, password: string): Promise<IUser> {
  return fetch(`http://localhost:3001/auth/login`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(handleresp);
}
//Função para fazer o logout
export function logOutendpoint(): Promise<void> {
  return fetch(`http://localhost:3001/auth/logout`, {
    credentials: "include",
    method: "POST",
  }).then(handleresp);
}
//Função para tratar as resposta do fetch
function handleresp(resp: Response) {
  if (resp.ok) {
    return resp.json();
  } else {
    throw new Error(resp.statusText);
  }
}
