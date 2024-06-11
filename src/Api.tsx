export const API_URL = "http://localhost:5000/api/";

export function TOKEN_POST<T>(body: T) {
  return {
    url: API_URL + "auth/login",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

export function TOKEN_VALIDATE_POST(token: string) {
  return {
    url: API_URL + "auth/verify-token",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    },
  };
}

export function USER_GET(token: string) {
  return {
    url: API_URL + "auth/usuario",
    options: {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  };
}

export function USER_POST<T>(body: T) {
  return {
    url: API_URL + "auth/register",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

export function GET_ALL_PRODS() {
  return {
    url: API_URL + "products",
    options: {
      method: "GET",
    },
  };
}

export function GET_PROD(id: string) {
  return {
    url: API_URL + "products/find/" + id,
    options: {
      method: "GET",
    },
  };
}

export function GET_PROD_BY_QUERY_SUBCATEGORY(query: string) {
  return {
    url: API_URL + "products?subCategorias=" + query,
    options: {
      method: "GET",
    },
  };
}

export function PROD_POST<T>(token: string, body: T) {
  return {
    url: API_URL + "products",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        // token: "Bearer " + token,
      },
      body: JSON.stringify(body),
    },
  };
}

export function PROD_PUT<T>(token: string, idProd: string, body: T) {
  return {
    url: API_URL + "products/" + idProd,
    options: {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    },
  };
}

export function PROD_DELETE(token: string, idProd: string) {
  return {
    url: API_URL + "products/" + idProd,
    options: {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  };
}

export function GET_ALL_RECEITAS() {
  return {
    url: API_URL + "revenues",
    options: {
      method: "GET",
    },
  };
}

export function GET_RECEITA(id: string) {
  return {
    url: API_URL + "revenues/find/" + id,
    options: {
      method: "GET",
    },
  };
}

export function RECEITA_POST<T>(token: string, body: T) {
  return {
    url: API_URL + "revenues",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        // token: "Bearer " + token,
      },
      body: JSON.stringify(body),
    },
  };
}

export function RECEITA_PUT<T>(token: string, idReceita: string, body: T) {
  return {
    url: API_URL + "revenues/" + idReceita,
    options: {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    },
  };
}

export function RECEITA_DELETE(token: string, idReceita: string) {
  return {
    url: API_URL + "revenues/" + idReceita,
    options: {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  };
}

export function GET_ALL_USUARIOS(token: string) {
  return {
    url: API_URL + "usuarios",
    options: {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  };
}

export function USUARIO_DELETE(token: string, idUsuario: string) {
  return {
    url: API_URL + "usuarios/" + idUsuario,
    options: {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  };
}

export function GET_USER_CART_BY_ID(id: string, token: string) {
  return {
    url: API_URL + "carts/find/" + id,
    options: {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  };
}

export function CREATE_USER_CART(token: string, usuarioId: string) {
  return {
    url: API_URL + "carts",
    options: {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usuarioId }),
    },
  };
}

export function ATT_CART<T>(token: string, id: string, body: T) {
  return {
    url: API_URL + "carts/" + id,
    options: {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        // token: "Bearer " + token,
      },
      body: JSON.stringify(body),
    },
  };
}

export function PEDIDO_POST<T>(token: string, body: T) {
  return {
    url: API_URL + "pedidos",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        // token: "Bearer " + token,
      },
      body: JSON.stringify(body),
    },
  };
}

export function GET_USER_PEDIDOS_BY_ID(id: string, token: string) {
  return {
    url: API_URL + "pedidos/find/" + id,
    options: {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  };
}

export function GET_USER_PEDIDO_BY_ID(id: string, token: string) {
  return {
    url: API_URL + "pedidos/pedido/" + id,
    options: {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  };
}

export function GET_ALL_PEDIDOS(token: string) {
  return {
    url: API_URL + "pedidos",
    options: {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  };
}

export function PEDIDO_PUT<T>(token: string, id: string, body: T) {
  return {
    url: API_URL + "pedidos/" + id,
    options: {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        // token: "Bearer " + token,
      },
      body: JSON.stringify(body),
    },
  };
}

export function GET_USER_BY_ADM(id: string, token: string) {
  return {
    url: API_URL + "usuarios/find/" + id,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    },
  };
}
