import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { User } from './shared/user';
@Injectable()
export class UserService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private usersUrl = 'api/users';  // URL to web api
  constructor(private http: Http) { }
  getUsers1(): Promise<User[]> {
    return this.http.get(this.usersUrl)
               .toPromise()
               .then(
                 response => 
                 { return response.json().data as User[]}
                 )
               .catch(this.handleError);
  }
  getUser1(id: number): Promise<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as User)
      .catch(this.handleError);
  }
  delete1(userId: number): Promise<void> {
    const url = `${this.usersUrl}/${userId}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
  getUsers(): User[]|any {
    return this.http.get(this.usersUrl)
               .map((res:any) => res.json().data as User[])
               .catch(this.handleError);
  }
  getUser(id: number): Observable<User> | any {
    //const url = `${this.usersUrl}/${id}`;
    const url = `${this.usersUrl}`;
    return this.http
      .get(url)
      .map((res:any) => res.json().data)
      .catch(this.handleError);
  }
  delete(userId: number):  Observable<User> | any {
    //const url = `${this.usersUrl}/${userId}`;
    const url = `${this.usersUrl}`;
    return this.http.post(url, {headers: this.headers})
      .map((res:any) => res.json().data)
      .catch(this.handleError);
  }
  save(user:User):Observable<User>|any {
    if (user.userId) {
      return this.update(user);
    } else {
      return this.create(user);
    }
  }
  create(user: User): Observable<User> | any {
    const url = `${this.usersUrl}/${user.userId}`;
    return this.http
      .post(url, JSON.stringify(user), {headers: this.headers})
      .map(res => {
          if (res.json()) 
              return res.json().data;
            else
              return user;
            })
      .catch(this.handleError);
  }
  update(user: User): Observable<User> | any {
    const url = `${this.usersUrl}/${user.userId}`;
    return this.http
      .post(url, JSON.stringify(user), {headers: this.headers})
      .map(res => {
          if (res.json()) 
              return res.json().data;
            else
              return user;
            })
      .catch(this.handleError);
  }
  private handleError (error: Response | any):Observable<User> {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.log(errMsg);
    return Observable.throw(errMsg);
    //return errMsg;
  }
}
