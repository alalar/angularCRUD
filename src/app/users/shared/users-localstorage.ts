import { User } from './user'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of'

function getUsersFromLocalStorage():User[] {
    try {
         if (localStorage.getItem("users")) {
            return JSON.parse(localStorage.getItem("users"));
        }
    } catch(e) {
        return null;
    }
}
function setUsersToLocalStorage(users:User[]) {
    try {
         localStorage.setItem("users", JSON.stringify(users))
    } catch(e) {
    }
}
function getHighestId(users:User[]):number {
    return Math.max(...users.map((user:User) => user.userId));
}

export function getLocalStorageUsers(users:User[]):Observable<User[]> {
    let localUsers:User[] = getUsersFromLocalStorage();
    if (localUsers!=null) {
         return Observable.of(localUsers);
    } else {
            setUsersToLocalStorage(users);
        return Observable.of(users);
    }
}

export function saveLocalStorageUser(user:User) {
    let localUsers:User[] = getUsersFromLocalStorage();
    if (localUsers!=null) {
        if (user.userId!=null) {
            let userIndex = localUsers.map(user => user.userId).indexOf(user.userId);
            localUsers[userIndex] = user;
        } else {
           user.userId = getHighestId(localUsers) + 1;
           localUsers.push(user);
        }
        setUsersToLocalStorage(localUsers);
    }
}

export function removeLocalStorageUser(userId:number) {
    let localUsers:User[] = getUsersFromLocalStorage();
    if (localUsers!=null) {
        if (userId!=null) {
            let userIndex = localUsers.map(user => user.userId).indexOf(userId);
            if (userIndex>-1) {
                localUsers.splice(userIndex,1);
                setUsersToLocalStorage(localUsers);
            }
        }
    }  
}

export function readFromLocalStorageUser(userId:number):User {
    if (localStorage.getItem("users")) {
        let currentUsers:User[] = JSON.parse(localStorage.getItem("users"));
        return currentUsers.filter((user:User) =>  user.userId === userId)[0];
    }
    return null;
}