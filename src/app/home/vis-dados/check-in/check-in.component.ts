import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CheckInService } from './check-in.service';

declare var $;

@Component({
    selector: 'app-check-in',
    templateUrl: './check-in.component.html',
    styleUrls: [ './check-in.component.css' ]
})
export class CheckInComponent implements OnInit {
    @ViewChild('dataTable', null)
    table;
    dataTable: any;
    public checkIns;
    public isDataLoaded: boolean = false;

    constructor(private empresasService: CheckInService, private cdr: ChangeDetectorRef) {
        this.getEmpresas();
    }

    getEmpresas() {
        this.empresasService.getCheckIns().subscribe(
            (res) => {
                this.checkIns = res;
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

    clickDelete(checkIn) {
        if (confirm(`Deseja excluir o check-in ${checkIn._id} ?`)) {
            this.empresasService.deleteCheckIns(checkIn._id).subscribe(
                (res) => {
                    this.checkIns = this.checkIns.filter((valor) => {
                        if (valor._id === checkIn._id) {
                            return false;
                        }
                        return true;
                    });
                },
                (err) => {}
            );
        }
    }

    ngOnInit() {}
}
