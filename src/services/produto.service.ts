import { Injectable } from '@angular/core';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  constructor() {}

  obterProdutos() {
    let produtos: Produto[] = [];

    for (var i = 1; i < localStorage.length; i++)
      produtos.push(JSON.parse(localStorage.getItem(String(i))));

    return produtos;
  }

  obterProdutoPorKey(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  salvarProduto(produto: Produto, id?: string) {
    let key = id == null ? String(localStorage.length + 1) : id;
    produto.id = key;

    localStorage.setItem(key, JSON.stringify(produto));
  }

  removerProduto(produto: Produto) {
    localStorage.removeItem(produto.id);
  }
}