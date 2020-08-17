import React, { useState, useEffect } from 'react';
import Error from './Error';

function validate(values) {
  let errors = {};

  if (!values.name) {
    errors.name = 'Required field';
  }

  return errors;
}
export default function VanillaForm() {
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors(validate({ name }));
  }, [name]);

  return (
    <form>
      <div className="input-row">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={event => {
            setName(event.target.value);
          }}
          value={name}
        />
        <Error message={errors.name} />
      </div>
    </form>
  );
}
