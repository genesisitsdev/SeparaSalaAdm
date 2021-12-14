import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CadastroEstacaoTrabalhoComponent } from "./cadastro-estacao-trabalho.component";

describe("CadastroEstacaoTrabalhoComponent", () => {
  let component: CadastroEstacaoTrabalhoComponent;
  let fixture: ComponentFixture<CadastroEstacaoTrabalhoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroEstacaoTrabalhoComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroEstacaoTrabalhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
