import React from "react";
import { Link } from "react-router-dom";
import styles from "./LoginForm.module.css";
import Input from "../../../Componets/Form/Input/Input";
import Button from "../../../Componets/Form/Button/Button";
import useForm from "../../../Hooks/useForm";
import UserContext from "../../../Context/UserContext";
import Error from "../../../Componets/Helper/Error";

const LoginForm = () => {
  const username = useForm("");
  const password = useForm("");

  const { userLogin, loading, error } = React.useContext(UserContext);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (username.validate() && password.validate()) {
      await userLogin(username.value, password.value);
    }
  }

  return (
    <section className={styles.loginBg}>
      <div className={`${styles.formGrig} container`}>
        <h1 className={styles.titleForm}>LOGIN</h1>
        <form className={styles.formStyles} action="" onSubmit={handleSubmit}>
          <Input label="NOME" type="text" name="usuario" hookProps={username} />
          <Input
            label="SENHA"
            type="password"
            name="senha"
            hookProps={password}
          />
          {loading ? (
            <Button disabled>CARREGANDO</Button>
          ) : (
            <Button>LOGIN</Button>
          )}

          {error && <Error error={error} />}

          <Link className={styles.linkForm} to="/login/criar">
            não tem uma conta? cadastre-se
          </Link>
        </form>
      </div>
    </section>
  );
};

export default LoginForm;
