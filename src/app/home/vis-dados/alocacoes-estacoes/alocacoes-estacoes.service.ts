import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "src/app/shared/auth.service";
import { Inject } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AlocacoesService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    @Inject("env") private environment
  ) {}

  getAlocacoes() {
    return this.http.get(
      this.environment.api + "alocacoes/estacao",
      this.auth.getHeader()
    );
  }
  deleteAlocacao(id) {
    return this.http.delete(
      this.environment.api + "alocacoes/estacao/" + id,
      this.auth.getHeader()
    );
  }
}
