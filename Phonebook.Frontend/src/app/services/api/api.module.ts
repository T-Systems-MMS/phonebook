import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BuildingService } from 'src/app/services/api/building.service';
import { CurrentUserService } from 'src/app/services/api/current-user.service';
import { OrganigramService } from 'src/app/services/api/organigram.service';
import { PersonService } from 'src/app/services/api/person.service';
import { RoomService } from 'src/app/services/api/room.service';

@NgModule({
  declarations: [],
  imports: [HttpClientModule],
  providers: [PersonService, RoomService, OrganigramService, BuildingService, CurrentUserService]
})
export class ApiModule {}
