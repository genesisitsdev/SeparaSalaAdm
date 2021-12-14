import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class AuthGuardService implements CanActivate {
  constructor(private loginServices: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (route.routeConfig.path === "tutorial") {
        return true;
      } else {
        if (user.admin) {
          return true;
        } else {
          alert("Este usuário não é um administrador");
          return this.router.navigateByUrl("login");
        }
      }
    } else {
      return this.router.navigateByUrl("login");
    }
  }
}
