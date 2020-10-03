import { Observable, Subject } from "rxjs";

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
    return this._btnStart$.asObservable();
  }
  get btnPause$(): Observable<ActionNames> {
    return this._btnPause$.asObservable();
  }
  get btnReset$(): Observable<ActionNames> {
    return this._btnReset$.asObservable();
  }
  get btnBreak$(): Observable<ActionNames> {
    return this._btnBreak$.asObservable();
  }

  public display: number;
  public active: boolean;

  private _btnStart$ = new Subject<ActionNames>();
  private _btnPause$ = new Subject<ActionNames>();
  private _btnReset$ = new Subject<ActionNames>();
  private _btnBreak$ = new Subject<ActionNames>();

  constructor(config?: TimerConfig){
    this.display = config?.initialSetTo || 0;

    this.init();
  }

  private init(){
    
  }

  public onBtnStartClick(evt: MouseEvent) {
    console.log("start");
    this._btnStart$.next(ActionNames.Start);
  }

  public onBtnPauseClick(evt: MouseEvent) {
    console.log("pausse");
    this._btnPause$.next(ActionNames.Pause);
  }
}