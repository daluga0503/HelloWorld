import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'letra-apellido'
})
export class LetraApellidoPipe implements PipeTransform {

  transform(apellido:String): String {
    return apellido.charAt(0).toUpperCase();
  }

}
