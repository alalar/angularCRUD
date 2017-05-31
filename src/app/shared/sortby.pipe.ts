import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'sortby',
    pure: true
    })
export class SortByPipe implements PipeTransform {
  transform(values: any[], fieldname: string, ascendingOrder: boolean): any[] {
    if (values!=null) {
        return values.sort((a: any, b: any) => {
            let fieldAToCompare, fieldBToCompare;
            if (typeof a[fieldname]== "string") {
				fieldAToCompare = a[fieldname].toLowerCase();
				fieldBToCompare = b[fieldname].toLowerCase();
			} else {
				fieldAToCompare = a[fieldname];
				fieldBToCompare = b[fieldname];
			}            
            if (fieldAToCompare < fieldBToCompare) {
                return (ascendingOrder?-1:1);
            } else if (fieldAToCompare > fieldBToCompare) {
                return (ascendingOrder?1:-1);
            } else {
                return 0;
            }
            });
    } else {
        return null;
    }

        
  }
}