import React from 'react';

const FormikForm = () => {
  return (
    <form>
      <div className="input-row">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter your name"
        />
      </div>
    </form>
  );
};

export default FormikForm;
