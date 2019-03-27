import { FloorplanService } from 'src/app/services/floorplan.service';
import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges } from '@angular/core';
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
  @ViewChild('floorplanSVG')
  public element: ElementRef;
  public displaySVG: boolean = false;
  public floorPlanNotFound: boolean = false;
  public runtimeEnvironment: RuntimeEnvironmentInterface = runtimeEnvironment;

  constructor(private floorplanService: FloorplanService) { }

  public ngOnInit() {
    this.refreshRoomPlan();
  }

  public ngOnChanges() {
    this.refreshRoomPlan();
  }

  private refreshRoomPlan() {
    if (this.floorplan == null || this.floorplan === '') {
      this.displaySVG = false;
      this.floorPlanNotFound = true;
      return;
    }
    this.displaySVG = this.isSVG(this.floorplan);
    if (this.displaySVG) {
      const svgContainer: HTMLElement = this.element.nativeElement;
      this.floorplanService.get(this.floorplan).subscribe((res: string) => {
        svgContainer.innerHTML = res;
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
            if (element.nodeName === 'rect' || element.nodeName === 'path') {
              (element as HTMLElement).setAttribute('style', 'fill: #E20074;');
            }
          });
        }
      });
    }
  }

  public isSVG(building: string): boolean {
    return [
      'DDR5Bauteil10',
      'DDR5Bauteil11',
      'DDR5Bauteil12',
      'DDR5Bauteil13',
      'DDR5Bauteil14',
      'DDR5Bauteil20',
      'DDR5Bauteil21',
      'DDR5Bauteil22',
      'DDR5Bauteil23',
      'DDR5Bauteil24',
      'DDR5Bauteil30',
      'DDR5Bauteil31',
      'DDR5Bauteil32',
      'DDR5Bauteil33',
      'DDR5Bauteil34',
      'DDR5Bauteil35',
      'DDR5Bauteil36',
      'DDR5Bauteil37',
      'DDR7HausA1',
      'DDR7HausB11',
      'DDR7HausB12',
      'DDR7HausB13',
      'DDR7HausB21',
      'DDR7HausB22',
      'DDR7HausB23',
      'DDR7HausC1',
      'DDR7HausC3',
      'DDR7HausF11',
      'DDR7HausF13',
      'DDR7HausF23',
      'DDR7HausF21'
    ]
      .includes(building);
  }
}
