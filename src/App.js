import React, { Component } from 'react';
import Signup from './Signup';
import Login from './Login';

class App extends Component {
    
    state = {
        showDiv : true,
        activeTabSignup : '',
        activeTabLogin : ''
    };
 
    constructor() {
        super();      
        
        this.signupClickHander = this.signupClickHander.bind(this);
        this.loginClickHander = this.loginClickHander.bind(this);
    }
    
    componentDidMount() {
        this.setState({activeTabSignup : 'active'});
    }
    
    signupClickHander = () => {
        this.setState({showDiv : true});
        this.setState({activeTabSignup : 'active', activeTabLogin : ''});
    }

    loginClickHander = () => {
        this.setState({showDiv : false});
        this.setState({activeTabSignup : '', activeTabLogin : 'active'});
    }    
    
    render() {
        return (
                <div className="form">
                
                <ul className="tab-group">
                  <li className={"tab " + this.state.activeTabSignup}>
                  <a onClick={this.signupClickHander}>Sign Up</a></li>
                  <li className={"tab " + this.state.activeTabLogin}>
                  <a onClick={this.loginClickHander}>Log In</a></li>
                </ul>
                
                <div className="tab-content">
                {this.state.showDiv ? ( <div id="signup">  
                      <Signup />
                      </div>) : (<div id="login">   
                      <Login />
                </div>)}
                  
                  <div id="extra-needed">        
                      
                  </div>                  
                </div>                
              </div>
                );
    }
}

export default App;