import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent  implements OnInit {
  //input de tipo usuario
  @Input() usuario?:{
    nombre?:string
    apellidos?:string
    edad?:number
  }

  constructor() {}

  ngOnInit() {}

}
