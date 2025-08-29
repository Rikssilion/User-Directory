import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'lastFirst', standalone: true })
export class LastFirstPipe implements PipeTransform {
  transform(first: string | null | undefined, last?: string | null | undefined): string {
    const f = (first || '').trim();
    const l = (last || '').trim();
    if (!f && !l) return '';
    if (!l) return f;
    if (!f) return l;
    return `${l}, ${f}`;
  }
}
