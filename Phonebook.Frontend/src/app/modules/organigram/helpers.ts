import { ParamMap } from '@angular/router';

export class OrganigramHelpers {
  public static getParamsAsArray(params: ParamMap, paramNames: string[]): string[] {
    const paramArray: string[] = [];
    paramNames.forEach((paramName) => {
      const string = params.get(paramName);
      if (string != null) {
        paramArray.push(string);
      }
    });
    return paramArray;
  }
}
