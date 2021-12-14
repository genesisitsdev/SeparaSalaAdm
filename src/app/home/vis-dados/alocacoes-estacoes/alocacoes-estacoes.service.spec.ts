/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from "@angular/core/testing";
import { AlocacoesService } from "./alocacoes-estacoes.service";

describe("Service: Alocacoes", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlocacoesService],
    });
  });

  it("should ...", inject([AlocacoesService], (service: AlocacoesService) => {
    expect(service).toBeTruthy();
  }));
});
