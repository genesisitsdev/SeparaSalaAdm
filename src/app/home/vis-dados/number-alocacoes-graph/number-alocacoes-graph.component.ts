import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { NumberAlocacoesGraphService } from "./number-alocacoes-graph.service";

@Component({
  selector: "app-number-alocacoes-graph",
  templateUrl: "./number-alocacoes-graph.component.html",
  styleUrls: ["./number-alocacoes-graph.component.css"],
})

//TODO: Mostrar o lineChart de alocacoes por tempo quando clicar na barra!
export class NumberAlocacoesGraphComponent implements OnInit {
  alocacoesCount: any;
  multi: any[];

  view: any[] = [1100, undefined];

  // options
  barPadding = 100;
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = "Salas";
  showYAxisLabel = true;
  yAxisLabel = "Número de alocações";

  colorScheme = {
    domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"],
  };

  constructor(numberAlocacoesGraphService: NumberAlocacoesGraphService) {
    numberAlocacoesGraphService.getAlocacoesCount().subscribe(
      (res) => {
        this.alocacoesCount = res;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  @Output() selectedRoom = new EventEmitter<any>();

  selectedRoomChild(name: string) {
    let i: number;
    for (i = 0; i < this.alocacoesCount.length; i++) {
      if (this.alocacoesCount[i].name === name) {
        this.selectedRoom.emit({
          id: this.alocacoesCount[i]._id,
          color: this.colorScheme.domain[i],
          name: name,
        });
      }
    }
  }

  onSelect(event) {
    this.selectedRoomChild(event.name);
  }

  ngOnInit() {}
}
