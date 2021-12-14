import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "src/app/shared/auth.service";
import { Inject } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CadastroSalaService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    @Inject("env") private environment
  ) {}

  getPredios() {
    return this.http.get(
      this.environment.api + "predio",
      this.auth.getHeader()
    );
  }

  getEmpresas() {
    return this.http.get(
      this.environment.api + "empresas",
      this.auth.getHeader()
    );
  }

  createSala(data: any) {
    return this.http.post(
      this.environment.api + "salas",
      data,
      this.auth.getHeader()
    );
  }

  updateSala(sala) {
    return this.http.put(
      this.environment.api + "salas",
      sala,
      this.auth.getHeader()
    );
  }
}
