import React, { useState } from 'react';
import AutoSuggest from 'react-autosuggest';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Error from './Error';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, 'Must have a character')
    .max(255, 'Must be shorter than 255')
    .required('Must enter a name'),
  email: Yup.string()
    .email('Must be a valid email address')
    .max(255, 'Must be shorter than 255')
    .required('Must enter email'),
  country: Yup.string()
    .min(1, 'Too Short!')
    .max(255, 'Too Long!')
    .required('Required')
});

const FormikForm = () => {
  const [country, setCountry] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  return (
    <Formik
      initialValues={{ name: '', email: '', country: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);

        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          resetForm();
          setCountry('');
          setSubmitting(false);
        }, 500);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue
      }) => (
        <form onSubmit={handleSubmit}>
          <h3>Some Great Form</h3>

          <div className="input-row">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              className={touched.name && errors.name ? 'has-error' : null}
            />
            <Error touched={touched.name} message={errors.name} />
          </div>

          <div className="input-row">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              className={touched.email && errors.email ? 'has-error' : null}
            />
            <Error touched={touched.email} message={errors.email} />
          </div>

          <div className="input-row">
            <label htmlFor="country">Country</label>
            <AutoSuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={async ({ value }) => {
                if (!value) {
                  setSuggestions([]);
                  return;
                }

                try {
                  const result = await axios.get(
                    `https://restcountries.eu/rest/v2/name/${value}`
                  );
                  setSuggestions(
                    result.data.map(row => ({
                      name: row.name,
                      flag: row.flag
                    }))
                  );
                } catch (error) {
                  setSuggestions([]);
                }
              }}
              onSuggestionsClearRequested={() => {
                setSuggestions([]);
              }}
              onSuggestionSelected={(event, suggestion, method) => {
                if (method === 'enter') {
                  // prevent form from submitting when enter key is selected
                  event.preventDefault();
                }
                setCountry(suggestion.name);
                // set value so Formik knows
                setFieldValue('country', suggestion.name);
              }}
              getSuggestionValue={suggestion => suggestion.name}
              renderSuggestion={suggestion => (
                <div>
                  <img
                    src={suggestion.flag}
                    alt={suggestion.name}
                    style={{ width: '25px' }}
                  />
                  {suggestion.name}
                </div>
              )}
              inputProps={{
                placeholder: 'Search for your country',
                autoComplete: 'abcd',
                value: country,
                name: 'country',
                onChange: (_event, { newValue }) => {
                  setCountry(newValue);
                },
                className:
                  touched.country && errors.country ? 'has-error' : null
              }}
            />
            <Error touched={touched.country} message={errors.country} />
          </div>

          <div className="input-row">
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default FormikForm;
