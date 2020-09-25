import React from 'react';
import './App.css';
import {TransitionGroup, CSSTransitionGroup} from 'react-transition-group';

class User extends React.Component{
  componentDidMount(){

  }
  render(){
    const element = 
      <div className="user">
        <div className="image-wrapper">
          <img src={"/assets/"+this.props.avatar+'.png'} alt={this.props.nickname + '\'s avatar'} />
        </div>
        <div className="info-wrapper">
          <p>{this.props.nickname}</p>
        </div>
      </div>;

    return (element);
  }
}

class Player extends React.Component{
  render(){
    const element = 
      <div key={this.props.nickname} class="player-container">
        <img src={'/assets/'+this.props.avatar+'.png'} alt={this.props.nickname + '\'s avatar'} />
        <p>{this.props.nickname}</p>
      </div>
    return (element)
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
            <ul className="choose-avatar-list">
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
      addPlayers: false,
      startPressed: false,
      users: Array(0) 
    }
    this.handleChange = this.handleChange.bind(this);
    this.updateUsers = this.updateUsers.bind(this);
    this.addPlayers = this.addPlayers.bind(this);
    this.startGame = this.startGame.bind(this);
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
      addPlayers: startPressed
    });
  }

  startGame(){
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
          <Player key={'user-'+key} nickname={user.nickname} avatar={user.avatar} />
        );
      })
      let usersElement =
      <div className="instructions-screen">
        <div className="players-container">
          <CSSTransitionGroup
            transitionName="users"
            transitionEnterTimeout={500}>
                        {users}
            </CSSTransitionGroup>
        </div>
        <CSSTransitionGroup
            transitionName="instructions"
            transitionEnterTimeout={800}>
              <h2 className="instructionsTitle">Instructions</h2>
              <p>Miracle is a new type of drinking game. It might take some time getting used to but once you start playing you're going to need a miracle if you have any hope getting out of this game sober.</p>
              <p>Every turn, a player will pick a card from the top of the deck.</p>
              <ul>
                <li>This card could be a simple ring of fire card e.g. 2 is you, 3 is me</li>
                <li>The card could also be a head to head round against a player of your choice. This could be a reaction test, charades, or anything in between.</li>
                <li></li>
              </ul>
            </CSSTransitionGroup>
      </div>;
      return (usersElement);
    }else if(this.state.addPlayers){
        let users = this.state.users.map( (user, key) => (
          <div key={key} className="user-container">
            <User nickname={user.nickname} avatar={user.avatar} />
          </div>
        ));
       let usersElement = <div key="users" className="users-container"><h2>Players</h2><div className="users-wrapper">
         <CSSTransitionGroup
          transitionName="users"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {users}
          </CSSTransitionGroup>
        </div></div>
  
      let form = <AddPlayersForm key="form" onSubmit={this.updateUsers} firstNameValue={this.state.firstNameValue} avatarValue={this.state.avatarValue} onChange={this.handleChange} />

      let startedButton = 
        <div key="start" className="get-started-container">
          <h3>Is everybody ready?</h3>
          <button className={"get-started-button " + (this.state.users.length >= 2 ? '' : 'disabled')} disabled={!this.state.users.length >= 2} onClick={this.startGame}>Start</button>
        </div>
      render = [
        usersElement,
        form,
        startedButton
      ]

    }else{
      let intro = <div key="intro" className="intro"><h2>No players added!</h2></div>
      let addPlayers = 
        <div key="add-button" className="start-button-container">
          <button className="add-players-button" onClick={this.addPlayers}>Add Players</button>
        </div>;
      render = 
        <CSSTransitionGroup
          transitionName="intro"
          transitionLeaveTimeout={300}
          transitionAppear={true}
          transitionAppearTimeout={5000}
        >
        <div key="intro-container" className="intro-container">
          <div className="intro-wrapper">
            {intro}{addPlayers}
          </div>
        </div>
        </CSSTransitionGroup>;
    }

    return render;
  }
}

function App() {

  const header = 
  <CSSTransitionGroup
    transitionName="header"
    transitionAppear={true}
    transitionAppearTimeout={1000}
    key="header-group">
      <header key="header" className="header">
        <div className="title">
          <h1>Welcome to Miracle</h1>
        </div>
      </header>
  </CSSTransitionGroup>;

  const game = <Game key="game" />

  return [
    header,
    game
  ];
}

export default App;
