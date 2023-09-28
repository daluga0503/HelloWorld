import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user';

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
      fav:true
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

  constructor(private route: Router) {
  }


  
  welcome() {
    this.route.navigate(['welcome']);
  }
  

}
