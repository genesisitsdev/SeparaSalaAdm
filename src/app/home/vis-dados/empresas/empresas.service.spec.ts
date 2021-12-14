/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from "@angular/core/testing";
import { EmpresasService } from "./empresas.service";

describe("Service: Alocacoes", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmpresasService],
    });
  });

  it("should ...", inject([EmpresasService], (service: EmpresasService) => {
    expect(service).toBeTruthy();
  }));
});
