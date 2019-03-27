import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingComponent } from './building.component';
import { RouterTestingModule } from '@angular/router/testing';

xdescribe('BuildingComponent', () => {
  let component: BuildingComponent;
  let fixture: ComponentFixture<BuildingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BuildingComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
