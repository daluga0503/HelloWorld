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
      apellidos:"García Gómez",
      edad: 46
    },
    {
      nombre:"Daniel",
      apellidos:"Luque Gallardo",
      edad: 19
    },
    {
      nombre:"Antonio",
      apellidos:"García Guerrero",
      edad: 19
    },
    {
      nombre:"Julio",
      apellidos:"Granados Durán",
      edad: 19
    },
    {
      nombre:"Jorge",
      apellidos:"Sousa Guzmán",
      edad: 21
    }
  ]

  constructor(private route: Router) {
  }
  
  welcome() {
    this.route.navigate(['welcome']);
  }
  

}
