import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Inject } from '@angular/core';
import { EstacaoTrabalho } from 'src/app/model/estacao-trabalho';
import { Empresa } from 'src/app/model/empresa';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CadastroEstacaoTrabalhoService {
    constructor(private http: HttpClient, private auth: AuthService, @Inject('env') private environment) {}

    getPredios() {
        return this.http.get(this.environment.api + 'predio', this.auth.getHeader());
    }

    getEmpresas() {
        return this.http.get<Empresa[]>(this.environment.api + 'empresas', this.auth.getHeader());
    }

    createEstacaoTrabalho(estacao: EstacaoTrabalho) {
        return this.http.post(this.environment.api + 'estacao', estacao, this.auth.getHeader());
    }

    updateEstacaoTrabalho(estacao: EstacaoTrabalho) {
        return this.http.put(this.environment.api + 'estacao', estacao, this.auth.getHeader());
    }
}
