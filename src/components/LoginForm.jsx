import React from 'react';
import Joi from 'joi';
import Form from './common/Form';

export class LoginForm extends Form {
  state = {
    data: {
      username: '',
      password: '',
    },
    errors: {},
    schema: {
      username: Joi.string().min(3).max(30).required().label('Username'),
      password: Joi.string().min(3).max(30).required().label('Password'),
    },
  };

  dataSchema = Joi.object({
    username: this.state.schema.username,
    password: this.state.schema.password,
  });

  usernameRef = React.createRef();

  componentDidMount = () => {
    this.usernameRef.current.focus();
  };

  handleDataSubmit = () => {
    // Validate data and sends data to server
    console.log('Form Submitted', this.state.data);
  };

  render() {
    return (
      <div>
        <h3 className='display-3 text-center mt-5 mb-5'>Login</h3>
        <form onSubmit={this.handleFormSubmit}>
          {this.renderInput('username', 'Username', 'text', this.usernameRef)}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderButton('Login')}
        </form>
      </div>
    );
  }
}

export default LoginForm;
