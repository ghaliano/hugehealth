import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  jsonToQueryString(obj) {
    return Object.keys(obj).filter((key) => obj[key] != undefined && obj[key] != '').reduce((str, key, i) => {
      let delimiter: string, val;
      delimiter = (i === 0) ? '?' : '&';
      if (Array.isArray(obj[key])) {
        key = encodeURIComponent(key);
        let arrayVar = obj[key].reduce((str, item) => {
          val = item;
          return [str, key + "[]", '=', val, '&'].join('');
        }, '');
        return [str, delimiter, arrayVar].join('');
      } else {
        key = encodeURIComponent(key);
        val = obj[key];
        return [str, delimiter, key, '=', val].join('');
      }
    }, '');

  }
}
