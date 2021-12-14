import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { EstacaoTrabalho } from 'src/app/model/estacao-trabalho';
import { EstacoesService } from './estacoes.service';
declare var $;

@Component({
    selector: 'app-estacoes',
    templateUrl: './estacoes.component.html',
    styleUrls: [ './estacoes.component.css' ]
})
export class EstacoesComponent {
    @ViewChild('dataTable', null)
    table;
    dataTable: any;
    public estacoes: any;
    public isDataLoaded: boolean = false;
    public isEditOpen: boolean;

    constructor(private estacoesService: EstacoesService, private router: Router, private cdr: ChangeDetectorRef) {
        this.getEstacoes();
    }

    getEstacoes() {
        this.estacoesService.getEstacoes().subscribe(
            (res) => {
                this.estacoes = res;
                this.estacoes = this.estacoes.map((estacao) => ({
                    ...estacao,
                    empresasNome: estacao.empresa.map((e) => e.nome).join(', ')
                }));
                this.isDataLoaded = true;
                this.cdr.detectChanges();
                this.dataTable = $(this.table.nativeElement);
                this.dataTable.DataTable({
                    aaSorting: [],
                    dom: 'Bfrtip',
                    buttons: [
                        'copyHtml5',
                        'excelHtml5',
                        {
                            extend: 'csvHtml5',
                            text: 'CSV',
                            charset: 'utf-8',
                            extension: '.csv',
                            fieldSeparator: ';',
                            fieldBoundary: '',
                            filename: 'export',
                            bom: true
                        },
                        'pdfHtml5'
                    ]
                });
            },
            (error) => {
                console.error(error);
            }
        );
    }

    clickQrCode(estacao) {
        window.open(`/admin/qr-code/estacao/${estacao._id}`, '_blank');
    }

    // clickDelete(Sala) {
    //   if (
    //     confirm(
    //       `Deseja excluir a sala ${Sala.nome}?\nTodas as alocações desta sala serão excluidas.`
    //     )
    //   ) {
    //     this.estacoesService.deleteEstacao(Sala._id).subscribe(
    //       (res) => {
    //         let salasFiltered = this.estacoes.filter(
    //           (value) => value._id !== Sala._id
    //         );
    //         this.estacoes = salasFiltered;
    //       },
    //       (error) => {
    //         console.error(error);
    //       }
    //     );
    //   }
    // }

    clickEdit(estacao) {
        this.router.navigate([ '/admin/edita/estacao' ], { state: estacao });
    }
}
