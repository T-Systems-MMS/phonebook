import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { runtimeEnvironment } from 'src/environments/runtime-environment';
import { CurrentUserService } from 'src/app/services/api/current-user.service';

@Injectable({
  providedIn: 'root'
})
/**
 * Service for changing the User Picture
 */
export class ProfilePictureService {
  private readonly endpoint: string = runtimeEnvironment.employeePicturesEndpoint;
  public reload: EventEmitter<string> = new EventEmitter();

  constructor(
    private httpClient: HttpClient,
    private currentUserService: CurrentUserService
  ) { }

  /**
   * Upload the file as new User Picture of the currently authenticated User
   */
  public uploadUserPicture(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return new Observable<any>(observer => {
      this.currentUserService.getCurrentUserId()
        .subscribe(
          userName => {
            this.httpClient
              .post(this.endpoint + '/' + userName, formData, {
                withCredentials: true
              })
              .subscribe(
                success => {
                  observer.next();
                  observer.complete();
                },
                error => {
                  observer.error(error);
                }
              );
          },
          error => {
            observer.error(error);
          }
        );
    });
  }

  public deleteUserPicture(): Observable<any> {
    return new Observable<any>(observer => {
      this.currentUserService.getCurrentUserId().subscribe(
        userName => {
          this.httpClient
            .delete(this.endpoint + '/' + userName, {
              withCredentials: true
            })
            .subscribe(
              success => {
                observer.next();
                observer.complete();
              },
              error => {
                observer.error(error);
              }
            );
        },
        error => {
          observer.error(error);
        }
      );
    });
  }
}
