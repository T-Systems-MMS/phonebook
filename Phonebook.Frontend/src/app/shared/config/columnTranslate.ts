import { Injectable } from '@angular/core';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { ColumnId } from 'src/app/shared/models/enumerables/ColumnId';

@Injectable({
  providedIn: 'root'
})
export class ColumnTranslate {
  constructor(private i18n: I18n) {}
  public getTranslation(columnId: ColumnId): string {
    switch (columnId) {
      case ColumnId.picture:
        return this.i18n({
          value: 'Picture',
          description: 'Title of Table Column "Picture"',
          id: 'ColumnTitlePicture',
          meaning: 'TableComponent'
        });
      case ColumnId.id:
        return this.i18n({
          value: 'Id',
          description: 'Title of Table Column "Id"',
          id: 'ColumnTitleId',
          meaning: 'TableComponent'
        });
      case ColumnId.fullname:
        return this.i18n({
          value: 'Name',
          description: 'Title of Table Column "Name"',
          id: 'ColumnTitleFullName',
          meaning: 'TableComponent'
        });
      case ColumnId.email:
        return this.i18n({
          value: 'Email',
          description: 'Title of Table Column "Email"',
          id: 'ColumnEmailName',
          meaning: 'TableComponent'
        });
      case ColumnId.phone:
        return this.i18n({
          value: 'Phone',
          description: 'Title of Table Column "Phone"',
          id: 'ColumnTitlePhone',
          meaning: 'TableComponent'
        });
      case ColumnId.mobile:
        return this.i18n({
          value: 'Mobile',
          description: 'Title of Table Column "Mobile"',
          id: 'ColumnTitleMobile',
          meaning: 'TableComponent'
        });
      case ColumnId.role:
        return this.i18n({
          value: 'Role',
          description: 'Title of Table Column "Role"',
          id: 'ColumnTitleRole',
          meaning: 'TableComponent'
        });
      case ColumnId.city:
        return this.i18n({
          value: 'City',
          description: 'Title of Table Column "City"',
          id: 'ColumnTitleCity',
          meaning: 'TableComponent'
        });
      case ColumnId.orgUnit:
        return this.i18n({
          value: 'Organization Unit',
          description: 'Title of Table Column "Organization Unit"',
          id: 'ColumnTitleOrgUnit',
          meaning: 'TableComponent'
        });
      case ColumnId.room:
        return this.i18n({
          value: 'Room',
          description: 'Title of Table Column "Room"',
          id: 'ColumnTitleRoom',
          meaning: 'TableComponent'
        });
      case ColumnId.building:
        return this.i18n({
          value: 'Building',
          description: 'Title of Table Column "Building"',
          id: 'ColumnTitleBuilding',
          meaning: 'TableComponent'
        });
      case ColumnId.costcenter:
        return this.i18n({
          value: 'Profitcenter',
          description: 'Title of Table Column "Profitcenter" once Costcenter',
          id: 'ColumnTitleCostcenter',
          meaning: 'TableComponent'
        });
      default:
        throw Error('Column not found.');
    }
  }
}
