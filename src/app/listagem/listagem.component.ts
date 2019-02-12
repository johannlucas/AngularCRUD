import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../models/produto';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

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
    private messageService: MessageService,
    private router: Router,) {
    this.produtos = [];
  }

  ngOnInit() {
    this.atualizarTable();
  }

  atualizarTable() {
    this.produtos = this.produtoService.obterProdutos();
  }
  
  editarItem(produto: Produto) {
    this.router.navigateByUrl(`cadastro/${produto.id}`)
  }

  //Toast
  abrirConfirmacaoRemocao(produto) {
    this.produtoSelecionado = produto;

    this.messageService.clear();
    this.messageService.add({ key: 'confirmaRemocao', sticky: true, severity: 'warn', summary: 'Tem certeza que deseja remover o produto?', detail: 'Confirme para prosseguir.' });
  }

  confirmarRemocao() {
    this.messageService.clear('confirmaRemocao');

    try {
      this.produtoService.removerProduto(this.produtoSelecionado);
      this.showSuccess();
    }
    catch {
      this.showError();
    }

    this.atualizarTable();
  }

  negarRemocao() {
    this.messageService.clear('confirmaRemocao');
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Produto removido' });
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Oops!', detail: 'Algum erro ocorreu, contate o administrador do sistema.' });
  }
  //Toast
}
