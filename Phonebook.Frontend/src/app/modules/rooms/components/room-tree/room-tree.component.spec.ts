import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomTreeComponent } from './room-tree.component';
import { BuildingPart, Room } from 'src/app/shared/models';
import { RoomService, BuildingTreeNode } from 'src/app/services/api/room.service';

xdescribe('RoomTreeComponent', () => {
  let component: RoomTreeComponent;
  let fixture: ComponentFixture<RoomTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RoomTreeComponent],
      providers: [{ provide: RoomService, useClass: MockRoomService }],
      imports: []
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class MockRoomService {
  public getRoomTree(): BuildingTreeNode[] {
    return [
      {
        id: '1.Building',
        name: '1.Building',
        type: BuildingPart.building,
        data: new Room('', '', 0, '', '', '', '', '', ''),
        children: [],
        path: []
      }
    ];
  }
}
