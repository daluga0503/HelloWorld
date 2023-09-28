import { Component, Input, OnInit } from '@angular/core';
import { User } from '../user';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent  implements OnInit {
  //input de tipo usuario
  @Input() usuario?: User;
  

  constructor() {}

  onFavClick(event: MouseEvent): void {
    event.stopPropagation(); // Evita que el evento se propague a elementos padre.
    if (this.usuario) { //comprueba que haya usuario
      this.usuario.fav = !this.usuario.fav; //cambia de true a false y viceversa la propiedad fav
    }
  }

  ngOnInit() {}

}

