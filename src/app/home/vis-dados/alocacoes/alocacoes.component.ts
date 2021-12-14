import { Component, OnInit, ViewChild, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { AlocacoesService } from './alocacoes.service';

declare var $;

@Component({
    selector: 'app-alocacoes',
    templateUrl: './alocacoes.component.html',
    styleUrls: [ './alocacoes.component.css' ]
})
export class AlocacoesComponent implements OnInit {
    @ViewChild('dataTable', null)
    table;
    dataTable: any;
    public alocacoes: any;
    public isDataLoaded: boolean = false;

    constructor(private alocacoesService: AlocacoesService, private cdr: ChangeDetectorRef) {
        this.getAlocacoes();
    }

    getAlocacoes() {
        this.alocacoesService.getAlocacoes().subscribe(
            (res) => {
                this.alocacoes = res;
                this.alocacoes = this.alocacoes.map((alocacao) => ({
                    ...alocacao,
                    empresasNome: alocacao.sala.empresa.map((e) => e.nome).join(', ')
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

    clickDelete(alocacao) {
        if (confirm(`Deseja excluir a alocação ${alocacao.title} ?`)) {
            this.alocacoesService.deleteAlocacao(alocacao._id).subscribe(
                (res) => {
                    let alocacaoFiltered = this.alocacoes.filter((valor) => {
                        if (valor._id === alocacao._id) {
                            return false;
                        }
                        return true;
                    });
                    this.alocacoes = alocacaoFiltered;
                },
                (err) => {}
            );
        }
    }

    ngOnInit() {}
}
