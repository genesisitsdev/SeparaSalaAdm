import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { SalasService } from './salas.service';
declare var $;

@Component({
    selector: 'app-salas',
    templateUrl: './salas.component.html',
    styleUrls: [ './salas.component.css' ]
})
export class SalasComponent {
    @ViewChild('dataTable', null)
    table;
    dataTable: any;
    public salas: any;
    public isDataLoaded: boolean = false;

    constructor(private salasService: SalasService, private router: Router, private cdr: ChangeDetectorRef) {
        this.getSalas();
    }

    getSalas() {
        this.salasService.getSalas().subscribe(
            (res) => {
                this.salas = res;
                this.salas = this.salas.map((estacao) => ({
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
    clickQrCode(sala) {
        window.open(`/admin/qr-code/sala/${sala._id}`, '_blank');
    }

    // clickDelete(Sala) {
    //   if (
    //     confirm(
    //       `Deseja excluir a sala ${Sala.nome}?\nTodas as alocações desta sala serão excluidas.`
    //     )
    //   ) {
    //     this.salasService.deleteSala(Sala._id).subscribe(
    //       (res) => {
    //         let salasFiltered = this.salas.filter((value) => {
    //           if (value._id === Sala._id) {
    //             return false;
    //           }
    //           return true;
    //         });
    //         this.salas = salasFiltered;
    //       },
    //       (error) => {
    //         console.error(error);
    //       }
    //     );
    //   }
    // }
    clickEdit(sala) {
        this.router.navigate([ '/admin/edita/sala' ], { state: sala });
    }
}
