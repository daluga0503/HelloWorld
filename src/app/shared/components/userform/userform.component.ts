import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/core/interfaces/user';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.scss'],
})
export class UserFormComponent  implements OnInit {

  constructor(private modal:ModalController) { }

  ngOnInit() {}

  onApply(){
    var user: User = {
      id:10,
      nombre:"Daniel",
      apellidos:"Luque Gallardo",
      edad:19,
      fav:false
    }
    this.modal.dismiss(user, "apply");
  }

}
