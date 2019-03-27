import { Store, NgxsModule } from '@ngxs/store';
import { async, TestBed } from '@angular/core/testing';
import { BookmarksState, ToggleBookmark } from 'src/app/shared/states/Bookmarks.state';
import { Person } from 'src/app/shared/models';

describe('[States] Bookmarks', () => {
  let store: Store;
  const person: Person = Person.empty();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([BookmarksState])]
    }).compileComponents();
    store = TestBed.get(Store);
    store.reset({
      bookmarks: []
    });
  }));
  it('it toggles Bookmarks', () => {
    person.Id = 'test';
    expect(store.selectSnapshot(storeSnapshot => storeSnapshot.bookmarks)).toEqual([]);
    store.dispatch(new ToggleBookmark(person));
    expect(store.selectSnapshot(storeSnapshot => storeSnapshot.bookmarks)).toEqual([person]);
    store.dispatch(new ToggleBookmark(person));
    expect(store.selectSnapshot(storeSnapshot => storeSnapshot.bookmarks)).toEqual([]);
  });
});
