import { Store, NgxsModule } from '@ngxs/store';
import { async, TestBed } from '@angular/core/testing';
import { AppState, SetVersion, ServiceWorkerNotificationDisplayed } from 'src/app/shared/states/App.state';

describe('[States] App', () => {
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([AppState])]
    }).compileComponents();
    store = TestBed.get(Store);
    store.reset({
      appstate: {
        serviceWorkerNotificationDisplayed: false,
        version: '0.0.0'
      }
    });
  }));
  it('it sets Version', () => {
    expect(store.selectSnapshot(storeSnapshot => storeSnapshot.appstate.version)).toBe('0.0.0');
    store.dispatch(new SetVersion('1.0.0'));
    expect(store.selectSnapshot(storeSnapshot => storeSnapshot.appstate.version)).toBe('1.0.0');
  });

  it('it sets ServiceWorkerNotificationDisplayed', () => {
    expect(store.selectSnapshot(storeSnapshot => storeSnapshot.appstate.serviceWorkerNotificationDisplayed)).toBe(
      false
    );
    store.dispatch(new ServiceWorkerNotificationDisplayed());
    expect(store.selectSnapshot(storeSnapshot => storeSnapshot.appstate.serviceWorkerNotificationDisplayed)).toBe(true);
  });
});
