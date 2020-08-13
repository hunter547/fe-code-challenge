import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { setItems } from './utilities/storage';
import Header from '../js/components/header';
import CategoryHeader from '../js/components/categoryHeader';
import Filter from '../js/components/filter';
import FlowerGrid from '../js/components/flowersGrid';
import Order from '../js/components/order';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import '../style/index.scss';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      category: null
    };
  }

  componentDidMount() {
    setItems();
  }
  
  getWelcomeText = () => {
    return 'The Bouqs';
  }

  render() {
    const welcomeText = this.getWelcomeText();
    return (
      <Provider store={store}>
        <Router>
          <Header header={welcomeText} />
          <Switch>
            <Route path="/" exact>
              <Filter />
              <CategoryHeader />
              <FlowerGrid />
            </Route>
            <Route path="/order">
              <Order />
            </Route>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

render(
  <App />,
  document.getElementById('app'),
);
