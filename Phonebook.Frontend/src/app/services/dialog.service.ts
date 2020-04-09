import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogsComponent } from 'src/app/dialogs/dialogs.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private httpClient: HttpClient) {}
  public displayDialog(item: string) {
    let text: string;

    switch (item) {
      case 'release-notes':
        this.httpClient
          .get('changelog.md', {
            responseType: 'text',
          })
          .subscribe((success) => {
            import('marked').then((marked) => {
              text = marked.parse(success);
              this.dialog.open(DialogsComponent, {
                data: {
                  title: "We've updated to a newer Version!",
                  content: text,
                },
                maxHeight: '90vh',
                maxWidth: '90vh',
              });
            });
          });
        break;
    }
  }
}
