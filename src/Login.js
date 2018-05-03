import React, { Fragment, Component } from 'react';

function Required(props) {
  return (
    <span className="req">*</span>
  );
}

class FormField extends Component {
    render() {
        return (
                <div className="field-wrap">
                    <label className={this.props.fieldClass}>
                      {this.props.fieldLabel}<Required />
                    </label>
                    <input type={this.props.typeOf} required autoComplete="off" name={this.props.fieldname}
                    onKeyUp={this.props.keyuphandler} ref={this.props.refer} 
                    onChange={this.props.changehandler} value={this.props.fieldValue}
                   />                          
                </div>
                );
    }
}

class Login extends Component {
    
     state = {
            email : '',
            password : '',
            emailLabelClass : '',
            passwordLabelClass : '',
            activeHighlightStr : 'active highlight'
       };
 
    constructor() {
        super();
        
        this.handleEmailKeyUp = this.keyUpHandler.bind(this, 'email');
        this.handlePasswordKeyUp = this.keyUpHandler.bind(this, 'password');
        this.clickValidateLogin = this.clickValidateLogin.bind(this);
        this.handlePropertyChange = this.handlePropertyChange.bind(this);
    }
  
    keyUpHandler(refName, e) {  
        switch(refName) {
        case 'email':   
            this.setState({emailLabelError : ''});
            if(e.target.value !== '') {
                this.changeEmailLabel(this.state.activeHighlightStr);
            } else {
                this.changeEmailLabel('');
            }        
        break;        
        case 'password':
            this.setState({passwordLabelError : ''});
            if(e.target.value !== '') {
                this.changePasswordLabel(this.state.activeHighlightStr);
            } else {
                this.changePasswordLabel('');
            }
        break;
        default:
        break;
        }
    }
    
    changeEmailLabel = (str) => {
        this.setState({emailLabelClass : str});
    }
    
    changePasswordLabel = (str) => {
        this.setState({passwordLabelClass : str});
    }
    
    clickValidateLogin() {
        this.submitLogin();
    }
    
    submitLogin() {
        const data = {email : this.state.email, password : this.state.password};
        
        const searchParams = Object.keys(data).map((key) => {
          return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
        }).join('&');
        var self = this;
        fetch('login', {
            method: 'POST',
            body: searchParams,
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then((response) => response.json()
        .catch(err => {
            console.err(`'${err}' happened!`);
            return {};
        })).then(function (body) {
            console.log(body);
            if(body.redirect) {
                console.log('has redirect uri');
                window.location.replace(body.redirect);
            }
        })
        .catch(error => {
            alert(error);
         });
         
        this.setState({email : '', password : ''});
        this.changeEmailLabel('');
        this.changePasswordLabel('');
    }
    
    handlePropertyChange = (refName, e) => {
        this.setState({[refName] : e.target.value});
    }

    changeEmailLabel = (str) => {
        this.setState({emailLabelClass : str});
    }
    
    changePasswordLabel = (str) => {
        this.setState({passwordLabelClass : str});
    }
    render() {
    return (
      <Fragment>
      <form action="/" method="post" className="form1">
        <FormField fieldLabel="Email Address" fieldClass={this.state.emailLabelClass}  
                     fieldname="email" keyuphandler={this.handleEmailKeyUp} typeOf="text" 
                     refer="email" changehandler={(e) => this.handlePropertyChange('email', e)}
                     fieldValue={this.state.email} /> 
            
          
        <FormField fieldLabel="Password" fieldClass={this.state.passwordLabelClass}  
                     fieldname="password" keyuphandler={this.handlePasswordKeyUp} typeOf="password" 
                     refer="password" changehandler={(e) => this.handlePropertyChange('password', e)}
                     fieldValue={this.state.password} /> 
              
        <p className="forgot"><a href="#">Forgot Password?</a></p>  
        <button type="button" className="button button-block" onClick={this.clickValidateLogin}>
        Login </button>
          
        </form>
        </Fragment>
    );
  }
}

export default Login;