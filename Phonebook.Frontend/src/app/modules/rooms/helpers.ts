import { ParamMap } from '@angular/router';

export class RoomHelpers {
  public static getParamsAsArray(params: ParamMap, paramNames: string[]): string[] {
    const paramArray: string[] = [];
    paramNames.forEach(paramName => {
      const string = params.get(paramName);
      if (string != null) {
        paramArray.push(string);
      }
    });
    return paramArray;
  }

  public static generateUrlStringFromParamArray(paramArray: string[]): string {
    return '/rooms/' + paramArray.map(x => x.toString().replace('/', '%2F')).join('/');
  }
}
