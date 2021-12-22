import React, { Component } from 'react';
import Input from './Input';

export class Form extends Component {
  handleFormSubmit = (event) => {
    event.preventDefault();

    const errors = this.validateForm();
    if (errors) {
      this.setState({ errors });
      return;
    } else this.setState({ errors: {} });

    this.handleDataSubmit();
  };

  validateForm = () => {
    const errors = {};
    const { data } = this.state;
    // if (data.username.trim() === '') {
    //   errors.username = 'Username is required';
    // }
    // if (data.password.trim() === '') {
    //   errors.password = 'Passsword is required';
    // }
    const { error } = this.dataSchema.validate(data, {
      abortEarly: false,
    });
    error &&
      error.details.map((err) => {
        errors[err.path[0]] = err.message;
      });
    return Object.keys(errors).length ? errors : null;
  };

  handleChange = ({ target: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateField(input);
    errors[input.name] = errorMessage;
    this.setState({ errors });
    !errorMessage && delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  validateField = ({ name, value }) => {
    // if (name === 'username') {
    //   if (value.trim() === '') {
    //     return 'Username is required';
    //   }
    // }
    // if (name === 'password') {
    //   if (value.trim() === '') {
    //     return 'Passsword is required';
    //   }
    // }
    const fieldSchema = this.state.schema[name];
    const { error } = fieldSchema.validate(value);
    return error ? error.message : null;
  };

  renderButton = (label) => {
    return (
      <button
        disabled={this.validateForm() ? true : false}
        type='submit'
        className='btn btn-primary'
      >
        {label}
      </button>
    );
  };

  renderInput = (name, label, type = 'text', inputRef) => {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        label={label}
        type={type}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
        inputRef={inputRef}
      />
    );
  };
}

export default Form;
