import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './home/user';

export class UserNotFound extends Error{}

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {

  // variable  privada de escritura que se comporta de tipo genérico que se inicializa en un array vacío
  private _users:BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  // variable pública solo de lectura para suscribirte que se comporta como un observable
  public users$:Observable<User[]> = this._users.asObservable();

  constructor() { }

  public getAll(): Observable<User[]>{
    // Se crea un nuevo Observable y se pasa una función que toma un 'observer' como argumento.
    return new Observable (observer =>{
      // Se utiliza setTimeout para retrasar la ejecución de un bloque de código.
      setTimeout(() => {
        var usuarios : User[] = [
          {id: 1, nombre:"Juan Antonio", apellidos:"García Gómez", edad: 46, fav:false},
          {id: 2, nombre:"Daniel", apellidos:"Luque Gallardo", edad: 19, fav: false},
          {id:3, nombre:"Antonio", apellidos:"García Guerrero", edad: 19, fav:true},
          {id: 4, nombre:"Julio", apellidos:"Granados Durán", edad: 19, fav:false},
          {id: 5, nombre:"Jorge", apellidos:"Sousa Guzmán", edad: 21, fav: true}
        ];
        this._users.next(usuarios);
        observer.next(usuarios);
        // Se indica que no habrá más emisiones de este Observable.
        observer.complete();
      },1000);
    });
  }

  public updateUsers(user:User):Observable<User>{
    return new Observable (observer =>{
      setTimeout(() => {
        var _users = [...this._users.value];
        var index = _users.findIndex(usu => usu.id == user.id);
        if (index<0) {
          observer.error(new UserNotFound);
        }else{
          _users[index]=user;
          observer.next(user);
          this._users.next(_users);
        }
        observer.complete();
      }, 500);
    });
  }

  public deleteUser(user:User):Observable<User>{
    return new Observable (observer =>{
      setTimeout(() => {
        var _users = [... this._users.value];
        var index = _users.findIndex(usu => usu.id == user.id);
        if(index < 0){
          observer.error(UserNotFound);
        }else{
          _users = [..._users.splice(0,index), ..._users.splice(index+1)];
          this._users.next(_users);
          observer.next(user);
        }
        observer.complete;
      }, 500);
    });
  }




}
