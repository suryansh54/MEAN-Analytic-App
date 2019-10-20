import { TestBed } from '@angular/core/testing';

import { MessageAndLoaderServiceService } from './message-and-loader-service.service';

describe('MessageAndLoaderServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessageAndLoaderServiceService = TestBed.get(MessageAndLoaderServiceService);
    expect(service).toBeTruthy();
  });
});
