import { Injectable } from '@angular/core';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  constructor() { }

  obterProdutos() {
    let produtos: Produto[] = [];

    for (var i = 1; i <= localStorage.length; i++)
      produtos.push(JSON.parse(localStorage.getItem(String(i))));

    return produtos;
  }

  obterProdutoPorKey(key: string) {
    let produto: Produto = JSON.parse(localStorage.getItem(key));
    this.tratarDatas(produto);
    return produto;
  }

  salvarProduto(produto: Produto) {
    produto = this.verificarDuplicidade(produto);
    localStorage.setItem(produto.id, JSON.stringify(produto));
  }

  removerProduto(produto: Produto) {
    localStorage.removeItem(produto.id);
  }

  verificarDuplicidade(produto: Produto) {
    let prod: Produto = JSON.parse(localStorage.getItem(produto.id));
    if (prod != null)
      this.removerProduto(prod);

    produto.id = String(localStorage.length + 1)

    return produto;
  }

  tratarDatas(produto: Produto) {
    if (produto == null)
      return;
    produto.dataValidade = new Date(produto.dataValidade);
    produto.dataFabricacao = new Date(produto.dataFabricacao);

    produto.dataValidade = new Date(produto.dataValidade.getFullYear(), produto.dataValidade.getMonth(), produto.dataValidade.getDay())
    produto.dataFabricacao = new Date(produto.dataFabricacao.getFullYear(), produto.dataFabricacao.getMonth(), produto.dataFabricacao.getDay())
  }
}