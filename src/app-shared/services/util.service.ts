import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';

@Injectable()
export class UtilService {
  constructor() {}
  filter(item: any, array: any[]): any[] {
    if (!array) return array;
    if (!item || typeof item === 'object') {
      return array;
    }
    return array.filter(option => {
      return option.text.toLowerCase().indexOf(item.toLowerCase()) !== -1;
    });
  }
 
  getObservable(object: any): Observable<any> {
    return new Observable(observable => {
      observable.next(object);
      observable.complete();
      
    });
  }
  
  dynamicSort(property, sortOrder) {
    return function(a, b) {
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }

  
  download(response: any, fileName: string) {
    let blob = new Blob([response], { type: 'attachment' });
    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, fileName);
    } else {
      var link = document.createElement('a');
      link.setAttribute('type', 'hidden');
      link.download = fileName;
      link.href = window.URL.createObjectURL(blob);
      document.body.appendChild(link);
      link.click();
    }
  }
  getInternetExplorerVersion() {
    var rv = -1;
    if (navigator.appName == 'Microsoft Internet Explorer') {
      var ua = navigator.userAgent;
      var re = new RegExp('MSIE ([0-9]{1,}[.0-9]{0,})');
      if (re.exec(ua) != null) rv = parseFloat(RegExp.$1);
    } else if (navigator.appName == 'Netscape') {
      var ua = navigator.userAgent;
      var re = new RegExp('Trident/.*rv:([0-9]{1,}[.0-9]{0,})');
      if (re.exec(ua) != null) rv = parseFloat(RegExp.$1);
    }
    return rv;
  }
  getCurrentDateTime() {
    let months = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
    let today = new Date();
    let dd = ("00" + today.getDate()).slice(-2);
    let mm = months[today.getMonth()];
    let yyyy = today.getFullYear();
    let hh = ("00" + today.getHours()).slice(-2);
    let min = ("00" + today.getMinutes()).slice(-2);
    let ss = ("00" + today.getSeconds()).slice(-2);
    return dd + '-' + mm + '-' + yyyy + ' ' + hh + '-' + min + '-' + ss;
  }
  
}
