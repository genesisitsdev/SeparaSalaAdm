import { Component, ViewChild, ChangeDetectorRef } from "@angular/core";
import { Router } from "@angular/router";
import { PrediosService } from "./predios.service";

declare var $;

@Component({
  selector: "app-predios",
  templateUrl: "./predios.component.html",
  styleUrls: ["./predios.component.css"],
})
export class PredioComponent {
  @ViewChild("dataTable", null) table;
  dataTable: any;
  public predios;
  public isDataLoaded: boolean = false;

  constructor(
    private prediosService: PrediosService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {
    this.getEmpresas();
  }

  getEmpresas() {
    this.prediosService.getPredios().subscribe(
      (res) => {
        this.predios = res;
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

  // clickDelete(predio) {
  //   if (confirm(`Deseja excluir a empresa ${predio.nome} ?`)) {
  //     this.prediosService.deletePredios(predio._id).subscribe(
  //       (res) => {
  //         this.predios = this.predios.filter((valor) => {
  //           if (valor._id === predio._id) {
  //             return false;
  //           }
  //           return true;
  //         });
  //       },
  //       (err) => {}
  //     );
  //   }
  // }

  clickEdit(predio) {
    this.router.navigate(['/admin/edita/predio'], {state: predio});
  }
}
