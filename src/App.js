import SettingBar from './components/SettingBar';
import ToolBar from './components/ToolBar';
import Canvas from './components/Canvas';
import './styles/app.scss';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Switch>
          <Route path='/:id'>
            <ToolBar />
            <SettingBar />
            <Canvas />
          </Route>
          <Redirect to={`f${(+new Date()).toString(16)}`} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
