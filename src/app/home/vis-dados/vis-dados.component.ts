import { Component, OnInit } from "@angular/core";
import { VisDadosService } from "./vis-dados.service";

@Component({
  selector: "app-vis-dados",
  templateUrl: "./vis-dados.component.html",
  styleUrls: ["./vis-dados.component.css"],
})
export class VisDadosComponent implements OnInit {
  alocacoesCount: any;
  multi: any[];
  view: any[] = [1000, undefined];

  showLineChartNumber: boolean;
  linechartNumberRoom: any;
  showLineChartAvg: boolean;
  linechartAverageRoom: any;

  // options
  barPadding = 100;
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = "Salas";
  showYAxisLabel = true;
  yAxisLabel = "Alocações";

  colorScheme = {
    domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"],
  };

  constructor(visDadosService: VisDadosService) {
    visDadosService.getAlocacoesCount().subscribe(
      (res) => {
        this.alocacoesCount = res;
      },
      (err) => {
        console.error(err);
      }
    );
  }
  selectedRoomNumberParent(event) {
    this.showLineChartNumber = true;
    this.linechartNumberRoom = { ...event };
  }
  selectedRoomAvgParent(event) {
    this.showLineChartAvg = true;
    this.linechartAverageRoom = { ...event };
  }
  hideAvg(event) {
    this.showLineChartAvg = !event;
  }
  hideNumber(event) {
    this.showLineChartNumber = !event;
  }
  formatCountsAxis(val) {
    if (val % 1 === 0) {
      return parseInt(val);
    }
  }

  onSelect(event) {}

  ngOnInit() {}
}
