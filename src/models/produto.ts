import { UnidadeMedida } from '../enums/unidade-medida.enum';

export class Produto {
    id: string;
    nome: string;
    unidadeMedida: UnidadeMedida;
    quantidade: number;
    preco: number;
    ehPerecivel: boolean;
    dataValidade: Date;
    dataFabricacao: Date;
}
