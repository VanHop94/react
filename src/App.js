import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './header/Header';
import Category from './category/Category';
import Success from './sucess/Success';
import Welcome from './welcome/Welcome';
import {
  Route,
  withRouter,
  Redirect,
  Switch
} from 'react-router-dom';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      email: ''
    }
  }

  render() {
    return (
          <Switch>
            <Route path='/success' component={Success} /> 
            <Route exact path="/talent/:id"  render={(props) => <Category name={this.state.name} phone={this.state.phone} email={this.state.email} {...props} />}></Route>
            <Route exact path="/:groupName/:phoneNumber"  render={(props) => <Category name={this.state.name} readonly={true} phone={this.state.phone} email={this.state.email} {...props} />}></Route>
            
          </Switch>
    );
  }

  saveUserInfo = (name, phone, email) => {
    
    this.setState({
      name: name,
      phone: phone,
      email: email
    })

    this.props.history.push("/category");
    
  } 
}

export default withRouter(App);
