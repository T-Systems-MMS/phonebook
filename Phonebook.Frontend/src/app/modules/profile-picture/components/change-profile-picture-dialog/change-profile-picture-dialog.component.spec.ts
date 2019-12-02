import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeProfilePictureDialogComponent } from './change-profile-picture-dialog.component';


xdescribe('ChangeProfilePictureDialogComponent', () => {
  let component: ChangeProfilePictureDialogComponent;
  let fixture: ComponentFixture<ChangeProfilePictureDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeProfilePictureDialogComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeProfilePictureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
