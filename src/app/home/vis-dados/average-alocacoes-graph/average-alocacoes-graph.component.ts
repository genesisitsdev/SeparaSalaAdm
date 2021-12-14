import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AverageAlocacoesGraphService } from "./average-alocacoes-graph.service";

@Component({
  selector: "app-average-alocacoes-graph",
  templateUrl: "./average-alocacoes-graph.component.html",
  styleUrls: ["./average-alocacoes-graph.component.css"],
})
export class AverageAlocacoesGraphComponent implements OnInit {
  alocacoesAverage: any;
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
  yAxisLabel = "Tempo medio das alocações";

  colorScheme = {
    domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"],
  };

  constructor(averageAlocacoesService: AverageAlocacoesGraphService) {
    averageAlocacoesService.getAlocacoesCount().subscribe(
      (res) => {
        this.alocacoesAverage = res;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  @Output() selectedRoom = new EventEmitter<any>();

  selectedRoomChild(name: string) {
    let i: number;
    for (i = 0; i < this.alocacoesAverage.length; i++) {
      if (this.alocacoesAverage[i].name === name) {
        this.selectedRoom.emit({
          id: this.alocacoesAverage[i]._id,
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
