---
layout: default
title: Translation Guide
parent: Frontend
grand_parent: Development Guides
nav_order: 500
---

# :currency_exchange: **Translation Guide**

The App should be available in different languages. This is the reason why we use [Internationalization of Angular](https://angular.io/guide/i18n). Read the Guide to get more Information about it.

For every English sentence or word the translation string is saved under a specific ID. If you call the ID the app will check which language is set and return the right language.

## **:hammer: How to use**

1. Use the Angular translation directive inside `.html` Files as described [here](https://angular.io/guide/i18n).
2. Use the Angular translation polyfill inside `.ts` Files as described [here](https://github.com/ngx-translate/i18n-polyfill)
3. When you are finished working run `npm run extract-i18n`. This will update the translation files located under `src\i18n`.
4. Translate the files.
5. Test if everything is ok by running `npm run start:$lang`, for example: `npm run start:en` or `npm run start:de`.

## :triangular_flag_on_post: **Predefined Message-ID's**

Apart from all custom Translations, some strings are reoccurring. Please note them down here, or use them:

For **General Messages** (with Action) use following IDs:

| @@ID                      |                              value                               |
| ------------------------- | :--------------------------------------------------------------: |
| GeneralErrorMessage       |             Something went wrong. Please try again.              |
| GeneralErrorMessageCopy   | Couldn't copy to the clipboard, something went wrong. Try again. |
| GeneralSuccessMessageCopy |                       Copied to clipboard!                       |
| GeneralResetButton        |                              Reset                               |
| GeneralNotYetImplemented  |                    Sry, not yet implemented!                     |
| GeneralCancelButton       |                              Cancel                              |
| GeneralShowOnMapButton    |                       Show on Google-Maps                        |
| GeneralUndoButton         |                               Undo                               |

For **Language** use:

| @@ID                   |  value  |
| ---------------------- | :-----: |
| GeneralLanguageEnglish | English |
| GeneralLanguageGerman  | German  |

For **Columns** use:

| @@ID                  |       value       |
| --------------------- | :---------------: |
| ColumnTitlePicture    |      Picture      |
| ColumnTitleId         |        Id         |
| ColumnTitleName       |       Name        |
| ColumnTitleEmail      |       Email       |
| ColumnTitlePhone      |       Phone       |
| ColumnTitleMobile     |      Mobile       |
| ColumnTitleRole       |       Role        |
| ColumnTitleCity       |       City        |
| ColumnTitleOrgUnit    | Organization Unit |
| ColumnTitleRoom       |       Room        |
| ColumnTitleBuilding   |     Building      |
| ColumnTitleCostcenter |   Profitcenter    |


For **Datapoints** (Labels) use:

| @@ID                       |       value       |
| -------------------------- | :---------------: |
| DataPersonFax              |        Fax        |
| DataPersonType             |       Type        |
| DataPersonDirectSupervisor | Direct Supervisor |
| DataPersonTeamAssistant    |  Team Assistants  |
| DataPersonFloor            |       Floor       |
| DataPersonFloorPlural      |      Floors       |
| DataLocationContactPerson  |  Contact Person   |
| DataLocationAddress        |      Address      |
| DataLocationContact        |      Contact      |
