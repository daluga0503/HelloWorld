import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FavsPipePipe } from './pipes/favs.pipe';
import { LetraApellidoPipe } from './pipes/letra-apellido.pipe';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserFormComponent } from './components/userform/userform.component';
import { HighlightDirective } from './directives/highlight.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FavInfoComponent } from './components/fav-info/fav-info.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { PictureSelectableComponent } from './components/picture-selectable/picture-selectable.component';




@NgModule({
  declarations: [UserInfoComponent,  LetraApellidoPipe, UserFormComponent, FavInfoComponent, UserDetailComponent, PictureSelectableComponent ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [UserInfoComponent, UserFormComponent, FavInfoComponent, UserDetailComponent]
})
export class SharedModule { }

