import { Component, OnDestroy,  OnInit } from '@angular/core';
import { combineLatest, merge, NEVER,  Observable,  pipe,  Subject, timer, UnaryFunction } from 'rxjs';
import { distinctUntilChanged, mapTo, pluck,  scan, shareReplay,  startWith, switchMap, takeUntil,  tap, withLatestFrom } from 'rxjs/operators';
import { PartialTimerState, TimerState } from '../services/settings/settings.interface';
import { SettingsService } from '../services/settings/settings.service';
import { Timer } from './timer.class';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
// == CONSTANTS ===========================================================
private initialTimerState: TimerState = {
  tickSpeed: 50,
  time: 25 * 60 * 1000,
  isTicking: false,
  onBreak: false
}

public timerUI = new Timer();
// = BASE OBSERVABLES  ====================================================
private destroy$ = new Subject<void>();

// == SOURCE OBSERVABLES ==================================================
// === STATE OBSERVABLES ==================================================
private programmaticCommand$ = new Subject<PartialTimerState>();

private timerCommands$ = merge(
  this.timerUI.btnStart$.pipe(mapTo({ isTicking: true })),
  this.timerUI.btnPause$.pipe(mapTo({ isTicking: false })),
  this.timerUI.btnReset$.pipe(mapTo({ time: this.initialTimerState.time, isTicking: false, onBreak: false })),
  this.timerUI.btnBreak$.pipe(mapTo({ time: this.settingsService.breakTime, isTicking: true, onBreak: true })),
  this.programmaticCommand$.asObservable()
)

private timerState$: Observable<TimerState> = this.timerCommands$.pipe(
  startWith(this.initialTimerState),
  scan((timerState: TimerState, command) => ({...timerState, ...command})),
  shareReplay(1)
);

// === INTERACTION OBSERVABLES ============================================
// == INTERMEDIATE OBSERVABLES ============================================
private time$ = this.timerState$.pipe(pluck("time"));
private isTicking$ = this.timerState$.pipe(this.queryChange("isTicking"));
private tickSpeed$ = this.timerState$.pipe(this.queryChange("tickSpeed"));
private onBreak$ = this.timerState$.pipe(this.queryChange("onBreak"));

private timerUpdateTrigger$ = combineLatest([this.isTicking$, this.tickSpeed$]).pipe(
  switchMap(([isTicking, tickSpeed]) => isTicking ? timer(0, tickSpeed) : NEVER)
)

// = SIDE EFFECTS =========================================================
// == UI INPUTS ===========================================================
private renderTimeChange$ = this.time$.pipe(tap(n => this.timerUI.renderTimeChange(n)));
private renderOnBreak$ = this.onBreak$.pipe(tap(b => this.timerUI.renderOnBreak(b)))

// == UI OUTPUTS ==========================================================
private commandFromTick$ = this.timerUpdateTrigger$.pipe(
  withLatestFrom(this.timerState$, (_, timerState) => ({
    time: timerState.time,
    tickSpeed: timerState.tickSpeed
  })),
  tap(({time, tickSpeed}) => {
    const newTime = (time - tickSpeed) < 0 ? 0 : time - tickSpeed;
    this.programmaticCommand$.next({time: newTime, isTicking: newTime !== 0})
  })
)

// == SUBSCRIPTION ========================================================
private subscribeToThis$ = merge(
  this.renderTimeChange$,
  this.renderOnBreak$,
  this.commandFromTick$
)
// === INPUTs =============================================================
// === OUTPUTS ============================================================
// = HELPER ===============================================================
// = CUSTOM OPERATORS =====================================================
// == CREATION METHODS ====================================================
// == OPERATORS ===========================================================
private queryChange<T extends Object, K1 extends keyof T>(key: K1): UnaryFunction<Observable<T>, Observable<T[K1]>> {
  return  pipe(
    pluck<T, K1>(key), 
    distinctUntilChanged()
  );
}

  constructor(
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.subscribeToThis$.pipe(
      takeUntil(this.destroy$)
    ).subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
  }


}