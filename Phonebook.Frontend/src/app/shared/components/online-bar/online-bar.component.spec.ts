import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceWorkerService } from 'src/app/services/service-worker.service';
import { OnlineBarComponent } from './online-bar.component';

describe('OnlineBarComponent', () => {
  let component: OnlineBarComponent;
  let fixture: ComponentFixture<OnlineBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OnlineBarComponent],
      providers: [ServiceWorkerService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
