import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild, SimpleChanges } from '@angular/core';
import { FloorplanService } from 'src/app/services/floorplan.service';
import { RuntimeEnvironmentInterface } from 'src/environments/EnvironmentInterfaces';
import { runtimeEnvironment } from 'src/environments/runtime-environment';
@Component({
  selector: 'app-room-plan',
  templateUrl: './room-plan.component.html',
  styleUrls: ['./room-plan.component.scss']
})
export class RoomPlanComponent implements OnInit, OnChanges {
  @Input()
  public floorplan: string | null;
  @Input()
  public room: string;
  @ViewChild('floorplanSVG', { static: true })
  public element: ElementRef;
  public floorPlanSVG: string | null = null;
  public floorPlanNotFound: boolean = false;
  public runtimeEnvironment: RuntimeEnvironmentInterface = runtimeEnvironment;

  constructor(private floorplanService: FloorplanService) {}

  public ngOnInit() {
    this.refreshRoomPlan();
    this.loadSVG();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if(changes.hasOwnProperty('floorplan')){
      this.loadSVG();
    }
    this.refreshRoomPlan();
  }

  private refreshRoomPlan() {
    if (this.floorplan == null || this.floorplan === '') {
      this.floorPlanNotFound = true;
      return;
    }

    if (this.floorPlanSVG) {
      const svgContainer: HTMLElement = this.element.nativeElement;
      svgContainer.innerHTML = this.floorPlanSVG;
      // Need to be set here as css wont get applied after insert
      if (svgContainer.firstElementChild != null) {
        svgContainer.firstElementChild.setAttribute(
          'style',
          ' position: absolute; height: 100%; width: 100%; left: 0;top: 0;'
        );
      }
      let roomElement: HTMLElement | null = null;
      // QuerySelector throws an exception if id begins with a number
      roomElement = svgContainer.querySelector('[id=\'' + this.room + '\']');
      if (roomElement != null && roomElement.firstElementChild != null) {
        Array.from(roomElement.childNodes).forEach(element => {
          if (element.nodeName === 'rect' || element.nodeName === 'path' || element.nodeName === 'polygon') {
            (element as HTMLElement).setAttribute('style', 'fill: #E20074;');
          }
        });
      }
    }
  }

  public loadSVG() {
    if (this.floorplan != null) {
      this.floorplanService.get(this.floorplan).subscribe((res: string) => {
        this.floorPlanSVG = res;
        this.refreshRoomPlan();
      });
    }
  }
}
