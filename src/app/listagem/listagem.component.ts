import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../models/produto';
import { UnidadeMedida } from '../../enums/unidade-medida.enum';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {

  titulo = 'Desafio';
  produtos: Produto[];
  produtoSelecionado: Produto;

  constructor(private produtoService: ProdutoService,
    private messageService: MessageService) {
    this.produtos = [];
  }

  ngOnInit() {
    let produtoInicial: Produto = new Produto();

    produtoInicial.nome = "Pão";
    produtoInicial.preco = 5;
    produtoInicial.quantidade = 1;
    produtoInicial.unidadeMedida = UnidadeMedida.Unidade;
    produtoInicial.ehPerecivel = true;
    produtoInicial.dataValidade = new Date(2019, 2, 15);
    produtoInicial.dataFabricacao = new Date(2019, 2, 9);

    this.produtoService.salvarProduto(produtoInicial, '1');

    this.atualizarTable();
  }

  atualizarTable() {
    this.produtos = this.produtoService.obterProdutos();
  }

  //Toast
  abrirConfirmacaoRemocao(produto) {
    this.produtoSelecionado = produto;

    this.messageService.clear();
    this.messageService.add({ key: 'confirmaRemocao', sticky: true, severity: 'warn', summary: 'Tem certeza que deseja remover o produto?', detail: 'Confirme para prosseguir.' });
  }

  confirmarRemocao() {
    this.messageService.clear('confirmaRemocao');
    this.produtoService.removerProduto(this.produtoSelecionado);

    this.atualizarTable();
  }

  negarRemocao() {
    this.messageService.clear('confirmaRemocao');
  }
  //Toast
}
