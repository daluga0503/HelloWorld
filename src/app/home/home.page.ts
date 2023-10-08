import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, zip } from 'rxjs';
import { User } from '../interfaces/user';
import { UserInfoFavClicked } from './user-info-fav-clicked';
import { ToastController, ToastOptions } from '@ionic/angular';
import { UsersServiceService } from '../users-service.service';
import { FavUserServiceService } from '../fav-user-service.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public loading: boolean = false;
  constructor(
    private route: Router, 
    private toast: ToastController, 
    public users: UsersServiceService,
    public favs: FavUserServiceService,) {

  }
  ngOnInit(): void{
    this.loading = true;
    zip(this.users.getAll(), this.favs.getAll()).subscribe( results =>{
      this.loading=false;
    })
}
  public welcome(){
    this.route.navigate(['/welcome']);
  }

  

  public onFavClicked(user:User, event:UserInfoFavClicked){
    var obs = (event?.fav)?this.favs.addFav(user.id):this.favs.deleteFav(user.id);
    obs.subscribe({
      next:_=>{ // el _ siginifica cualquier valor
        //Notificamos con un Toast que se ha pulsado
        const options:ToastOptions = {
          message:`User ${user.nombre}${event.fav?' added':' removed'} ${event.fav?'to':'from'} favourites`, //mensaje del toast
          duration:1000, // 1 segundo
          position:'bottom', // el toast se situa en la parte inferior
          color:'danger', // color del toast
          cssClass:'fav-ion-toast' //Una clase que podemos poner en global.scss para configurar el ion-toast
        };
        //creamos el toast
        this.toast.create(options).then(toast=>toast.present());
        },
        error:err =>{
          console.log(err)
        }
      });
  }
  public onDeleteClicked(user: User){
    var _user:User = {...user};

    this.users.deleteUser(_user).subscribe(
        {next: user=>{
        //Notificamos con un Toast que se ha pulsado
        const options:ToastOptions = {
          message:`User deleted`, //mensaje del toast
          duration:1000, // 1 segundo
          position:'bottom', // el toast se situa en la parte inferior
          color:'danger', // color del toast
          cssClass:'fav-ion-toast' //Una clase que podemos poner en global.scss para configurar el ion-toast
        };
        //creamos el toast
        this.toast.create(options).then(toast=>toast.present());
        },
        error: err=>{
          console.log(err);
        }
      });
  }
  public async onCardClicked(){
    const options:ToastOptions = {
      message:"User clicked the card",
      duration:1000,
      position:'bottom',
      color:'tertiary',
      cssClass:'card-ion-toast'
    };
    const toast = await this.toast.create(options);
    toast.present();
  }
}
