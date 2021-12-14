import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "src/app/shared/auth.service";
import { Inject } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class PrediosService {
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
  deletePredios(id: string) {
    return this.http.delete(
      this.environment.api + "predio/" + id,
      this.auth.getHeader()
    );
  }
}
