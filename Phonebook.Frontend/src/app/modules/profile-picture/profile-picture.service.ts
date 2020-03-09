import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentUserService } from 'src/app/services/api/current-user.service';
import { runtimeEnvironment } from 'src/environments/runtime-environment';

@Injectable({
  providedIn: 'root'
})
/**
 * Service for changing the User Picture
 */
export class ProfilePictureService {
  private readonly endpoint?: string = runtimeEnvironment.employeePicturesEndpoint;
  public reload: EventEmitter<string> = new EventEmitter();

  constructor(private httpClient: HttpClient, private currentUserService: CurrentUserService) {}

  /**
   * Upload the file as new User Picture of the currently authenticated User
   */
  public uploadUserPicture(file: File): Observable<any> {
    if (this.endpoint === undefined) {
      throw new Error(
        'The runtime variable "EMPLOYEE_PICTURES_ENDPOINT" is not defined. (You can define the variable in the docker container)'
      );
    }
    const formData: FormData = new FormData();
    formData.append('file', file);

    return new Observable<any>(observer => {
      this.currentUserService.getCurrentUserId().subscribe(
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
    if (this.endpoint === undefined) {
      throw new Error(
        'The runtime variable "EMPLOYEE_PICTURES_ENDPOINT" is not defined. (You can define the variable in the docker container)'
      );
    }
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
