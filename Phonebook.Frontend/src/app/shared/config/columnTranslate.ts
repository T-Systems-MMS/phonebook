import { Injectable } from '@angular/core';

import { ColumnId } from 'src/app/shared/models/enumerables/ColumnId';

@Injectable({
  providedIn: 'root'
})
export class ColumnTranslate {
  constructor() {}
  public getTranslation(columnId: ColumnId): string {
    /*
     * TODO: Localization
     * TODO: Try of it works with new angular localization
     * workaround for ngx translate
     * necassary because the generated translations are wrong
     * They insert a new line after some strings and thus a space in the translated version of the string
     * E.G. What it should look like:
     *  <source>Address</source><target state="final">Address</target>
     * looks like:
     *   <source>
     *     Buildings
     *   </source><target state="final">
     *     Buildings
     *   </target>
     *
     * IssueLink: https://github.com/ngx-translate/i18n-polyfill/issues/63
     */
    return this.getInternalTranslation(columnId).trim();
  }
  private getInternalTranslation(columnId: ColumnId): string {
    switch (columnId) {
      case ColumnId.picture:
        return $localize`:TableComponent|Title of Table Column "Picture"@@ColumnTitlePicture:Picture`;
      case ColumnId.id:
        return $localize`:TableComponent|Title of Table Column "Id"@@ColumnTitleId:Id`;
      case ColumnId.fullname:
        return $localize`:TableComponent|Title of Table Column "Name"@@ColumnTitleFullName:Name`;
      case ColumnId.email:
        return $localize`:TableComponent|Title of Table Column "Email"@@ColumnEmailName:Email`;
      case ColumnId.phone:
        return $localize`:TableComponent|Title of Table Column "Phone"@@ColumnTitlePhone:Phone`;
      case ColumnId.mobile:
        return $localize`:TableComponent|Title of Table Column "Mobile"@@ColumnTitleMobile:Mobile`;
      case ColumnId.role:
        return $localize`:TableComponent|Title of Table Column "Role"@@ColumnTitleRole:Role`;
      case ColumnId.city:
        return $localize`:TableComponent|Title of Table Column "City"@@ColumnTitleCity:City`;
      case ColumnId.orgUnit:
        return $localize`:TableComponent|Title of Table Column "Organization Unit"@@ColumnTitleOrgUnit:Organization Unit`;
      case ColumnId.room:
        return $localize`:TableComponent|Title of Table Column "Room"@@ColumnTitleRoom:Room`;
      case ColumnId.building:
        return $localize`:TableComponent|Title of Table Column "Building"@@ColumnTitleBuilding:Building`;
      case ColumnId.costcenter:
        return $localize`:TableComponent|Title of Table Column "Profitcenter" once Costcenter@@ColumnTitleCostcenter:Profitcenter`;
      case ColumnId.status:
        return $localize`:TableComponent|Title of Table Column "Status"@@DataPersonStatus:Status`;
      default:
        throw Error('Column not found.');
    }
  }
}
