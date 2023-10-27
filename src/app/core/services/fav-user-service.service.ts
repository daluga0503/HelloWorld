import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Fav } from '../interfaces/fav';
import { UserNotFound } from './users-service.service';




@Injectable({
  providedIn: 'root'
})
export class FavUserServiceService {
  private _favs: BehaviorSubject<Fav[]> = new BehaviorSubject<Fav[]>([]);
  public favs$: Observable<Fav[]> = this._favs.asObservable();


  constructor() { 

  }
  /*
  public getAll(): Observable<Fav[]>{
    return new Observable (observer =>{
      setTimeout(() => {
        let _favs: Fav[] = [
          {userId: 1},
          {userId: 2},
          {userId: 4},
      ];
      this._favs.next(_favs);
      observer.next(_favs);
      observer.complete();
      }, 1000);
    });
  }
  */

  public getAll():Observable <Fav[]>{
    return new Observable (observer =>{
      setTimeout (()=>{
        let _favs: Fav[] = [];
        this._favs.next(_favs);
        observer.next(_favs);
        observer.complete();
      });
    });
  }
  
  /*
  public addFav(uid:number): Observable<Fav>{
    return new Observable (observer => {
      setTimeout(() => {
        let _favs = [...this._favs.value];
        let _fav = {userId:uid};
        _favs.push(_fav);
        this._favs.next(_favs);
        observer.next(_fav); 
        observer.complete();
      }, 1000);
    });
  }
  */

  public addFav(uid:number):Observable <Fav>{
    return new Observable (observer =>{
      setTimeout (()=>{
        let _favs = [...this._favs.value];
        let _fav = {userId:uid};
        _favs.push(_fav);
        this._favs.next(_favs);
        observer.next(_fav);
        observer.complete();
      })
    })
  }


  /*
  public deleteFav(uid:number):Observable<Fav>{
    var _favs = [...this._favs.value];
    return new Observable(observer=>{
      setTimeout((() => {
        var index = _favs.findIndex(f=>f.userId==uid);
        if(index<0)
          observer.error(new UserNotFound());
        else{
          _favs = [..._favs.slice(0,index),..._favs.slice(index+1)];
          this._favs.next(_favs);
          observer.next({userId:uid});
        }
        observer.complete();
      }).bind(this), 500);
    });
  }
  */

public deleteFav(uid:number): Observable <Fav> {
  return new Observable (observer =>{
    setTimeout (()=>{
      let _favs=[...this._favs.value];
      var index = _favs.findIndex(u => u.userId == uid);
      if (index<0) {
        observer.error("Usuario no encontrado");
      }else{
        _favs = [..._favs.slice(0,index),..._favs.slice(index+1)];
        this._favs.next(_favs);
        observer.next({userId: uid});
      }
      observer.complete();
    })
  })
}

  /*
  public deleteAll(): Observable<void>{
    return new Observable(observer =>{
      setTimeout(() => {
        this._favs.next([]);
        observer.next();
        observer.complete();
      }, 1000);
    });
  }
  */

  public deleteAll(): Observable <void>{
    return new Observable (observer =>{
      setTimeout (()=>{
        this._favs.next([]);
        observer.next();
        observer.complete();
      })
    })
  }

}
