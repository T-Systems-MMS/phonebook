import { TestBed } from '@angular/core/testing';

import { HasBookmarksGuard } from './has-bookmarks.guard';

describe('HasBookmarksGuard', () => {
  let guard: HasBookmarksGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HasBookmarksGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
