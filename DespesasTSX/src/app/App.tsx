import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { DespesasScreen } from "./DespesasScreen";
import ErrorPage from "./ErrorPage";
import { getUserendpoint, IUser } from "./backend";
import { HomeLogin } from "./HomeLogin";
import { useEffect, useState } from "react";

export default function App() {
  const [user, setUser] = useState<IUser | null>(null); //o app entra sem sessão aberta, pois precisa de autenticação
  useEffect(() => {
    getUserendpoint().then(setUser, () => setUser(null));
  }, []);

  //Função para o logout
  function SignOut() {
    setUser(null);
  }

  if (user) {
    return (
      <BrowserRouter>
        <Routes>
          <Route
            path="despesas/:mesano"
            element={<DespesasScreen user={user} onSignOut={SignOut} />}
          ></Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
      </BrowserRouter>
    );
  } else {
    return (
      <div>
        <HomeLogin onSignIn={setUser} />
      </div>
    );
  }
}
