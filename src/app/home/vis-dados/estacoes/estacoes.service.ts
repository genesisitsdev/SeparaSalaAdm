import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "src/app/shared/auth.service";
import { Inject } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class EstacoesService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    @Inject("env") private environment
  ) {}

  getEstacoes() {
    return this.http.get(
      this.environment.api + "estacao",
      this.auth.getHeader()
    );
  }

  deleteEstacao(id) {
    return this.http.delete(
      this.environment.api + "estacao/" + id,
      this.auth.getHeader()
    );
  }
}
