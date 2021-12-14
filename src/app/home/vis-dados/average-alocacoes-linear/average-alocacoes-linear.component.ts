import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  AfterViewInit,
  ChangeDetectorRef,
  OnChanges,
  SimpleChange,
  SimpleChanges,
} from "@angular/core";
import { AverageAlocacoesLinearService } from "./average-alocacoes-linear.service";
@Component({
  selector: "app-average-alocacoes-linear",
  templateUrl: "./average-alocacoes-linear.component.html",
  styleUrls: ["./average-alocacoes-linear.component.css"],
})
export class AverageAlocacoesLinearComponent implements OnChanges {
  @Input("roomId") room: any = { id: "", color: "" };
  show = false;
  single: any[];
  multi: any[] = [];

  view: any[] = [1100, undefined];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = "Data";
  showYAxisLabel = true;
  yAxisLabel = "Tempo medio das alocações";

  colorScheme = {
    domain: [],
  };

  // line, area
  autoScale = true;

  constructor(
    private averageLinear: AverageAlocacoesLinearService,
    private cdr: ChangeDetectorRef
  ) {}
  @Output() shouldHideAvg = new EventEmitter<boolean>();

  onSelect(event) {}
  ngOnChanges(changes: SimpleChanges) {
    this.deleteOrGetAlocacao();
  }
  formatCountsAxis(val) {
    if (val % 1 === 0) {
      return parseInt(val);
    }
  }
  deleteOrGetAlocacao() {
    let name = this.room.name;
    let multiCopy = [...this.multi];
    let excluiu = false;
    for (let i = 0; i < multiCopy.length; i++) {
      if (multiCopy[i].name === name) {
        multiCopy.splice(i, 1);
        this.multi = multiCopy;
        let colorSchemeCopy = { ...this.colorScheme };
        colorSchemeCopy.domain.splice(i, 1);
        this.colorScheme = colorSchemeCopy;
        excluiu = true;
      }
      if (multiCopy.length === 0) {
        this.shouldHideAvg.emit(true);
      }
    }
    if (!excluiu) {
      this.colorScheme.domain.push(this.room.color);
      this.getAlocacoes();
    }
  }

  formatDateAxis(val) {
    return new Date(val);
  }

  getAlocacoes() {
    this.averageLinear.getAlocacoesByMonth(this.room.id).subscribe(
      (res) => {
        let multiCopy: any[] = [...this.multi];
        multiCopy.push(res);
        this.multi = multiCopy;
        this.show = true;
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
