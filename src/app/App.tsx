import { HomePage } from '@pages/Home';
import './styles/normalize.scss';
import style from './app.module.scss';

function App() {
  return (
    <div className={style.app}>
      <HomePage />
    </div>
  );
}

export default App;
