import React, { Fragment, Component } from 'react';
import ResultModal from './ResultModal';

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
                      {this.props.fieldLabel } {this.props.fieldLabelError }<Required />
                    </label>
                    <input type={this.props.typeOf} required="" autoComplete="off" name={this.props.fieldname}
                    onKeyUp={this.props.keyuphandler} ref={this.props.refer} 
                    onChange={this.props.changehandler} value={this.props.fieldValue}
                   />
                          
                </div>
                );
    }
}

class Signup extends Component {
    
     state = {
            firstname : '',
            lastname : '',
            email : '',
            password : '',
            firstnameLabelClass : '',
            firstnameLabelError : '',
            lastnameLabelClass : '',
            lastnameLabelError : '',
            emailLabelClass : '',
            emailLabelError : '',
            passwordLabelClass : '',
            passwordLabelError : '',
            activeHighlightStr : 'active highlight',
            requiredValidationText : 'is Required',
            atleastCharacters : 'be atleast 4 characters',
            validEmail : 'must be a Valid Email',
            validPassword : '8 characters, Atleast 1 upper & 1 lower & 1 number',
            openModal : false,
            modalText : 'test'
       };
 
    constructor() {
        super();
        
        this.handleFirstnameKeyUp = this.keyUpHandler.bind(this, 'firstname');
        this.handleLastnameKeyUp = this.keyUpHandler.bind(this, 'lastname');
        this.handleEmailKeyUp = this.keyUpHandler.bind(this, 'email');
        this.handlePasswordKeyUp = this.keyUpHandler.bind(this, 'password');
        this.clickValidateSignup = this.clickValidateSignup.bind(this);
        this.handlePropertyChange = this.handlePropertyChange.bind(this);
    }
  
    keyUpHandler(refName, e) {  
        switch(refName) {
        case 'firstname':
            this.setState({firstnameLabelError : ''});
            if(e.target.value !== '') {
                this.changeFirstnameLabel(this.state.activeHighlightStr);
            } else {
                this.changeFirstnameLabel('');
            }
        break;
        case 'lastname':
            this.setState({lastnameLabelError : ''});
            if(e.target.value !== '') {
                this.changeLastnameLabel(this.state.activeHighlightStr);
            } else {
                this.changeLastnameLabel('');
            }
        break;
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
    
    changeFirstnameLabel = (str) => {
        this.setState({firstnameLabelClass : str});
    }
    
    changeLastnameLabel = (str) => {
        this.setState({lastnameLabelClass : str});
    }
    
    changeEmailLabel = (str) => {
        this.setState({emailLabelClass : str});
    }
    
    changePasswordLabel = (str) => {
        this.setState({passwordLabelClass : str});
    }
    
    validateField(fieldName, value) {        
        switch(fieldName) {
            case 'firstname':
              if(value === '') {
                  this.setState({firstnameLabelError : this.state.requiredValidationText});
                  return false;
              } else if(value.length < 4) {
                  this.setState({firstnameLabelError : this.state.atleastCharacters});
                  return false;
              }
              return true;
            case 'lastname':
              if(value === '') {
                  this.setState({lastnameLabelError : this.state.requiredValidationText});
                  return false;
              } else if(value.length < 4) {
                  this.setState({lastnameLabelError : this.state.atleastCharacters});
                  return false;
              }
              return true;
            case 'email' :
              let isEmailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
              if(value === '') {
                  this.setState({emailLabelError : this.state.requiredValidationText});
                  return false;
              } else if(!isEmailValid) {
                  this.setState({emailLabelError : this.state.validEmail});
                  return false;
              }
              return true;
            case 'password' :
              let isPasswordValid = value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i);
              if(value === '') {
                  this.setState({passwordLabelError : this.state.requiredValidationText});
                  return false;
              } else if(!isPasswordValid) {
                  this.setState({passwordLabelError : this.state.validPassword});
                  return false;
              }
              return true;
            default:
            break;
        }
    }
    
    clickValidateSignup() {
        let isFormValid = true;
        isFormValid = this.validateField('firstname', this.state.firstname);
        isFormValid = this.validateField('lastname', this.state.lastname);
        isFormValid = this.validateField('email', this.state.email);
        isFormValid = this.validateField('password', this.state.password);
        
        if(isFormValid) {
            this.submitSignup();
        }
    }
    
    submitSignup() {
        const data = {firstname : this.state.firstname, lastname : this.state.lastname, 
            email : this.state.email, password : this.state.password};
        
        const searchParams = Object.keys(data).map((key) => {
          return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
        }).join('&');
        var self = this;
        fetch('register', {
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
            console.log(body.result);
            return self.processReq(body.result);
        })
        .catch(error => {
            alert(error);
         });
         
        this.setState({firstname : '', lastname : '', email : '', password : ''});
        this.changeFirstnameLabel('');
        this.changeLastnameLabel('');
        this.changeEmailLabel('');
        this.changePasswordLabel('');
    }
    
    processReq = (json) => {        
        this.setState({modalText : json, openModal : true});
    }
    
    handlePropertyChange = (refName, e) => {
        this.setState({[refName] : e.target.value});
    }
    
    onCloseModal = () => {
        this.setState({openModal : false});
    };

    render() {
    return (
      <Fragment>
      <form action="/" method="post" className="form1">
          
        <div className="top-row">
        <FormField fieldClass={this.state.firstnameLabelClass} 
                   fieldLabel="First Name" fieldLabelError={this.state.firstnameLabelError}
                   fieldname="firstname" keyuphandler={this.handleFirstnameKeyUp} typeOf="text"
                   refer="firstname" changehandler={(e) => this.handlePropertyChange('firstname', e)}
                   fieldValue={this.state.firstname} />          

        
        <FormField fieldClass={this.state.lastnameLabelClass} 
                     fieldLabel="Last Name" fieldLabelError={this.state.lastnameLabelError}
                     fieldname="lastname" keyuphandler={this.handleLastnameKeyUp} typeOf="text"
                     refer="lastname" changehandler={(e) => this.handlePropertyChange('lastname', e)}
                     fieldValue={this.state.lastname} />  
                     
            
        </div>

        <FormField fieldClass={this.state.emailLabelClass} 
                     fieldLabel="Email Address" fieldLabelError={this.state.emailLabelError}
                     fieldname="email" keyuphandler={this.handleEmailKeyUp} typeOf="text" 
                     refer="email" changehandler={(e) => this.handlePropertyChange('email', e)}
                     fieldValue={this.state.email} /> 
            
          
        <FormField fieldClass={this.state.passwordLabelClass} 
                     fieldLabel="Password" fieldLabelError={this.state.passwordLabelError}
                     fieldname="password" keyuphandler={this.handlePasswordKeyUp} typeOf="password" 
                     refer="password" changehandler={(e) => this.handlePropertyChange('password', e)}
                     fieldValue={this.state.password} /> 
              
          
        <button type="button" className="button button-block"
          onClick={this.clickValidateSignup}>Sign up</button>
          
        </form>
        <ResultModal openModal={this.state.openModal} closeModal={this.onCloseModal} 
                modalText={this.state.modalText} />
        </Fragment>
    );
  }
}

export default Signup;