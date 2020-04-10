import React from 'react';
import './App.css';

class User extends React.Component{
  render(){
    const element = 
      <div className="user">
        <div class="image-wrapper">
          <img src={"/assets/"+this.props.avatar+'.png'} alt={this.props.nickname + '\'s avatar'} />
        </div>
        <div class="info-wrapper">
          <p>{this.props.nickname}</p>
        </div>
      </div>;

    return (element);
  }
}

class AddPlayersForm extends React.Component{

  // handleSubmit(event){
  //   this.props.onSubmit(event);
  //   event.preventDefault();
  // }

  isSelected(value){
    if(this.props.avatarValue === value){
      return true;
    }
    return false;
  }

  triggerChange = (e) => {
    if(e.target.nextSibling){
      switch (e.target.nextSibling.value){
        case 'avatar-1':
          this.avatar1.click();
          break;
        case 'avatar-2':
          this.avatar2.click();
          break;
        case 'avatar-3':
          this.avatar3.click();
          break;
        case 'avatar-4':
          this.avatar4.click();
          break;
        default:
          break;
      }
    }
  }

  render(){
    const form = 
    <div key="form" className="form-container">
      <form className="name-form" onSubmit={this.props.onSubmit}>
        <div className="form-field">
          <label>What's your nickname?
            <input name="firstNameValue" type="text" value={this.props.firstNameValue} onChange={this.props.onChange} />
          </label>
        </div>
        <div className="form-field">
          <p>Select your avatar</p>
            <ul class="choose-avatar-list">
              <li className={(this.props.avatarValue === 'avatar-1' ? 'selected' : '')} onClick={this.triggerChange}>
                <img src="/assets/avatar-1.png" alt="avatar choice 1" />
                <input name="avatarValue" ref={input => this.avatar1 = input} type="radio" value="avatar-1" checked={this.isSelected('avatar-1')} onChange={this.props.onChange} />
              </li>
              <li className={this.props.avatarValue === 'avatar-2' ? 'selected' : ''} onClick={this.triggerChange}>
              <img src="/assets/avatar-2.png" alt="avatar choice 2" />
                <input name="avatarValue" ref={input => this.avatar2 = input} type="radio" value="avatar-2" checked={this.isSelected('avatar-2')} onChange={this.props.onChange} />
              </li>
              <li className={this.props.avatarValue === 'avatar-3' ? 'selected' : ''} onClick={this.triggerChange}>
                <img src="/assets/avatar-3.png" alt="avatar choice 3" />
                <input name="avatarValue" ref={input => this.avatar3 = input} type="radio" value="avatar-3" checked={this.isSelected('avatar-3')} onChange={this.props.onChange} />
              </li>
              <li className={this.props.avatarValue === 'avatar-4' ? 'selected' : ''} onClick={this.triggerChange}>
                <img src="/assets/avatar-4.png" alt="avatar choice 4" />
                <input name="avatarValue" ref={input => this.avatar4 = input} type="radio" value="avatar-4" checked={this.isSelected('avatar-4')} onChange={this.props.onChange} />
              </li>
            </ul>
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
      avatarValue: '',
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
    let avatarValue = this.state.avatarValue;
    let users = this.state.users;
    let newUser = {
      nickname: firstNameValue,
      avatar: avatarValue
    };

    users.push(newUser);
    this.setState({
      users: users,
      firstNameValue: '',
      avatarValue: ''
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
          <User key={'user-'+key} nickname={user.nickname} lastName={user.lastName} avatar={user.avatar} />
        );
      });
  
      let usersElement = <div key="users" className="users-container"><h2>Players</h2><div className="users-wrapper">{users}</div></div>
  
      let form = <AddPlayersForm onSubmit={this.updateUsers} firstNameValue={this.state.firstNameValue} avatarValue={this.state.avatarValue} onChange={this.handleChange} />
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
