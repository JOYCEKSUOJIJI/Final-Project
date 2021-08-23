import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userName'
})
export class UserNamePipe implements PipeTransform {

  transform(value: string): string {
    const index = value.indexOf('@');
    return value.slice(0, index);
  }

}
