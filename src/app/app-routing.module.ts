import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { AuthGuardService } from './login/auth.guard';

const routes: Routes = [
    { path: 'login', loadChildren: './login/login.module#LoginModule' },
    { path: '', redirectTo: 'admin', pathMatch: 'full' },
    { path: 'admin', loadChildren: './home/home.module#HomeModule', pathMatch: 'prefix' },
    { path: 'tutorial', component: TutorialComponent, canActivate: [ AuthGuardService ] }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
