import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { combineLatest, ConnectableObservable, Observable, of } from 'rxjs';
import { catchError, map, publishReplay, startWith } from 'rxjs/operators';
import { Environment } from 'src/environments/EnvironmentInterfaces';
import { runtimeEnvironment } from 'src/environments/runtime-environment';

@Injectable()
export class FeatureFlagService {
  private CACHED_FLAGS: Observable<{ [flag: string]: number }>;
  private flagOverwrites: { [flag: string]: boolean } = {
    firstApril: FeatureFlagService.isFirstApril(new Date())
  };
  private flagOverwriteEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor(private httpClient: HttpClient, private location: Location) {}

  /**
   * Returns the Feature Flags.
   * This Functions gets cached if called multiple times.
   */
  private getFlags(): Observable<{ [flag: string]: number }> {
    if (this.CACHED_FLAGS != null) {
      return this.CACHED_FLAGS;
    }
    const url = this.location.prepareExternalUrl('assets/defaultFeatureFlags.json');
    const observable = this.httpClient
      .get<{ [flag: string]: number }>(url)
      .pipe(publishReplay()) as ConnectableObservable<{ [flag: string]: number }>;
    observable.connect();
    this.CACHED_FLAGS = observable;
    return observable;
  }

  /**
   * Emits a boolean showing if the feature is enabled (true) or disabled (false)
   * @param flag The name of the Flag specfied in the FeatureFlags.json
   */
  public get(flag: string): Observable<boolean> {
    return combineLatest(this.getFlags(), this.flagOverwriteEmitter.pipe(startWith(0))).pipe(
      map(([flags, emitter]) => {
        return this.isEnabled(flag, flags[flag]);
      }),
      catchError(error => {
        return of(false);
      })
    );
  }

  /**
   * Logic for determining if feature should be enabled
   * @param name The Feature Flag name
   * @param value The Feature Flag value (-1-100)
   */
  private isEnabled(name: string, value: number | null): boolean {
    if (this.flagOverwrites[name] !== undefined) {
      return this.flagOverwrites[name];
    }
    if (value === null) {
      return false;
    }
    // Flags with -1 are disabled
    if (value < 0) {
      return false;
    }
    // Flags with 0 are disabled by default, but can be enabled by the user
    if (value === 0) {
      if (runtimeEnvironment.environment === Environment.production) {
        return false;
      } else {
        return true;
      }
    }
    // Flags with 100 are enabled
    if (value === 100) {
      return true;
    }
    // Else 1-99 are randomly activated according to the percentile.
    return this.randomBoolean(value);
  }

  /**
   * Return All Feature Flags that the User can Set but are disabled by default (in Production)
   */
  public getAllDefaultDisabled(): Observable<{ name: string; value: boolean }[]> {
    return this.getFlags().pipe(
      map(flags => {
        const returnFlags: { name: string; value: boolean }[] = [];
        Object.keys(flags).forEach(flag => {
          if (flags[flag] === 0) {
            returnFlags.push({ name: flag, value: this.isEnabled(flag, flags[flag]) });
          }
        });
        return returnFlags;
      })
    );
  }

  /**
   *
   * @param flag The name of the Flag specified in the FeatureFlags.json
   * @param enabled Set if the feature is enabled (true) or disabled (false)
   */
  public set(flag: string, enabled: boolean) {
    this.flagOverwrites[flag] = enabled;
    this.flagOverwriteEmitter.emit();
  }

  private randomBoolean(percentage: number): boolean {
    return Math.random() >= percentage / 100;
  }

  public static isFirstApril(date: Date): boolean {
    const firstApril = new Date('2019-04-01T00:00:00');
   // return date.getDate() == firstApril.getDate() && date.getMonth() == firstApril.getMonth();
  return true;
  }
}
