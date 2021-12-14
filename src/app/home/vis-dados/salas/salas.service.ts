import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "src/app/shared/auth.service";
import { Inject } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SalasService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    @Inject("env") private environment
  ) {}

  getSalas() {
    return this.http.get(this.environment.api + "salas", this.auth.getHeader());
  }

  deleteSala(id) {
    return this.http.delete(
      this.environment.api + "salas/" + id,
      this.auth.getHeader()
    );
  }
}
