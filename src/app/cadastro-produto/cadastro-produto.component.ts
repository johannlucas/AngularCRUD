import { Component, OnInit } from '@angular/core';
import { Produto } from '../../models/produto';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent implements OnInit {

  constructor(private produto: Produto) { }

  ngOnInit() {
  }

}
