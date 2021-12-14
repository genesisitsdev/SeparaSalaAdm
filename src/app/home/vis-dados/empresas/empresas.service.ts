import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "src/app/shared/auth.service";
import { Inject } from "@angular/core";
import { Empresa } from "src/app/model/empresa";

@Injectable({
  providedIn: "root",
})
export class EmpresasService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    @Inject("env") private environment
  ) {}

  getEmpresas() {
    return this.http.get(
      this.environment.api + "empresas",
      this.auth.getHeader()
    );
  }
  deleteEmpresa(id) {
    return this.http.delete(
      this.environment.api + "empresas/" + id,
      this.auth.getHeader()
    );
  }
}
