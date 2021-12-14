/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NumberAlocacoesGraphService } from './number-alocacoes-graph.service';

describe('Service: NumberAlocacoesGraph', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NumberAlocacoesGraphService]
    });
  });

  it('should ...', inject([NumberAlocacoesGraphService], (service: NumberAlocacoesGraphService) => {
    expect(service).toBeTruthy();
  }));
});
