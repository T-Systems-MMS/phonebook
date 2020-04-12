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

@NgModule({
  imports: [
    CommonModule,
    OrganigramRoutingModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    ClipboardModule,
    MatButtonModule,
    MatTooltipModule
  ],
  declarations: [OrganigramComponent, OrganigramNodeComponent],
  exports: []
})
export class OrganigramModule {}
