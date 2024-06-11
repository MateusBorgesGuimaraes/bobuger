import React from "react";
import styles from "./DashboardUsuariosInfo.module.css";
import { useParams } from "react-router-dom";
import { IUsuarioID } from "../DashboardUsuarios/DashboardUsuarios";
import useFetch from "../../../Hooks/useFetch";
import { GET_USER_BY_ADM } from "../../../Api";

const DashboardUsuariosInfo = () => {
  const { id } = useParams();
  const [data, setData] = React.useState<IUsuarioID | null>(null);
  const { request } = useFetch();
  const token = window.localStorage.getItem("token");

  React.useEffect(() => {
    async function getUsers() {
      if (!id || !token) return null;
      const { url, options } = GET_USER_BY_ADM(id, token);
      const { response, json } = await request(url, options);
      if (!response?.ok) return null;
      setData(json);
    }
    getUsers();
  }, [token, id, request]);

  // console.log("data: " + JSON.stringify(data));

  return (
    <section className={styles.infosContainer}>
      <h1>{data?.usuario}</h1>
      <div>
        <div className={styles.contato}>
          <p>
            <span className="orange">EMAIL:</span> {data?.email}
          </p>
          <p>
            <span className="orange">TELEFONE:</span> {data?.telefone}
          </p>
        </div>

        <div className={styles.endereco}>
          <p>
            <span className="orange">RUA:</span> {data?.rua}
          </p>
          <p>
            <span className="orange">BAIRRO:</span> {data?.bairro}
          </p>
          <p>
            <span className="orange">NÚMERO:</span> {data?.numero}
          </p>
        </div>
      </div>
    </section>
  );
};

export default DashboardUsuariosInfo;
