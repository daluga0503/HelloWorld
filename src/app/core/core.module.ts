import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavUserServiceService } from './services/fav-user-service.service';
import { UsersServiceService } from './services/users-service.service';




@NgModule({
  declarations: [FavUserServiceService, UsersServiceService],
  imports: [
    CommonModule
  ],
  exports:[FavUserServiceService, UsersServiceService]
})
export class CoreModule { }
