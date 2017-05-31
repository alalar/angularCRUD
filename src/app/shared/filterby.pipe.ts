import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filterby',
    pure: true
    })
export class FilterByPipe implements PipeTransform {
  transform(values: any, queryString: string): any {
   
    if (values!=null) {
        return values.filter((user:any)=> Object.keys(user).map(key=>user[key]).some(x => new RegExp(queryString,'i').test(x)));
    } else {
        return null;
    }
   

        
  }
}