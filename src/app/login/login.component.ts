import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

declare var grecaptcha: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.css' ],
})
export class LoginComponent implements OnInit {
    msgError = '';
    token = '';
    constructor(private loginService: LoginService, private router: Router) {}

    ngOnInit() {
        this.loadScript().then(() => {
            setTimeout(() => {
                grecaptcha.render('login-recaptcha', {
                    sitekey: '6LdekG0dAAAAAEdV51buTLS0pfA8F-vkgYWlDiHh',
                    callback: (token) => {
                        this.token = token;
                    },
                });
            }, 1000);
        });
    }

    loadScript() {
        return new Promise<void>((resolve) => {
            let node = document.createElement('script');
            node.src = 'https://www.google.com/recaptcha/api.js';
            node.type = 'text/javascript';
            node.async = true;
            document.getElementById('script_area').appendChild(node);
            resolve();
        });
    }

    onLogin(form: NgForm) {
        if (!form.valid) {
            return;
        }
        const user = form.value.user;
        const password = form.value.password;
        this.loginService.login(user, password, this.token).subscribe(
            (res) => {
                localStorage.setItem('user', JSON.stringify(res));
                this.router.navigateByUrl('/admin');
            },
            (err) => {
                this.msgError = err.error.message;
            }
        );
        form.reset();
    }
}
