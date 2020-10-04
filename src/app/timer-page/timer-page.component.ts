import { Component, EventEmitter,  Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-timer-page',
  templateUrl: './timer-page.component.html',
  styleUrls: ['./timer-page.component.css']
})
export class TimerPageComponent implements OnInit {
  @Input() time = 10;
  @Input() active = true;

  @Output() onStart = new EventEmitter<void>();
  @Output() onPause = new EventEmitter<void>();
  @Output() onReset = new EventEmitter<void>();
  @Output() onBreak = new EventEmitter<void>();

  constructor(){}

  ngOnInit(){}
  
  public onBtnStartClick(evt: MouseEvent) {
    console.debug("start");
    this.onStart.emit();
  }

  public onBtnPauseClick(evt: MouseEvent) {
    console.debug("pause");
    this.onPause.emit();
  }

  public onBtnResetClick(evt: MouseEvent) {
    console.debug("reset");
    this.onReset.emit();
  }

  public onBtnBreakClick(evt: MouseEvent) {
    console.debug("break");
    this.onBreak.emit();
  }
}