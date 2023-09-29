import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user';
import { UserInfoFavClicked } from './user-info-fav-clicked';
import { ToastController, ToastOptions } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // variable  privada de escritura que se comporta de tipo genérico que se inicializa en un array vacío
  private _users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  // variable pública solo de lectura para suscribirteque se comporta como un observable
  user$: Observable<User[]> = this._users.asObservable();

  /*
  // La función valorEnFuturo() devuelve un Observable que emite números.
valorEnFuturo(): Observable<number> {
  // Se crea un nuevo Observable y se pasa una función que toma un 'observer' como argumento.
  return new Observable<number>((observer) => {
    // Se utiliza setTimeout para retrasar la ejecución de un bloque de código.
    setTimeout(() => {
      // Se emite un número aleatorio al Observable usando 'observer.next()'.
      observer.next(Math.random() * 100);
      // Se indica que no habrá más emisiones de este Observable.
      observer.complete();
    }, 1000); // Se espera un segundo (1000 milisegundos) antes de ejecutar el código dentro de setTimeout.
  });
}
*/

  ngOnInit(): void{
    	/*
    // Se declara una variable 'subscription' para almacenar la suscripción al Observable.
var subscription = this.valorEnFuturo().subscribe((num) => {
  // Cuando se recibe un valor del Observable, se ejecuta esta función de callback.
  console.log("He recibido: " + num); // Se imprime en consola el mensaje y el número recibido.
  console.log(num); // Se imprime en consola solo el número recibido.
  
  // Se desuscribe del Observable para liberar recursos y detener futuras emisiones.
  subscription.unsubscribe();
});

		})
    */
  

    var usuarios : User[]= [ 
    { 
      id: 1,
      nombre:"Juan Antonio",
      apellidos:"García Gómez",
      edad: 46,
      fav:false
    },
    {
      id: 2,
      nombre:"Daniel",
      apellidos:"Luque Gallardo",
      edad: 19,
      fav: false
    },
    {
      id:3,
      nombre:"Antonio",
      apellidos:"García Guerrero",
      edad: 19,
      fav:true
    },
    {
      id: 4,
      nombre:"Julio",
      apellidos:"Granados Durán",
      edad: 19,
      fav:false
    },
    
    {
      id: 5,
      nombre:"Jorge",
      apellidos:"Sousa Guzmán",
      edad: 21,
      fav: true
    }
  ];
  this._users.next(usuarios);
}// cierre llave ngOninit

  constructor(private route: Router, private toast: ToastController) {
  }

  public onFavClicked(user:User, event:UserInfoFavClicked){
    //recibimos en user el usuario asociado a la tarjeta
    //recibimos en event un objeto del tipo UserInfoFavClicked que tiene una propiedad fav que indica si hay que añadir o eliminar de la lista de favoritos
    //creamos una copia del array actual de usuarios
    const users = [...this._users.value];
    //buscamos el índice del usuario para modificar su propiedad fav
    var index = users.findIndex((_user)=>_user.id == user.id);
    if(index == index) //el == index es para que me coga el primer usuario también del array de usuarios
    //actualizamos la propiedad fav con el valor que hemos recibido por el evento
    users[index].fav = event.fav??false; //en el caso de que fav sea undefined devolvemos falso.
  //notificamos un nuevo array de usuarios para que se renderice en la plantilla
  this._users.next([...users]);
  //Notificamos con un Toast que se ha pulsado
  const options:ToastOptions = {
    message:`User ${user.nombre}${event.fav?' added':' removed'} ${event.fav?'to':'from'} favourites`, //mensaje del toast
    duration:1000, // 1 segundo
    position:'bottom', // el toast se situa en la parte inferior
    color:'danger', // color del toast
    cssClass:'fav-ion-toast' //Una clase que podemos poner en global.scss para configurar el ion-toast
  };


  //creamos el toast y lo presentamos (es una promesa por eso el then)
  this.toast.create(options).then(toast=>toast.present());
  }
  
  welcome() {
    this.route.navigate(['welcome']);
  }
  

}
