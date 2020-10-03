import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timerDisplay'
})
export class TimerDisplayPipe implements PipeTransform {

  transform(time: number, args?: any): string {
    const date = new Date(time);
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }
}