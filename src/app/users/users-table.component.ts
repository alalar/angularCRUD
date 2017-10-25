import { Component,  ViewChild, OnInit} from '@angular/core';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import {Subscription} from "rxjs";
// Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

//import { Router } from '@angular/router';


import { User } from './shared/user'
import { UserService } from './user.service';
import { getLocalStorageUsers, saveLocalStorageUser, removeLocalStorageUser } from './shared/users-localstorage';
import { UserFormTableService }     from './user-form-table-communication.service';

import { ModalComponent } from '../shared/modal.component';


@Component({
  selector: 'user-table',
  templateUrl: './users-table.component.html'
})
export class UsersTableComponent implements OnInit {
  public users: Observable<User[]>;

  @ViewChild(ModalComponent)
  public readonly modal: ModalComponent;

  private subscription:Subscription;
  public showFilterBox:boolean=true;
 
  public sortedByFieldName:String="userId";
  public ascendingOrder:boolean=true;

  constructor(private userService: UserService, 
            //private router: Router, 
            private userFormTableService: UserFormTableService) {
      userFormTableService.updatedItemInList$.subscribe(
        (isDone:boolean) => {
          if (isDone) {
            this.ngOnInit();
          }
        }); 
    }

  ngOnInit():void {
    this.users = null;
    this.userService.getUsers().subscribe((users:User[]) => {
          this.users = getLocalStorageUsers(users)
    });
  } 


    sortingByColumn(fieldName:string) {
      if (this.sortedByFieldName==fieldName) {
        this.ascendingOrder=!this.ascendingOrder;
      } else {
        this.ascendingOrder=true;
      }
      this.sortedByFieldName=fieldName;
    }

    public showRemoveModalDlg(userToRemove:User){
       let infoTemplate= `
            Do you want to remove user <strong> ${userToRemove.username} </strong> ?
             <dl class="dl-horizontal">
                    <dt><span class="glyphicon glyphicon glyphicon-user" ></span></dt>
                    <dd>${userToRemove.name}</dd>
                    <dt><span class="glyphicon glyphicon glyphicon-map-marker" ></span></dt>
                    <dd>${userToRemove.address} , ${userToRemove.city}</dd>
                    <dt><span class="glyphicon glyphicon glyphicon-phone" ></span></dt>
                    <dd>${userToRemove.phone}</dd>
                    <dt><span>@</span></dt>
                    <dd>${userToRemove.email}</dd>
            </dl>`
        this.modal.show('Removing users',infoTemplate);
        this.subscription = this.modal.blnResult.subscribe((blnRemove:boolean) => {
            if (blnRemove) {
                 this.userService.delete(userToRemove.userId).subscribe(
                    (user:User) => {removeLocalStorageUser(userToRemove.userId);this.ngOnInit()},
                    (error:any) => {console.log(error)}
                  );
            }
            // unsubscribe is necessary such that the observable doesn't keep racking up listeners
            this.subscription.unsubscribe();
        });
    }

 
}