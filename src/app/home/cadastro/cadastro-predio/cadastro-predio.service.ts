import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "src/app/shared/auth.service";
import { Inject } from "@angular/core";
import { Predio } from "src/app/model/predioModel";

@Injectable({
  providedIn: "root",
})
export class CadastroPredioService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    @Inject("env") private environment
  ) {}

  createPredio(predio: Predio) {
    return this.http.post(
      this.environment.api + "predio",
      predio,
      this.auth.getHeader()
    );
  }

  updatePredio(predio: Predio) {
    return this.http.put(
      this.environment.api + "predio",
      predio,
      this.auth.getHeader()
    );
  }
}
