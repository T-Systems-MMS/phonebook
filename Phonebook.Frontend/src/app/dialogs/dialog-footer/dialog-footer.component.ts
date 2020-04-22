import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  ComponentFactoryResolver,
  ChangeDetectorRef,
  ComponentFactory,
} from '@angular/core';
import { DialogItem } from 'src/app/dialogs/dialog-item';

@Component({
  selector: 'app-dialog-footer',
  templateUrl: './dialog-footer.component.html',
  styleUrls: ['./dialog-footer.component.scss'],
})
export class DialogFooterComponent {
  @Input() public footer: DialogItem;
  @ViewChild('footerContainer', { read: ViewContainerRef }) container;
  public componentRef: ComponentRef<any>;

  constructor(private resolver: ComponentFactoryResolver, private cdRef: ChangeDetectorRef) {}
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    if (this.footer != null) {
      const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(
        this.footer.component
      );
      this.componentRef = this.container.createComponent(factory);
      this.cdRef.detectChanges();
    }
  }
  public createComponent() {}

  ngOnDestroy() {
    if (this.footer != null) {
      this.componentRef.destroy();
    }
  }
}
