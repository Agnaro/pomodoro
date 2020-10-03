import { Component, OnInit } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { PartialTimerState, TimerState } from '../services/settings/settings.interface';
import { Timer } from './timer.class';

@Component({
  selector: 'app-timer-page',
  templateUrl: './timer-page.component.html',
  styleUrls: ['./timer-page.component.css']
})
export class TimerPageComponent implements OnInit {

// == CONSTANTS ===========================================================
private initialTimerState: TimerState = {
  tickRate: 50,
  time: 25 * 60 * 1000,
  isTicking: false
}

public timerUI = new Timer();
// = BASE OBSERVABLES  ====================================================
// == SOURCE OBSERVABLES ==================================================
// === STATE OBSERVABLES ==================================================
private programmaticCommand$ = new Subject<PartialTimerState>();

private timerCommands$ = merge(
  this.timerUI.btnStart$.pipe(mapTo({isTicking: true}))
)
// === INTERACTION OBSERVABLES ============================================
// == INTERMEDIATE OBSERVABLES ============================================
// = SIDE EFFECTS =========================================================
// == UI INPUTS ===========================================================
// == UI OUTPUTS ==========================================================
// == SUBSCRIPTION ========================================================
// === INPUTs =============================================================
// === OUTPUTS ============================================================
// = HELPER ===============================================================
// = CUSTOM OPERATORS =====================================================
// == CREATION METHODS ====================================================
// == OPERATORS ===========================================================


  constructor() { }

  ngOnInit() {
  }

}