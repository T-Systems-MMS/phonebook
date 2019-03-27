import { NgModule } from '@angular/core';
import { PersonService } from 'src/app/services/api/person.service';
import { RoomService } from 'src/app/services/api/room.service';
import { OrganigramService } from 'src/app/services/api/organigram.service';
import { BuildingService } from 'src/app/services/api/building.service';
import { CacheService } from 'src/app/services/api/cache/cache.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CacheInterceptor } from 'src/app/services/api/cache/cache.interceptor';
import { CurrentUserService } from 'src/app/services/api/current-user.service';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule
  ],
  providers: [
    CacheService,
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
    PersonService,
    RoomService,
    OrganigramService,
    BuildingService,
    CurrentUserService
  ]
})
export class ApiModule { }
