import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'letraApellido'
})
export class LetraApellidoPipe implements PipeTransform {

  transform(apellidos?:string): string | undefined {
    if(apellidos!=""){
      return apellidos?.charAt(0).toUpperCase();
    }else{
      return ""
    }
    
  }

}
