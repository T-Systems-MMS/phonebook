import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { FloorplanService } from 'src/app/services/floorplan.service';
import { RoomPlanModule } from 'src/app/shared/components/room-plan/room-plan.module';
import { RoomPlanComponent } from './room-plan.component';

describe('RoomPlanComponent', () => {
  let component: RoomPlanComponent;
  let fixture: ComponentFixture<RoomPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RoomPlanModule],
      providers: [{ provide: FloorplanService, useClass: MockFloorplanService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class MockFloorplanService {
  public get(floorplan: string): Observable<string> {
    return of('<svg></svg>');
  }
}
