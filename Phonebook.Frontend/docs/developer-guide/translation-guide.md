# How To

1. Use the Angular translation directive inside `.html` Files as described [here](https://angular.io/guide/i18n)
2. Use the Angular translation polyfill inside `.ts` Files as described [here](https://github.com/ngx-translate/i18n-polyfill)
3. When you are finished working run `npm run extract-i18n`. This will update the translation files located under `src\i18n`.
4. Translate the files.
5. Test if everything ok by running `npm run start:$lang`, for example: `npm run start:en` or `npm run start:de`.

# Name Schema

Apart from all custom Translations, some strings are reoccurring. Please note them down here, or use them:

For General Messages (with Action) use following IDs:

| @@ID                      |                     value                     |
| ------------------------- | :-------------------------------------------: |
| GeneralErrorMessage       |    Something went wrong. Please try again.    |
| GeneralErrorMessageCopy   | Couldn't copy to the clipboard, something went wrong. Try again. |
| GeneralSuccessMessageCopy |             Copied to clipboard!              |
| GeneralResetButton        |                     Reset                     |
| GeneralNotYetImplemented  |           Sry, not yet implemented!           |
| GeneralCancelButton       |                   Cancel                      |
| GeneralShowOnMapButton    |             Show on Google-Maps               |
| GeneralUndoButton         |                     Undo                      |

For Language:
| @@ID                      |                     value                     |
| ------------------------- | :-------------------------------------------: |
| GeneralLanguageEnglish   | English |
| GeneralLanguageGerman       |    German    |

For Columns:
| @@ID                      |                     value                     |
| ------------------------- | :-------------------------------------------: |
| ColumnTitlePicture        |                    Picture                    |
| ColumnTitleId             |                      Id                       |
| ColumnTitleName           |                     Name                      |
| ColumnTitleEmail          |                     Email                     |
| ColumnTitlePhone          |                     Phone                     |
| ColumnTitleMobile         |                    Mobile                     |
| ColumnTitleRole           |                     Role                      |
| ColumnTitleCity           |                     City                      |
| ColumnTitleOrgUnit        |               Organization Unit               |
| ColumnTitleRoom           |                     Room                      |
| ColumnTitleBuilding       |                   Building                    |
| ColumnTitleCostcenter     |                  Costcenter                   |


For Datapoints (Labels):
| @@ID                      |                     value                     |
| ------------------------- | :-------------------------------------------: |
| DataPersonFax             |                    Fax                    |
| DataPersonType            |                    Type                    |
| DataPersonDirectSupervisor      |           Direct Supervisor         | 
| DataPersonTeamAssistant   | Team Assistants |
| DataPersonFloor | Floor | 
| DataPersonFloorPlural | Floors |
| DataLocationContactPerson | Contact Person | 
| DataLocationAddress | Address |
| DataLocationContact | Contact |
