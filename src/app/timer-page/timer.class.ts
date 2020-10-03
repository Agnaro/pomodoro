import { Observable, Subject } from "rxjs";
import { debounce, debounceTime } from "rxjs/operators";

export enum ActionNames {
  Start,
  Pause,
  Reset,
  Break,
}

export interface TimerConfig {
  initialSetTo: number;
}

export class Timer {
  get btnStart$(): Observable<ActionNames> {
    return this._btnStart$.asObservable().pipe(debounceTime(10));
  }
  get btnPause$(): Observable<ActionNames> {
    return this._btnPause$.asObservable().pipe(debounceTime(10));
  }
  get btnReset$(): Observable<ActionNames> {
    return this._btnReset$.asObservable().pipe(debounceTime(10));
  }
  get btnBreak$(): Observable<ActionNames> {
    return this._btnBreak$.asObservable().pipe(debounceTime(10));
  }

  public display: number;
  public active: boolean;

  private _btnStart$ = new Subject<ActionNames>();
  private _btnPause$ = new Subject<ActionNames>();
  private _btnReset$ = new Subject<ActionNames>();
  private _btnBreak$ = new Subject<ActionNames>();

  constructor(config?: TimerConfig){
    this.display = config?.initialSetTo || 10 * 60 * 1000;

    this.init();
  }

  private init(){
    
  }

  public renderTimeChange(n: number) {
    this.display = n;
  }

  public onBtnStartClick(evt: MouseEvent) {
    console.debug("start");
    this._btnStart$.next(ActionNames.Start);
  }

  public onBtnPauseClick(evt: MouseEvent) {
    console.debug("pause");
    this._btnPause$.next(ActionNames.Pause);
  }
}