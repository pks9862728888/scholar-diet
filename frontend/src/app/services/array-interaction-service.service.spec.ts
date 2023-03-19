import { TestBed } from '@angular/core/testing';
import { ArrayInteractionService } from './array-interaction-service.service';

describe('ArrayInteractionServiceService', () => {
  let service: ArrayInteractionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArrayInteractionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
