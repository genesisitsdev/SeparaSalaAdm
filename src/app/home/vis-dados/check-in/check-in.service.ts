import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "src/app/shared/auth.service";
import { Inject } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CheckInService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    @Inject("env") private environment
  ) {}

  getCheckIns() {
    return this.http.get(
      this.environment.api + "checkin",
      this.auth.getHeader()
    );
  }

  deleteCheckIns(id) {
    return this.http.delete(
      this.environment.api + "checkin/" + id,
      this.auth.getHeader()
    );
  }
}
