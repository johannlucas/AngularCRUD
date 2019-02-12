import { Component, OnInit } from '@angular/core';
import { Produto } from '../../models/produto';
import { UnidadeMedida } from '../../enums/unidade-medida.enum';
import { Router, ActivatedRoute } from '@angular/router';
import { ProdutoService } from '../../services/produto.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})

export class CadastroProdutoComponent implements OnInit {

  ngOnInit(): void {
    let key = this.route.snapshot.paramMap.get('id');
    let produtoBanco: Produto = this.produtoService.obterProdutoPorKey(key);
    if (produtoBanco != null) {
      this.produto = produtoBanco;
    }
  }

  produto: Produto;
  unidadesMedida: any[];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private messageService: MessageService) {

    this.produto = new Produto();
    this.carregarUnidadesMedida();
  }

  carregarUnidadesMedida() {
    this.unidadesMedida = [];

    let unidadesObj = Object.keys(UnidadeMedida);
    for (let i in unidadesObj)
      this.unidadesMedida.push({
        label: unidadesObj[i],
        value: i
      })
  }

  salvar() {
    try {
      this.produtoService.salvarProduto(this.produto);
      this.produto = new Produto();
      this.showSuccess();
    }
    catch (e) {
      console.log(e)
      this.showError()
    }
  }

  cancelar() {
    this.produto = new Produto();
    this.router.navigateByUrl('listagem');
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Produto salvo' });
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Oops!', detail: 'Algum erro ocorreu, contate o administrador do sistema.' });
  }
}
