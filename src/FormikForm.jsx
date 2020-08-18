import React from 'react';
import { Formik } from 'formik';

const FormikForm = () => {
  return (
    <Formik initialValues={{ name: '', email: '' }}>
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <form>
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
            />
          </div>

          <div className="input-row">
            <label htmlFor="email">EMAIL</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
          </div>

          <div className="input-row">
            <button type="submit">Submit</button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default FormikForm;
