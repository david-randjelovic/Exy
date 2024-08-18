import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformType',
  standalone: true
})
export class TransformTypePipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/ /g, '_').toUpperCase();
  }
}
