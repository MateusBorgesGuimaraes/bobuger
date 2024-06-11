import React from "react";
import styles from "../LoginForm/LoginForm.module.css";
import Input from "../../../Componets/Form/Input/Input";
import Button from "../../../Componets/Form/Button/Button";
import useForm from "../../../Hooks/useForm";
import { USER_POST } from "../../../Api";
import UserContext from "../../../Context/UserContext";
import useFetch from "../../../Hooks/useFetch";
import Error from "../../../Componets/Helper/Error";

export type IRegistro = {
  usuario: string;
  email: string;
  senha: string;
  telefone: string;
  rua: string;
  bairro: string;
  numero: number;
};

const LoginCreate = () => {
  const username = useForm("");
  const password = useForm("");
  const email = useForm("email");
  const rua = useForm("");
  const bairro = useForm("");
  const numero = useForm("");
  const telefone = useForm("");

  const { userLogin } = React.useContext(UserContext);
  const { loading, error, request } = useFetch();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { url, options } = USER_POST<IRegistro>({
      usuario: username.value,
      email: email.value,
      senha: password.value,
      telefone: telefone.value,
      rua: rua.value,
      bairro: bairro.value,
      numero: +numero.value,
    });

    const { response, json } = await request(url, options);
    if (response?.ok && json) {
      await userLogin(username.value, password.value);
    } else {
      console.log("Erro ao criar usuário");
    }
  }

  return (
    <section className={styles.loginBg}>
      <div className={`${styles.formGrig} container`}>
        <h1 className={styles.titleForm}>CADASTRO</h1>
        <form className={styles.formStyles} onSubmit={handleSubmit}>
          <Input label="NOME" type="text" name="usuario" hookProps={username} />
          <Input label="EMAIL" type="text" name="email" hookProps={email} />
          <Input
            label="SENHA"
            type="password"
            name="senha"
            hookProps={password}
          />
          <Input label="RUA" type="text" name="rua" hookProps={rua} />
          <Input label="BAIRRO" type="text" name="bairro" hookProps={bairro} />
          <div className={styles.subGrid}>
            <Input
              label="NUMERO"
              type="text"
              name="numero"
              hookProps={numero}
            />
            <Input
              label="TELEFONE"
              type="text"
              name="telefone"
              hookProps={telefone}
            />
          </div>
          {loading ? (
            <Button disabled>CADASTRANDO...</Button>
          ) : (
            <Button>CADASTRAR</Button>
          )}
          {error && <Error error={error} />}
        </form>
      </div>
    </section>
  );
};

export default LoginCreate;
