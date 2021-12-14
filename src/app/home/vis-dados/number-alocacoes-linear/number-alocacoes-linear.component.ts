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
import { NumberAlocacoesLinearService } from "./number-alocacoes-linear.service";

@Component({
  selector: "app-number-alocacoes-linear",
  templateUrl: "./number-alocacoes-linear.component.html",
  styleUrls: ["./number-alocacoes-linear.component.css"],
})
export class NumberAlocacoesLinearComponent
  implements AfterViewInit, OnChanges {
  @Input("roomId") room: any;
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
  yAxisLabel = "Número de alocações";

  colorScheme = {
    domain: [],
  };

  // line, area
  autoScale = true;

  constructor(
    private numberLinear: NumberAlocacoesLinearService,
    private cdr: ChangeDetectorRef
  ) {}

  @Output() shouldHideNumber = new EventEmitter<boolean>();

  onSelect(event) {}
  ngAfterViewInit() {
    // this.getAlocacoes();
  }
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
        this.shouldHideNumber.emit(true);
      }
    }
    if (!excluiu) {
      this.colorScheme.domain.push(this.room.color);
      this.getAlocacoes();
    }
  }

  getAlocacoes() {
    this.numberLinear.getAlocacoesByMonth(this.room.id).subscribe(
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
