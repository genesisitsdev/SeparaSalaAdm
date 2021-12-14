/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from "@angular/core/testing";
import { PrediosService } from "./predios.service";

describe("Service: Alocacoes", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrediosService],
    });
  });

  it("should ...", inject([PrediosService], (service: PrediosService) => {
    expect(service).toBeTruthy();
  }));
});
