import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/core/interfaces/user';
import { UserInfoFavClicked } from 'src/app/core/interfaces/user-info-fav-clicked';
import { UsersServiceService } from 'src/app/core/services/users-service.service';

@Component({
  selector: 'app-fav-info',
  templateUrl: './fav-info.component.html',
  styleUrls: ['./fav-info.component.scss'],
})
export class FavInfoComponent  implements OnInit {
  @Input() id!: number;
  public user?: User;

  @Output() onFavBorrado:EventEmitter<UserInfoFavClicked> = new EventEmitter <UserInfoFavClicked>();

  constructor(
    private userSercivio: UsersServiceService,
  ) {}

  ngOnInit() {
    this.userSercivio.getUser(this.id).subscribe(fa => this.user = fa);
  }

  onFavBorrar(event: any){
    this.onFavBorrado.emit({
      fav: false,
    });
    event.stopPropagation();
  }

}
