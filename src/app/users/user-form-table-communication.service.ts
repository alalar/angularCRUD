import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
@Injectable()
export class UserFormTableService {
  // Observable string sources
  private updatedItemInList = new Subject<boolean>();
  private editingItemInList = new Subject<number>();
  // Observable string streams
  updatedItemInList$ = this.updatedItemInList.asObservable();
  editingItemInList$ = this.editingItemInList.asObservable();
  // Service message commands
  updatedItem() {
    this.updatedItemInList.next(true);
  }
  editingItem(userId:number) {
    this.editingItemInList.next(userId);
  }
}
