import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';
//import { AppRoutingModule } from './app-routing.module';
//import { RouterModule, Routes } from '@angular/router';
// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './users/in-memory-data.service';

import { AppComponent }  from './app.component';
import { PageNotFoundComponent }  from './not-found.component';
import { UserMainComponent } from './users/user-main.component';
import { UserFormComponent } from './users/user-form.component';
import { UsersTableComponent } from './users/users-table.component';
import { UserService }          from './users/user.service';
import { UserFormTableService }     from './users/user-form-table-communication.service';

import { FilterByPipe } from './shared/filterby.pipe'
import { SortByPipe } from './shared/sortby.pipe'
import { ModalComponent } from './shared/modal.component';
/*
const appRoutes: Routes = [
  { path: 'users', component: UserMainComponent },
  { path: 'user/:id',      component: UserMainComponent },
  { path: '',
    redirectTo: '/users',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];
*/

@NgModule({
  imports:      [
    BrowserModule,
    ReactiveFormsModule, 
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService,{ delay: 1000 }),
    //RouterModule.forRoot(appRoutes)
    //AppRoutingModule
  ],
  declarations: [ 
      AppComponent, 
      UserMainComponent,
      UserFormComponent,
      UsersTableComponent,
      PageNotFoundComponent,
      FilterByPipe,
      SortByPipe,
      ModalComponent ],
  providers: [ 
      UserService,
      UserFormTableService ],      
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
