import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "src/app/shared/auth.service";
import { Inject } from "@angular/core";
import { Empresa } from "src/app/model/empresa";

@Injectable({
  providedIn: "root",
})
export class CadastroEmpresaService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    @Inject("env") private environment
  ) {}

  createEmpresa(empresa: Empresa) {
    return this.http.post(
      this.environment.api + "empresas",
      empresa,
      this.auth.getHeader()
    );
  }

  atualizaEmpresa(empresa: Empresa) {
    return this.http.put(
      this.environment.api + "empresas",
      empresa,
      this.auth.getHeader()
    );
  }
}
