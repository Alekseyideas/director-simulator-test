import { IAction, TQuestion, EActionTypes, IState } from './types';

export default class StoreAction {
  dispatch: IAction | any;
  constructor(dispatch: IAction | any) {
    this.dispatch = dispatch;
  }

  setLoading = (payload: { loading: boolean }) =>
    this.dispatch({
      type: EActionTypes.SET_LOADING,
      payload,
    });
  setQuestions = (payload: {
    questions: TQuestion[] | null;
    isbad_text: IState['isbad_text'];
    isok_text: IState['isok_text'];
    questionsCount: IState['questionsCount'];
  }) =>
    this.dispatch({
      type: EActionTypes.SET_QUESTIONS,
      payload,
    });

  setQuestionsCount = (payload: { count: number }) =>
    this.dispatch({
      type: EActionTypes.SET_QUESTIONS,
      payload,
    });
}
