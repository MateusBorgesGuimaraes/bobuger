import React from "react";

interface TypeDefinition {
  regex: RegExp;
  message: string;
}

const types: Record<string, TypeDefinition> = {
  email: {
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: "Preencha um email valido",
  },
  telefone: {
    regex:
      /^(\(11\) (9\d{4})-\d{4})|((\(1[2-9]{1}\)|\([2-9]{1}\d{1}\)) [5-9]\d{3}-\d{4})$/,
    message: "Preencha um telefone valido",
  },
  numero: {
    regex: /^[0-9]*$/,
    message: "Preencha um numero valido",
  },
  cep: {
    regex: /^\d{5}-\d{3}$/,
    message: "Preencha um cep valido",
  },
  password: {
    regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    message: "Preencha uma senha com no minimo 8 caracters 1 letra e 1 numero",
  },
};

const useForm = (type: string | boolean, initialValue: string = "") => {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  function validate(value: string) {
    if (type === false) return true;
    if (value.length === 0) {
      setError("Preencha um valor");
      return false;
    } else if (
      typeof type === "string" &&
      types[type] !== null &&
      types[type] &&
      !types[type].regex.test(value)
    ) {
      setError(types[type].message);
      return false;
    } else {
      setError(null);
      return true;
    }
  }

  function onChange({ currentTarget }: React.ChangeEvent<HTMLInputElement>) {
    if (error) validate(currentTarget.value);
    setValue(currentTarget.value);
  }

  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
};

export default useForm;
