import { HttpClient } from '@angular/common/http';
//tmb se hace el imports del httpClientModule en el app.nodule.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../interfaces/user';
import { environment } from 'src/environments/environment';

export class UserNotFound extends Error{}

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {
  id:number=0;
  // variable  privada de escritura que se comporta de tipo genérico que se inicializa en un array vacío
  private _users:BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  // variable pública solo de lectura para suscribirte que se comporta como un observable
  public users$:Observable<User[]> = this._users.asObservable();

  constructor(
    private http:HttpClient
  ) { }

  /*
  public addUser(user:User):Observable<User>{
    return new Observable<User>(observer=>{
      setTimeout(() => {
        var _users = [...this._users.value];
        user.id = ++this.id;
        _users.push(user);
        this._users.next(_users);
        observer.next(user);
      }, 1000);
    })
  }
  */

  public addUser(user:User):Observable<User>{
    var _user:any = {
      name: user.nombre,
      surname: user.apellidos,
      age: user.edad
    }

    return this.http.post<User>(environment.apiUrl+"/users",_user).pipe(tap(_=>{
      this.getAll().subscribe();
    }))
  }

  /*
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
        this.id=5;
        this._users.next(usuarios);
        observer.next(usuarios);
        // Se indica que no habrá más emisiones de este Observable.
        observer.complete();
      },1000);
    });
  }
  */


  public query(q:string):Observable<User[]>{
    // Si coincide el tipo de datos que recibo con mi interfaz
    return this.http.get<User[]>(environment.apiUrl+'/users?q='+q);
  }

  public getAll():Observable<User[]>{
    // Si coincide el tipo de datos que recibo con mi interfaz
    return this.http.get<User[]>(environment.apiUrl+'/users').pipe(tap((users:any[])=>{
      this._users.next(users);}));
    /*
    //Si tenemos que hacer un mapeo
    return this.http.get<User[]>(environment.apiUrl+'/users').pipe(map((users:any[])=>{
      return users.map((_user:any)=>{
        return {
          id:_user.id,
          name: _user.name,
          surname: _user.surname,
          age: _user.age
        }
      }
    )}));
    */
    }



  /*
  public getUser(uid:number): Observable<User>{
    return new Observable (observer =>{
      setTimeout (()=>{
        let user = this._users.value.find(u => u.id == uid);
        if (user) {
          observer.next(user);
        }else{
          observer.error("Usuario no encontrado");
        }
        observer.complete();
      }, 1000);
    })
  }
  */

  public getUser(id:number):Observable<User>{
    return this.http.get<User>(environment.apiUrl+`/users/${id}`);
  }


  /*
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
  */

  public updateUsers(user:User):Observable<User>{
    
    return new Observable<User>(obs=>{
      this.http.patch<User>(environment.apiUrl+`/users/${user.id}`,user).subscribe(_=>{
          this.getAll().subscribe(_=>{
            this.getUser(user.id).subscribe(_user=>{
              obs.next(_user);
            })
          })
      })
    });
  }


    /*
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
  */

  public deleteUser(user:User):Observable<User>{
    return new Observable<User>(obs=>{
      this.http.delete<User>(environment.apiUrl+`/users/${user.id}`).subscribe(_=>{
          this.getAll().subscribe(_=>{
            obs.next(user);
          })})});
        }

        public deleteAll():Observable<void>{
          return new Observable(observer=>{
            setTimeout(() => {
              this._users.next([]);
              observer.next();
              observer.complete();  
            }, 1000);
          });
        }
}
