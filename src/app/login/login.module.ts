import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';

@NgModule({
    declarations: [ LoginComponent ],
    imports: [ CommonModule, LoginRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule ],
    providers: [ { provide: 'env', useValue: environment } ],
})
export class LoginModule {}
