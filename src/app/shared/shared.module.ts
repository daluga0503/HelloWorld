import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FavsPipePipe } from './pipes/favs.pipe';
import { LetraApellidoPipe } from './pipes/letra-apellido.pipe';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserFormComponent } from './components/userform/userform.component';
import { HighlightDirective } from './directives/highlight.directive';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [UserInfoComponent, LetraApellidoPipe, UserFormComponent ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule 
  ],
  exports: [UserInfoComponent, UserFormComponent]
})
export class SharedModule { }
