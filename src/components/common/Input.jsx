import React from 'react';

function Input({ name, label, inputRef, error, ...rest }) {
  return (
    <div className='mb-3'>
      <label htmlFor={name} className='form-label'>
        {label}
      </label>
      <input
        {...rest}
        name={name}
        id={name}
        ref={inputRef}
        className={error ? 'form-control is-invalid' : 'form-control'}
        aria-describedby='validation-error'
      />
      {error && (
        <div id='validation-error' className='invalid-feedback'>
          {error}
        </div>
      )}
    </div>
  );
}

export default Input;
