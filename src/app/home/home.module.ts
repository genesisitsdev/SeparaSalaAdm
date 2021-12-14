import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { NgSelectModule } from '@ng-select/ng-select';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CadastroPredioComponent } from './cadastro/cadastro-predio/cadastro-predio.component';
import { CadastroSalaComponent } from './cadastro/cadastro-sala/cadastro-sala.component';
import { AlocacoesComponent } from './vis-dados/alocacoes/alocacoes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SalasComponent } from './vis-dados/salas/salas.component';
import { DomSanitizer } from '@angular/platform-browser';
import { MatAutocompleteModule, MatIconModule, MatIconRegistry } from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { VisDadosComponent } from './vis-dados/vis-dados.component';
import { NumberAlocacoesGraphComponent } from './vis-dados/number-alocacoes-graph/number-alocacoes-graph.component';
import { AverageAlocacoesGraphComponent } from './vis-dados/average-alocacoes-graph/average-alocacoes-graph.component';
import { NumberAlocacoesLinearComponent } from './vis-dados/number-alocacoes-linear/number-alocacoes-linear.component';
import { AverageAlocacoesLinearComponent } from './vis-dados/average-alocacoes-linear/average-alocacoes-linear.component';
import { AgmCoreModule } from '@agm/core';
import { CadastroEstacaoTrabalhoComponent } from './cadastro/cadastro-estacao-trabalho/cadastro-estacao-trabalho.component';
import { EstacoesComponent } from './vis-dados/estacoes/estacoes.component';
import { AlocacoesEstacoesComponent } from './vis-dados/alocacoes-estacoes/alocacoes-estacoes.component';
import { QrCodePrintableComponent } from './qr-code-printable/qr-code-printable.component';
import { CadastroEmpresaComponent } from './cadastro/cadastro-empresa/cadastro-empresa.component';
import { EmpresasComponent } from './vis-dados/empresas/empresas.component';
import { PredioComponent } from './vis-dados/predios/predios.component';
import { CheckInComponent } from './vis-dados/check-in/check-in.component';

@NgModule({
    declarations: [
        HomeComponent,
        CadastroPredioComponent,
        CadastroSalaComponent,
        CadastroEstacaoTrabalhoComponent,
        CadastroEmpresaComponent,
        EmpresasComponent,
        PredioComponent,
        CheckInComponent,
        AlocacoesComponent,
        AlocacoesEstacoesComponent,
        EstacoesComponent,
        SalasComponent,
        VisDadosComponent,
        NumberAlocacoesGraphComponent,
        AverageAlocacoesGraphComponent,
        NumberAlocacoesLinearComponent,
        AverageAlocacoesLinearComponent,
        QrCodePrintableComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatChipsModule,
        NgSelectModule,
        MatIconModule,
        NgxChartsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyC8FV5bh8VLBqDmbqRVpVtDNle8J7HudmU',
            libraries: [ 'places' ]
        })
    ]
})
export class HomeModule {
    constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
        matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg')); // Or whatever path you placed mdi.svg at
    }
}
