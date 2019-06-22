import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganigramRoutingModule } from 'src/app/modules/organigram/organigram-routing.module';
import { OrganigramComponent } from 'src/app/modules/organigram/pages/organigram/organigram.component';
import { OrganigramNodeComponent } from 'src/app/modules/organigram/components/organigram-node/organigram-node.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
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
