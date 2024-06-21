import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { OrganigramNodeComponent } from 'src/app/modules/organigram/components/organigram-node/organigram-node.component';
import { OrganigramRoutingModule } from 'src/app/modules/organigram/organigram-routing.module';
import { OrganigramComponent } from 'src/app/modules/organigram/pages/organigram/organigram.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { OrganigramOverviewComponent } from 'src/app/modules/organigram/overview/organigram-overview.component';
import { Node1Component } from 'src/app/modules/organigram/node1/node1.component';
import { AddressModule } from 'src/app/shared/components/address/address.module';

@NgModule({
  imports: [
    CommonModule,
    OrganigramRoutingModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    ClipboardModule,
    MatButtonModule,
    MatTooltipModule,
    MaterialModule,
    AddressModule,
  ],
  declarations: [
    OrganigramComponent,
    OrganigramNodeComponent,
    OrganigramOverviewComponent,
    Node1Component,
  ],
  exports: [],
})
export class OrganigramModule {}
