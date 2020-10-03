export interface TimerState {
  tickSpeed: number;
  time: number;
  isTicking: boolean;
}

export type PartialTimerState = Partial<TimerState>;

export type TimerStateKeys = keyof TimerState;