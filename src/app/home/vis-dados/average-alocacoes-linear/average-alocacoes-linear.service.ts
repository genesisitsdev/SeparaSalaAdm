import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "src/app/shared/auth.service";
import { Inject } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AverageAlocacoesLinearService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    @Inject("env") private environment
  ) {}
  getAlocacoesByMonth(salaId) {
    return this.http.get(
      this.environment.api + "alocacoes/month/average/" + salaId,
      this.auth.getHeader()
    );
  }
}
