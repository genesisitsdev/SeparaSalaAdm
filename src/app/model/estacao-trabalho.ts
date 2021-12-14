import { Empresa } from './empresa';
import { Predio } from './predioModel';

export class EstacaoTrabalho {
    _id: string;
    nome: string;
    andar: string;
    observacao: string;
    empresa: Empresa[];
    predio: Predio;
    tipoRede: string;
    tomadas: number;
    perifericos: string[];

    constructor() {
        this.perifericos = [];
    }
}
