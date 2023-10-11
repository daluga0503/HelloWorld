import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { FavsPipePipe } from '../shared/pipes/favs.pipe';
import { HighlightDirective } from '../shared/directives/highlight.directive';

import { SharedModule } from '../shared/shared.module';




@NgModule({
  imports: [
    CommonModule, FormsModule, IonicModule, HomePageRoutingModule, SharedModule],
  declarations: [HomePage, FavsPipePipe , HighlightDirective]
})
export class HomePageModule {}

