import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { RuntimeEnvironmentInterface } from 'src/environments/EnvironmentInterfaces';
import { runtimeEnvironment } from 'src/environments/runtime-environment';

@Component({
  selector: 'app-feedback-drawer-sheet',
  templateUrl: './feedback-drawer-sheet.component.html',
  styleUrls: ['./feedback-drawer-sheet.component.scss']
})
export class FeedbackDrawerSheetComponent implements OnInit {
  public runtimeEnvironment: RuntimeEnvironmentInterface = runtimeEnvironment;
  constructor(private bottomSheetRef: MatBottomSheetRef<FeedbackDrawerSheetComponent>) {}

  public ngOnInit() {}

  public closeBottomSheet(): void {
    this.bottomSheetRef.dismiss();
  }
}
