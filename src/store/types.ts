export interface TAnswer {
  id: string;
  name: string;
  isTrue: '0' | '1';
  question_id: string;
}
export interface TQuestion {
  answers: TAnswer[];
  id: string;
  name: string;
}
export interface IState {
  isbad_text: string;
  isok_text: string;
  questions: TQuestion[] | null;
  questionsCount: number;
  readonly errors?: string | undefined;
  readonly loading: boolean;
}
export interface IAction {
  type: string;
  payload: any;
}
export interface IStore {
  store: IState;
  dispatch: IAction | any;
}

export enum EActionTypes {
  SET_QUESTIONS = 'SET_QUESTIONS',
  SET_QUESTIONS_COUNT = 'SET_QUESTIONS',

  SET_LOADING = 'SET_LOADING',

  OPEN_MODAL = 'OPEN_MODAL',
  CLOSE_MODAL = 'CLOSE_MODAL',
  RESET_MODAL = 'RESET_MODAL',
}
