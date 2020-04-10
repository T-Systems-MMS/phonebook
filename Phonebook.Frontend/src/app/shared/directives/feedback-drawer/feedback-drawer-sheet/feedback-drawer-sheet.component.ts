import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { RuntimeEnvironmentInterface } from 'src/environments/EnvironmentInterfaces';
import { runtimeEnvironment } from 'src/environments/runtime-environment';
import { DialogsComponent } from 'src/app/dialogs/dialogs.component';

@Component({
  selector: 'app-feedback-drawer-sheet',
  templateUrl: './feedback-drawer-sheet.component.html',
  styleUrls: ['./feedback-drawer-sheet.component.scss'],
})
export class FeedbackDrawerSheetComponent implements OnInit {
  public runtimeEnvironment: RuntimeEnvironmentInterface = runtimeEnvironment;
  constructor(private dialogsComponent: DialogsComponent) {}

  public ngOnInit() {}

  close() {
    this.dialogsComponent.close();
  }
}
