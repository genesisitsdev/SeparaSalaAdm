import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface User {
    admin: boolean;
    name: string;
    id: string;
    cn: string;
    email: string;
    photo: string;
    cel: string;
    tel: string;
    token: string;
}

@Injectable({ providedIn: 'root' })
export class LoginService {
    constructor(private http: HttpClient, @Inject('env') private environment) {}
    login(username: string, password: string, token: string) {
        return this.http.post<User>(this.environment.api + 'usuarios/admin/login', {
            username,
            password,
            token
        });
    }
}
