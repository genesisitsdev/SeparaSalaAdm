import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { CadastroSalaComponent } from './cadastro/cadastro-sala/cadastro-sala.component';
import { CadastroPredioComponent } from './cadastro/cadastro-predio/cadastro-predio.component';
import { CadastroEstacaoTrabalhoComponent } from './cadastro/cadastro-estacao-trabalho/cadastro-estacao-trabalho.component';
import { AlocacoesComponent } from './vis-dados/alocacoes/alocacoes.component';
import { AuthGuardService } from '../login/auth.guard';
import { SalasComponent } from './vis-dados/salas/salas.component';
import { VisDadosComponent } from './vis-dados/vis-dados.component';
import { EstacoesComponent } from './vis-dados/estacoes/estacoes.component';
import { AlocacoesEstacoesComponent } from './vis-dados/alocacoes-estacoes/alocacoes-estacoes.component';
import { QrCodePrintableComponent } from './qr-code-printable/qr-code-printable.component';
import { CadastroEmpresaComponent } from './cadastro/cadastro-empresa/cadastro-empresa.component';
import { EmpresasComponent } from './vis-dados/empresas/empresas.component';
import { PredioComponent } from './vis-dados/predios/predios.component';
import { CheckInComponent } from './vis-dados/check-in/check-in.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [ AuthGuardService ],
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'cadastro/sala', component: CadastroSalaComponent },
            { path: 'cadastro/predio', component: CadastroPredioComponent },
            { path: 'cadastro/estacao', component: CadastroEstacaoTrabalhoComponent },
            { path: 'cadastro/empresa', component: CadastroEmpresaComponent },
            { path: 'edita/sala', component: CadastroSalaComponent },
            { path: 'edita/predio', component: CadastroPredioComponent },
            { path: 'edita/estacao', component: CadastroEstacaoTrabalhoComponent },
            { path: 'edita/empresa', component: CadastroEmpresaComponent },
            { path: 'alocacoes/salas', component: AlocacoesComponent },
            { path: 'alocacoes/estacoes', component: AlocacoesEstacoesComponent },
            { path: 'empresas', component: EmpresasComponent },
            { path: 'predios', component: PredioComponent },
            { path: 'salas', component: SalasComponent },
            { path: 'estacoes', component: EstacoesComponent },
            { path: 'home', component: VisDadosComponent },
            { path: 'check-in', component: CheckInComponent },
            {
                path: 'qr-code/:which/:id',
                component: QrCodePrintableComponent
            }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class HomeRoutingModule {}
