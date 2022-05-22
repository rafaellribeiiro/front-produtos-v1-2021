import { http } from "./config";

export default {
  listar: () => {
    return http.get("/api/produtos");
  },

  salvar: (produto) => {
    return http.post("/api/produtos", produto);
  },

  atualizar: (produto) => {
    return http.put("/api/produtos", produto);
  },

  deletar: (produto) => {
    return http.delete("/api/produtos", { data: produto });
  },
};
