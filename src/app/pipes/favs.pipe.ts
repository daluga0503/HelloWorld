import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../interfaces/user';
import { Fav } from '../interfaces/fav';

@Pipe({
  name: 'favsPipe'
})
export class FavsPipePipe implements PipeTransform {

  transform(user: User[] | null , favs: Fav[] | null): User[]  {
    var _users: User[] = [...user ?? [] ];
    if(favs){
      _users = _users.map (user =>{
        return{
          id: user.id,
          nombre: user.nombre,
          apellidos: user.apellidos,
          edad: user.edad,
          fav: favs?.reduce((prev , fav) => prev || fav.userId == user.id, false)
        }
      });
    }
    return _users;
  }
}
