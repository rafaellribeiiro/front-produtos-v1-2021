<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">IdealTec</a>
      </div>
    </nav>

    <div class="container">
      <form @submit.prevent="salvar">
        <label>Nome</label>
        <input
          type="text"
          placeholder="Digite o nome do produto"
          v-model="produto.nome"
        />
        <label>Quantidade</label>
        <input
          type="number"
          placeholder="Digite a quantidade do produto"
          v-model="produto.quantidade"
        />
        <label>Valor</label>
        <input
          type="text"
          placeholder="Digite o valor do produto"
          v-model="produto.valor"
        />

        <button class="waves-effect waves-light btn-small">
          Salvar<i class="material-icons left">save</i>
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>NOME</th>
            <th>QTD</th>
            <th>VALOR</th>
            <th>OPÇÕES</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="produto of produtos" :key="produto.id">
            <td>{{ produto.nome }}</td>
            <td>{{ produto.quantidade }}</td>
            <td>{{ produto.valor }}</td>
            <td>
              <button
                @click="editar(produto)"
                class="waves-effect btn-small blue darken-1"
              >
                <i class="material-icons">create</i>
              </button>
              <button
                @click="deletar(produto)"
                class="waves-effect btn-small red darken-1"
              >
                <i class="material-icons">delete_sweep</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Produto from "./services/produtos";

export default {
  data() {
    return {
      produto: {
        id: "",
        nome: "",
        quantidade: "",
        valor: "",
      },
      produtos: [],
    };
  },
  mounted() {
    this.listar();
  },

  methods: {
    listar() {
      Produto.listar().then((resposta) => {
        this.produtos = resposta.data;
      });
    },

    salvar() {
      if (!this.produto.id) {
        //eslint-disable-next-line no-unused-vars
        Produto.salvar(this.produto).then((resposta) => {
          this.produto = {};
          alert("salvo com sucesso");
          this.listar();
        });
      } else {
        //eslint-disable-next-line no-unused-vars
        Produto.atualizar(this.produto).then((resposta) => {
          this.produto = {};
          alert("atualizado com sucesso");
          this.listar();
        });
      }
    },

    editar(produto) {
      this.produto = produto;
    },

    deletar(produto) {
      //eslint-disable-next-line no-unused-vars
      Produto.deletar(produto)
        //eslint-disable-next-line no-unused-vars
        .then((resposta) => {
          this.listar();
          this.errors = [];
        })
        .catch((e) => {
          this.errors = e.response.data.errors;
        });
    },
  },
};
</script>

<style></style>
