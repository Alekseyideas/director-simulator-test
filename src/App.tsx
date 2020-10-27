import Axios from 'axios';
import React from 'react';
import './App.scss';
import { Circle } from './components/Circle';
import { Store } from './store';
import StoreAction from './store/StoreAction';
function App() {
  const { store, dispatch } = React.useContext(Store);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [currentQuestion] = React.useState(0);

  React.useEffect(() => {
    if (!store.questions) {
      const Actions = new StoreAction(dispatch);
      (async () => {
        try {
          const resp = await Axios.get(`${process.env.REACT_APP_API_URI}/exec/test_train.php`);
          Actions.setQuestions({
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

  if (loading)
    return (
      <div style={{ padding: '20px' }}>
        <p>Зачекайте ...</p>
      </div>
    );
  if (store.questions)
    return (
      <div className='tda'>
        <div className='tda__wrapper'>
          <Circle num={+((currentQuestion / store.questionsCount) * 100).toFixed()} />
          <div className='tda__testQWrapper'>
            <p>{store && store.questions[currentQuestion].name}</p>
            <ul>
              {store.questions[currentQuestion].answers.map((itm) => (
                <li key={itm.id}>{itm.name}</li>
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
