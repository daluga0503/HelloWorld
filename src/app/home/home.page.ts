import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  usuarios = [
    {
      nombre:"Juan Antonio",
      apellido:"García Gómez",
      edad: 46
    },
    {
      nombre:"Daniel",
      apellido:"Luque Gallardo",
      edad: 19
    },
    {
      nombre:"Antonio",
      apellido:"García Guerrero",
      edad: 19
    },
    {
      nombre:"Julio",
      apellido:"Granados Durán",
      edad: 19
    },
    {
      nombre:"Jorge",
      apellido:"Sousa Guzmán",
      edad: 21
    }
  ]

  constructor(private route: Router) {
  }
  
  welcome() {
    this.route.navigate(['welcome']);
  }
  

}
