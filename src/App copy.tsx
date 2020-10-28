import Axios from 'axios';
import React from 'react';
import './App.scss';
import { Circle } from './components/Circle';
import { CompleteSuccess, ErrorScreen, SuccessScreen } from './components/screens';
import { Store } from './store';
import StoreAction from './store/StoreAction';
import { TUserAnswer } from './store/types';
function App() {
  const { store, dispatch } = React.useContext(Store);

  const [loading, setLoading] = React.useState(true);
  const [showSuccessScreen, setShowSuccessScreen] = React.useState(false);
  const [showErrorScreen, setShowErrorScreen] = React.useState(false);
  const [isComSuc, setIsComSuc] = React.useState(false);
  const [isComFail, setIsComFail] = React.useState(true);

  const [error, setError] = React.useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);

  React.useEffect(() => {
    if (!store.questions) {
      // const Actions = new StoreAction(dispatch);
      (async () => {
        try {
          const resp = await Axios.get(`${process.env.REACT_APP_API_URI}/exec/test_train.php`);
          new StoreAction(dispatch).setQuestions({
            questions: resp?.data?.questions || [],
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

  const nextQhandler = () => {
    console.log(store.questionsCount - 1 >= currentQuestion);
    console.log(store.questionsCount - 1, currentQuestion);
    if (store.questionsCount - 1 <= currentQuestion) {
      console.log(1123123);
    } else {
      setCurrentQuestion((oldV) => oldV + 1);
    }
  };

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

  if (loading)
    return (
      <div style={{ padding: '20px' }}>
        <p>Зачекайте ...</p>
      </div>
    );

  if (store.questions)
    return (
      <div>
        <div className='tda__wrapper'>
          <Circle num={+((currentQuestion / store.questionsCount) * 100).toFixed()} />
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

  if (error)
    return (
      <div style={{ padding: '20px' }}>
        <p>{error}</p>
      </div>
    );

  return (
    <div style={{ padding: '20px' }}>
      <p>нема питань</p>
    </div>
  );
}

export default App;
