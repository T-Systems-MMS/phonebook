import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganigramRoutingModule } from 'src/app/modules/organigram/organigram-routing.module';
import { OrganigramComponent } from 'src/app/modules/organigram/pages/organigram/organigram.component';
import { OrganigramNodeComponent } from 'src/app/modules/organigram/components/organigram-node/organigram-node.component';
import { MatCardModule, MatDividerModule, MatIconModule, MatButtonModule, MatTooltipModule } from '@angular/material';
import { ClipboardModule } from 'ngx-clipboard';

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
