import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { runtimeEnvironment } from 'src/environments/runtime-environment';

@Injectable()
export class FloorplanService {
  constructor(private httpClient: HttpClient, private location: Location) {}

  public get(floorplan: string): Observable<string> {
    return this.httpClient.get(`${runtimeEnvironment.assetsEndpoint}/roomplan/${floorplan}.svg`, {
      responseType: 'text'
    });
  }
}
