import React, {Component, Suspense } from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Logout from './containers/Logout/Logout';
import * as actions from './store/actions/index';

const AuthComponent = React.lazy(() => import('./containers/Auth/Auth'));
const CheckoutComponent = React.lazy(() => import('./containers/Checkout/Checkout'));
const OrdersComponent = React.lazy(() => import('./containers/Orders/Orders'))
class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignUp();
  }

  render() {
    let routes = (
        <Switch>
          <Suspense fallback={<div>Loading...</div>}>
            <Route path="/auth" component={AuthComponent}/>
            <Route path='/' exact component={BurgerBuilder}/>
            <Redirect to='/'/>
          </Suspense>
        </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Suspense fallback={<div>Loading...</div>}>
            <Route path='/checkout' component={CheckoutComponent}/>
            <Route path='/orders' component={OrdersComponent}/>
            <Route path='/logout' component={Logout}/>
            <Route path="/auth" component={AuthComponent}/>
            <Route path='/' exact component={BurgerBuilder}/>
          </Suspense>
        </Switch>
      );
    }

    return (
      <div >
        <Layout>
          {routes}
        </Layout> 
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authChechState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));