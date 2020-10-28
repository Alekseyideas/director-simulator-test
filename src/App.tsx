import Axios from 'axios';
import React from 'react';
import './App.scss';
import { Circle } from './components/Circle';
import { MessWrapper } from './components/MessWrapper';
import {
  CompleteFail,
  CompleteSuccess,
  ErrorScreen,
  QuestionErrors,
  SelectCount,
  SuccessScreen,
} from './screens';
import { Store } from './store';
import StoreAction from './store/StoreAction';
import { TUserAnswer } from './store/types';
function App() {
  const { store, dispatch } = React.useContext(Store);

  const [maxErrorsCount, setMaxErrorsCount] = React.useState(3);
  const [isStepCount, setIsStepCount] = React.useState(true);
  const [isErrorScreen, setIsErrorScreen] = React.useState(false);

  const [questionCount, setQuestionCount] = React.useState(3);

  const [loading, setLoading] = React.useState(true);
  const [showSuccessScreen, setShowSuccessScreen] = React.useState(false);
  const [showErrorScreen, setShowErrorScreen] = React.useState(false);
  const [isComSuc, setIsComSuc] = React.useState(false);
  const [isComFail, setIsComFail] = React.useState(false);

  const [error, setError] = React.useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);

  React.useEffect(() => {
    if (!store.questions) {
      (async () => {
        try {
          const resp = await Axios.get(`${process.env.REACT_APP_API_URI}/exec/test_train.php`);
          new StoreAction(dispatch).setQuestions({
            questions: resp?.data?.questions.sort(() => Math.random() - 0.5) || [],
            isbad_text: resp?.data?.isbad_text || '',
            isok_text: resp?.data?.isok_text || '',
            questionsCount: (resp?.data?.questions[0] && resp?.data?.questions.length) || 1,
          });
        } catch (error) {
          console.log('App -> error', error);
          setError(`Помилка, зв'яжіться з адміниістратором`);
        }
        setLoading(false);
      })();
    }
  }, [store, dispatch]);

  React.useEffect(() => {
    console.log(store);
  }, [store]);

  const answerHandler = (data: TUserAnswer) => {
    const { answer } = data;
    if (answer.istrue) setShowSuccessScreen(true);
    else setShowErrorScreen(true);
    new StoreAction(dispatch).setAnswer({ answer: data });
  };

  const checkQuestions = () => {
    const suc = store.answers.filter((itm) => itm.answer.istrue);
    const sucCount = suc.length;
    if (questionCount === 3 && sucCount < 3) {
      setMaxErrorsCount(1);
      return setIsComFail(true);
    }
    if (questionCount === 15 && sucCount < 7) {
      setMaxErrorsCount(15 - 7);
      return setIsComFail(true);
    }
    if (questionCount === 30 && sucCount < 21) {
      setMaxErrorsCount(30 - 21);
      return setIsComFail(true);
    }
    if (questionCount === 40 && sucCount < 28) {
      setMaxErrorsCount(40 - 28);
      return setIsComFail(true);
    }
    if (questionCount === 50 && sucCount < 35) {
      setMaxErrorsCount(50 - 35);
      return setIsComFail(true);
    }
    if (questionCount === 200 && sucCount < 140) {
      setMaxErrorsCount(200 - 140);

      return setIsComFail(true);
    }
    return setIsComSuc(true);
  };
  const nextQhandler = () => {
    if (store.questionsCount - 1 <= currentQuestion) {
      checkQuestions();
    } else {
      setCurrentQuestion((oldV) => oldV + 1);
    }
  };

  if (loading) return <MessWrapper text='Зачекайте ...' />;

  if (isErrorScreen) {
    return <QuestionErrors />;
  }

  if (isStepCount) {
    return (
      <SelectCount
        onSubmit={(val) => {
          if (store.questionsCount < val) {
            setQuestionCount(3);
          } else setQuestionCount(val);
          setIsStepCount(false);
        }}
      />
    );
  }
  if (isComFail) {
    return (
      <CompleteFail maxErrorsCount={maxErrorsCount} goToErrors={() => setIsErrorScreen(true)} />
    );
  }

  if (isComSuc) {
    return <CompleteSuccess />;
  }

  if (showErrorScreen) {
    const uri =
      store.questions && store.questions[0] ? store.questions[currentQuestion]?.url || '' : '';
    return (
      <ErrorScreen
        uri={uri}
        onClickNext={() => {
          nextQhandler();
          setShowErrorScreen(false);
        }}
      />
    );
  }

  if (showSuccessScreen) {
    return (
      <SuccessScreen
        onClickNext={() => {
          nextQhandler();
          setShowSuccessScreen(false);
        }}
      />
    );
  }

  if (store.questions) {
    return (
      <div>
        <div className='tda__wrapper'>
          <div className='tda__circleTextWrapper'>
            <Circle num={+((currentQuestion / store.questionsCount) * 100).toFixed()} />
            <span>
              {currentQuestion + 1} з {store.questionsCount}
            </span>
          </div>
          <div className='tda__testQWrapper'>
            <h5>{store && store.questions[currentQuestion].name}</h5>
            <ul>
              {store.questions[currentQuestion].answers.map((itm, index) => (
                <li
                  key={itm.id}
                  onClick={() =>
                    answerHandler({
                      question: (store.questions && store.questions[currentQuestion].id) || 0,
                      answer: itm,
                    })
                  }
                >
                  <b>{index + 1}.</b> {itm.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (error) return <MessWrapper text={error} />;

  return <MessWrapper text='нема питань' />;
}

export default App;
