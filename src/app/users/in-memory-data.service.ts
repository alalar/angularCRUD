import { InMemoryDbService } from 'angular-in-memory-web-api';
import {User} from './shared/user'

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let users = [
      new User(1,"PLewis","Peter Lewis","Brown Street 23",0,0,"London",234234234,"PLewis@hotmail.com"),
      new User(2,"MJames","Mary James","Green Street 5",0,0,"London",653148596,"MJames@hotmail.com"),
      new User(3,"BJohan","Boris Joan","Yellow Street 51",0,0,"Moscow",668524152,"BJohan@hotmail.com"),
      new User(4,"DBirchy","Doris Birchy","Blue Street 5",0,0,"Paris",669897452,"DBirchy@hotmail.com"),
      new User(5,"PDechaum","Pauline Dechaum","Chocolate Street 5",0,0,"Paris",977415263,"PDechaum@hotmail.com"),
      new User(6,"GTomasi","Gianna Tomasi","Caesar Street 5",0,0,"Rome",963254178,"GTomasi@hotmail.com")
    ];
    return {users};
  }
}