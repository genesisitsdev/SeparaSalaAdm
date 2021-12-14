import { Component, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { Router } from "@angular/router";
import { EmpresasService } from "./empresas.service";

declare var $;

@Component({
  selector: "app-empresas",
  templateUrl: "./empresas.component.html",
  styleUrls: ["./empresas.component.css"],
})
export class EmpresasComponent implements OnInit {
  @ViewChild("dataTable", null) table;
  dataTable: any;
  public empresas;
  public isDataLoaded: boolean = false;

  constructor(
    private empresasService: EmpresasService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {
    this.getEmpresas();
  }

  getEmpresas() {
    this.empresasService.getEmpresas().subscribe(
      (res) => {
        this.empresas = res;
        this.isDataLoaded = true;
        this.cdr.detectChanges();
        this.dataTable = $(this.table.nativeElement);
        this.dataTable.DataTable({
          dom: "Bfrtip",
          buttons: [
            "copyHtml5",
            "excelHtml5",
            {
              extend: "csvHtml5",
              text: "CSV",
              charset: "utf-8",
              extension: ".csv",
              fieldSeparator: ";",
              fieldBoundary: "",
              filename: "export",
              bom: true,
            },
            "pdfHtml5",
          ],
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // clickDelete(empresa) {
  //   if (confirm(`Deseja excluir a empresa ${empresa.nome} ?`)) {
  //     this.empresasService.deleteEmpresa(empresa._id).subscribe(
  //       (res) => {
  //         this.empresas = this.empresas.filter((valor) => {
  //           if (valor._id === empresa._id) {
  //             return false;
  //           }
  //           return true;
  //         });
  //       },
  //       (err) => {}
  //     );
  //   }
  // }

  clickEdit(empresa) {
    this.router.navigate(['/admin/edita/empresa'], {state: empresa});
  }

  ngOnInit() {}
}
