import { NgModule } from '@angular/core';
//Angular Material
import {
    MatButtonModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatRippleModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatGridListModule,
    MatTabsModule,
    MatTreeModule,
    MatBottomSheetModule
} from '@angular/material';
import { ScrollingModule, ScrollDispatcher } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
    imports: [
        MatButtonModule,
        MatSnackBarModule,
        MatTooltipModule,
        MatSidenavModule,
        MatIconModule,
        MatToolbarModule,
        MatListModule,
        MatMenuModule,
        MatCardModule,
        MatTableModule,
        MatSortModule,
        MatRippleModule,
        MatDialogModule,
        MatSelectModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatChipsModule,
        MatGridListModule,
        MatTabsModule,
        MatTreeModule,
        MatBottomSheetModule,
        ScrollingModule,
        DragDropModule
    ],
    providers: [],
    exports: [
        MatButtonModule,
        MatSnackBarModule,
        MatTooltipModule,
        MatSidenavModule,
        MatIconModule,
        MatToolbarModule,
        MatListModule,
        MatMenuModule,
        MatCardModule,
        MatTableModule,
        MatSortModule,
        MatRippleModule,
        MatDialogModule,
        MatSelectModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatChipsModule,
        MatGridListModule,
        MatTabsModule,
        MatTreeModule,
        MatBottomSheetModule,
        ScrollingModule,
        DragDropModule
    ]
})
export class MaterialModule { }
