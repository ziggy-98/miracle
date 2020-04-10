import React from 'react';
import './App.css';

class Header extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      firstNameValue: '',
      lastNameValue: '',
      user: {
        firstName: '',
        lastName: '',
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  formatName(user){
    let result;
    if(user.firstName){
      result = user.firstName + ' ' + user.lastName;
    }else{
      result = 'stranger';
    }
    return result;
  }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value});
  }

  updateUser(event){
    let firstNameValue = this.state.firstNameValue;
    let lastNameValue = this.state.lastNameValue;
    this.setState({
      user: {
        firstName: firstNameValue,
        lastName: lastNameValue
      }
    });
    event.preventDefault();
  }

  render(){
    const element = 
      <div key="header" className="title">
        <h1>Hello, {this.formatName(this.state.user)}</h1>
      </div>;

    const form = 
    <div key="form" className="form-container">
      <form className="name-form" onSubmit={this.updateUser}>
        <div className="form-field">
          <label>Please enter your first name
            <input name="firstNameValue" type="text" value={this.state.firstNameValue} onChange={this.handleChange} />
          </label>
        </div>
        <div className="form-field">
          <label>Please enter your last name
            <input name="lastNameValue" type="text" value={this.state.lastNameValue} onChange={this.handleChange} />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>;

    return [
      element,
      form
    ];
  }
}

function App() {

  return (
      <Header />
  );
}

export default App;
