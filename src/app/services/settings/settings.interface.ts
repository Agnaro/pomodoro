export interface TimerState {
  time: number;
  tickRate: number;
  isTicking: boolean;
}

export type PartialTimerState = Partial<TimerState>;