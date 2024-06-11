import React from "react";
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from "../Api";
import { string } from "prop-types";
import { useNavigate } from "react-router-dom";

export const UserContext = React.createContext<IStorage>({} as IStorage);

type IUserStorage = {
  _id?: string;
  usuario: string;
  email: string;
  senha: string;
  telefone: string;
  rua: string;
  bairro: string;
  numero: number;
  isAdmin: boolean;
};

type ILogin = {
  usuario: string;
  senha: string;
};

type IStorage = {
  userLogin: (username: string, password: string) => Promise<void>;
  data: IUserStorage | null;
  userLogout: () => Promise<void>;
  error: string | null;
  loading: boolean;
  login: boolean | null;
  admin: boolean;
};

export const UserStorage = ({ children }: React.PropsWithChildren) => {
  const [data, setData] = React.useState<IUserStorage | null>(null);
  const [login, setLogin] = React.useState<boolean | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [admin, setAdmin] = React.useState(false);
  const [error, setError] = React.useState<null | string>(null);
  const navigate = useNavigate();

  const userLogout = React.useCallback(
    async function () {
      setData(null);
      setError(null);
      setLoading(false);
      setLogin(false);
      setAdmin(false);
      window.localStorage.removeItem("token");
      navigate("/login");
    },
    [navigate]
  );

  async function getUser(token: string) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = (await response.json()) as IUserStorage;
    if (json.isAdmin) setAdmin(true);
    setData(json);
    setLogin(true);
  }

  async function userLogin(username: string, password: string) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST<ILogin>({
        usuario: username,
        senha: password,
      });
      const tokenRes = await fetch(url, options);
      if (!tokenRes.ok) throw new Error(`Error: ${tokenRes.statusText}`);
      const { accessToken } = await tokenRes.json();
      window.localStorage.setItem("token", accessToken);
      await getUser(accessToken);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));

      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem("token");
      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);
          if (!response.ok) throw new Error("Token invalido");
          await getUser(token);
        } catch (err) {
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    }
    autoLogin();
  }, [userLogout]);

  return (
    <UserContext.Provider
      value={{ userLogin, data, userLogout, error, loading, login, admin }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
