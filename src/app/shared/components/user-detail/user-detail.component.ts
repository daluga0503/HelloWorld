import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/core/interfaces/user';
import { UserInfoFavClicked } from 'src/app/core/interfaces/user-info-fav-clicked';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent  implements OnInit {
  @Input() usuario?: User;
  form:FormGroup;
  mode:'New'|'Edit' = 'New';
  @Input() set user(_user:User|null){
    if (_user) {
      this.mode='Edit';
      this.form.controls['id'].setValue(_user.id);
      this.form.controls['nombre'].setValue(_user.nombre);
      this.form.controls['apellidos'].setValue(_user.apellidos);
      this.form.controls['edad'].setValue(_user.edad);
    }
  }
  @Output() onFavClicked:EventEmitter<UserInfoFavClicked> = new EventEmitter<UserInfoFavClicked>();
  constructor(
    private _modal:ModalController,
    private formBuilder: FormBuilder
  )  { 
    this.form = this.formBuilder.group({
      id:[null],
      nombre:['', [Validators.required]],
      apellidos:['', [Validators.required]],
      edad:[0, [Validators.required]]
    })
  }

  ngOnInit() {}

  onFavClick(event:any){
    this.onFavClicked.emit({
      fav:!(this.usuario?.fav??false) 
    });
    event.stopPropagation();
  }

  onCancel(){
    this._modal.dismiss(null, 'cancel');
  }

  onSubmit(){
    this._modal.dismiss(this.form.value, 'ok');
  }
 
  onDelete(){
    this._modal.dismiss(this.form.value, 'delete');
  }

}
