import { Empresa } from './empresa';
import { Predio } from './predioModel';

export class Sala {
    _id: string;
    nome: string;
    tamanho: number;
    numero: number;
    andar: number;
    empresa: Empresa[];
    televisao: boolean;
    projetor: boolean;
    caboRede: boolean;
    wifi: boolean;
    telefone: boolean;
    telepresenca: boolean;
    quadro: boolean;
    predio: Predio;
}
