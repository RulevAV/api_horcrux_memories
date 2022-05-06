import responseApi from "./responseApi"

const config = {
  headers: {
    Authorization: "Authorization"
  }
}

const CancelToken = {
  source: () => {
    return { cancel: () => { }, token: { reason: { message: 'user canceled' } } }
  }
}

const create = (option) => {
  async function mockcreate(u, config) {

    return {
      data: responseApi(`${config.method} ${option.baseURL}${u}`),
    }
  }

  mockcreate.interceptors = {
    request: {
      use: (fn) => {
        fn(config);
      }
    },
  };

  return mockcreate;
}

export default {
  CancelToken,
  create,
}