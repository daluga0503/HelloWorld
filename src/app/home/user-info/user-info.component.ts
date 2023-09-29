import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../user';
import { UserInfoFavClicked } from '../user-info-fav-clicked';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent  implements OnInit {
  //input de tipo usuario
  @Input() usuario?: User;

  @Output() onFavClicked:EventEmitter<UserInfoFavClicked> = new EventEmitter<UserInfoFavClicked>();
  

  constructor() {}
  /*
  onFavClick(event: MouseEvent): void {
    event.stopPropagation(); // Evita que el evento se propague a elementos padre.
    if (this.usuario) { //comprueba que haya usuario
      this.usuario.fav = !this.usuario.fav; //cambia de true a false y viceversa la propiedad fav
    }
  }
  */

  onFavClick(event:any){
    this.onFavClicked.emit({
      fav:!(this.usuario?.fav??false) //this.usuario?.fav es nulo y luego negando ese valor. 
                                      //Si this.usuario?.fav es nulo, devuelve true;
                                      // si no es nulo, devuelve false
    });
    event.stopPropagation();
  }


  ngOnInit() {}

}

