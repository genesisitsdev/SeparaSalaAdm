import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/shared/auth.service';
import { Inject } from '@angular/core';
import { EstacaoTrabalho } from 'src/app/model/estacao-trabalho';
import { Sala } from 'src/app/model/salaModel';

@Injectable({
    providedIn: 'root'
})
export class QrCodeService {
    constructor(private http: HttpClient, private auth: AuthService, @Inject('env') private environment) {}

    getEstacao(id: string) {
        return this.http.get<EstacaoTrabalho>(this.environment.api + 'estacao/' + id, this.auth.getHeader());
    }

    getSala(id: string) {
        return this.http.get<Sala>(this.environment.api + 'salas/' + id, this.auth.getHeader());
    }
}
