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
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setErrors(validate({ name }));
  }, [name]);

  return (
    <form
      onSubmit={event => {
        event.preventDefault();

        if (Object.keys(validate({ name })).length > 0) {
          return;
        }

        setSubmitting(true);

        setTimeout(() => {
          const values = { name };
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
          setName('');
        }, 500);
      }}
    >
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
          className={errors.name ? 'has-error' : null}
        />
        <Error message={errors.name} />
      </div>

      <div className="input-row">
        <button type="submit" disabled={submitting}>
          Submit
        </button>
      </div>
    </form>
  );
}
