import { Pipe, PipeTransform } from '@angular/core';
import { Fav } from 'src/app/core/interfaces/fav';
import { User } from 'src/app/core/interfaces/user';


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
