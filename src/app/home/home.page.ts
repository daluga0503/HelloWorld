import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, zip } from 'rxjs';
import { User } from '../core/interfaces/user';
import { UserInfoFavClicked } from '../core/interfaces/user-info-fav-clicked';
import { ModalController, ToastController, ToastOptions } from '@ionic/angular';
import { UsersServiceService } from '../core/services/users-service.service';
import { FavUserServiceService } from '../core/services/fav-user-service.service';
import { UserFormComponent } from '../shared/components/userform/userform.component';
import { UserDetailComponent } from '../shared/components/user-detail/user-detail.component';




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public loading: boolean = false;
  public favsVer = false;
  constructor(
    private route: Router, 
    private toast: ToastController, 
    public users: UsersServiceService,
    public favs: FavUserServiceService,
    private modal: ModalController) {

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


  public favInfo(){
    this.route.navigate(['/favinfo']);
  }

  public onFavClicked(id: number, event:UserInfoFavClicked){
    var obs = (event?.fav)?this.favs.addFav(id):this.favs.deleteFav(id);
    obs.subscribe({
      next:_=>{ // el _ siginifica cualquier valor
        //Notificamos con un Toast que se ha pulsado
        const options:ToastOptions = {
          message:`User ${event.fav?' added':' removed'} ${event.fav?'to':'from'} favourites`, //mensaje del toast
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

  public async onCardClicked(user:User){
    
    var onDismiss = (info:any)=>{
      console.log(info);
      switch(info.role){
        case 'ok':{
          this.users.updateUsers(info.data).subscribe(async user=>{
              const options:ToastOptions = {
              message:"User modified",
              duration:1000,
              position:'bottom',
              color:'tertiary',
              cssClass:'card-ion-toast'
            };
            const toast = await this.toast.create(options);
            toast.present();
          })
        }
        break;
        case 'delete':{
          this.users.deleteUser(info.data).subscribe(async user=>{
            const options:ToastOptions = {
            message:"User deleted",
            duration:1000,
            position:'bottom',
            color:'tertiary',
            cssClass:'card-ion-toast'
          };
          const toast = await this.toast.create(options);
          toast.present();
        })
        }
        break;
        default:{
          console.error("No debería entrar");
        }
      }
    }
    this.presentForm(user, onDismiss);
  }



  async presentForm(data:User|null, onDismiss:(result:any)=>void){
    
    const modal = await this.modal.create({
      component:UserDetailComponent,
      componentProps:{
        user:data
      },
      cssClass:"modal-full-right-side"
    });
    modal.present();
    modal.onDidDismiss().then(result=>{
      if(result && result.data){
        onDismiss(result);
      }
    });
  }

  onNewUser(){
    var onDismiss = (info:any)=>{
      console.log(info);
      switch(info.role){
        case 'ok':{
          this.users.addUser(info.data).subscribe(async user=>{
              const options:ToastOptions = {
              message:"User created",
              duration:1000,
              position:'bottom',
              color:'tertiary',
              cssClass:'card-ion-toast'
            };
            const toast = await this.toast.create(options);
            toast.present();
          })
        }
        break;
        default:{
          console.error("No debería entrar");
        }
      }
    }
    this.presentForm(null, onDismiss);
  }
  

  showFavs(){
    this.favsVer = !this.favsVer;
  }
}
