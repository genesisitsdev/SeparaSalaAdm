import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "src/app/shared/auth.service";
import { Inject } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AverageAlocacoesGraphService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    @Inject("env") private environment
  ) {}

  getAlocacoesCount() {
    return this.http.get(
      this.environment.api + "alocacoes/average",
      this.auth.getHeader()
    );
  }
}
