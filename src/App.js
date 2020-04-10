import React from 'react';
import './App.css';

class User extends React.Component{
  render(){
    const element = 
      <div className="user">
        <p>{this.props.firstName} {this.props.lastName}</p>
      </div>;

    return (element);
  }
}

class Form extends React.Component{

  // handleSubmit(event){
  //   this.props.onSubmit(event);
  //   event.preventDefault();
  // }

  render(){
    const form = 
    <div key="form" className="form-container">
      <form className="name-form" onSubmit={this.props.onSubmit}>
        <div className="form-field">
          <label>Please enter your first name
            <input name="firstNameValue" type="text" value={this.props.firstNameValue} onChange={this.props.onChange} />
          </label>
        </div>
        <div className="form-field">
          <label>Please enter your last name
            <input name="lastNameValue" type="text" value={this.props.lastNameValue} onChange={this.props.onChange} />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>;
    return (form);
  }
}

class Game extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      firstNameValue: '',
      lastNameValue: '',
      startPressed: false,
      users: Array(0) 
    }
    this.handleChange = this.handleChange.bind(this);
    this.updateUsers = this.updateUsers.bind(this);
    this.addPlayers = this.addPlayers.bind(this);
  }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value});
  }

  updateUsers(event){
    let firstNameValue = this.state.firstNameValue;
    let lastNameValue = this.state.lastNameValue;
    let users = this.state.users;
    let newUser = {
      firstName: firstNameValue,
      lastName: lastNameValue
    };

    users.push(newUser);
    this.setState({
      users: users,
      firstNameValue: '',
      lastNameValue: ''
    });
    event.preventDefault();
  }

  addPlayers(){
    let startPressed = true;
    this.setState({
      startPressed: startPressed
    });
  }

  render(){

    let render ;

    if(this.state.startPressed){
      let users = this.state.users.map( (user, key) => {
        return (
          <User key={'user-'+key} firstName={user.firstName} lastName={user.lastName} />
        );
      });
  
      let usersElement = <div key="users" className="users-container"><h2>Players</h2><div className="users-wrapper">{users}</div></div>
  
      let form = <Form onSubmit={this.updateUsers} firstNameValue={this.state.firstNameValue} lastNameValue={this.state.lastNameValue} onChange={this.handleChange} />
      render = [
        usersElement,
        form
      ]
    }else{
      let intro = <div className="intro"><h2>No players added!</h2></div>
      let addPlayers = 
        <div className="start-button-container">
          <button className="add-players-button" onClick={this.addPlayers}>Add Players</button>
        </div>;
      render = 
        <div className="intro-container">
          <div className="intro-wrapper">
            {intro}{addPlayers}
          </div>
        </div>;
    }

    return render;
  }
}

function App() {

  const header = 
  <header key="header" className="header">
    <div className="title">
      <h1>Welcome to Miracle</h1>
    </div>
  </header>;

  const game = <Game />

  return [
    header,
    game
  ];
}

export default App;
