import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConnectableObservable, Observable } from 'rxjs';
import { map, publishReplay } from 'rxjs/operators';
import { Location } from 'src/app/shared/models';

/**
 * Building Service
 */
@Injectable()
export class BuildingService {
  private allBuildingsObservable: Observable<Location[]> | null = null;
  constructor(private http: HttpClient) {}

  public getByCity(city: string): Observable<Location[]> {
    return this.getAll().pipe(
      map((buildings) => {
        return buildings.filter((x) => {
          if (x.Description != null) {
            return x.Description.includes(city);
          }
          return false;
        });
      })
    );
  }

  public getByBuilding(building: string): Observable<Location | null> {
    return this.getAll().pipe(
      map((buildings) => {
        return buildings.find((x) => x.City.Building === building) || null;
      })
    );
  }

  public getAll(): Observable<Location[]> {
    if (this.allBuildingsObservable != null) {
      return this.allBuildingsObservable;
    }

    const observable = this.http.get<Location[]>('/api/branches').pipe(publishReplay());
    (observable as ConnectableObservable<Location[]>).connect();
    this.allBuildingsObservable = observable;
    return this.allBuildingsObservable;
  }
}
