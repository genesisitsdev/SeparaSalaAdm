import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor() {}

  getToken(): string {
    const token: string = JSON.parse(localStorage.getItem("user")).token;
    if (token) {
      return token;
    } else {
      return "";
    }
  }
  getUser(): any {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      return user;
    } else {
      return null;
    }
  }

  getHeader(): any {
    const token: string = this.getToken();
    return { headers: { Authorization: "Bearer " + token } };
  }
}
