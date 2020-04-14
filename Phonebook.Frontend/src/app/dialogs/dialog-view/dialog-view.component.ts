import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  ComponentFactoryResolver,
  ComponentFactory,
  ChangeDetectorRef
} from '@angular/core';
import { DialogItem } from 'src/app/dialogs/dialog-item';

@Component({
  selector: 'app-dialog-view',
  templateUrl: './dialog-view.component.html',
  styleUrls: ['./dialog-view.component.scss']
})
export class DialogViewComponent {
  @Input() title: string;
  @Input() content: DialogItem;
  @Input() data: any;
  @ViewChild('componentContainer', { read: ViewContainerRef }) container;
  componentRef: ComponentRef<any>;

  constructor(private resolver: ComponentFactoryResolver, private cdRef: ChangeDetectorRef) {}
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(this.content.component);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.data = this.data;
    this.cdRef.detectChanges();
  }
  public createComponent() {}

  ngOnDestroy() {
    this.componentRef.destroy();
  }
}
