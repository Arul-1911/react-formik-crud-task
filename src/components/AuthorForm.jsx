import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';

const AuthorForm = () => {
  const [authors, setAuthors] = useState([]);
  const [selectedAuthorIndex, setSelectedAuthorIndex] = useState(null);

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    birthDate: Yup.date().required('Required'),
    biography: Yup.string().required('Required'),
  });

  const initialValues = {
    name: '',
    birthDate: '',
    biography: '',
  };

  const onSubmit = (values, { resetForm }) => {
    if (selectedAuthorIndex === null) {
      // Add new author
      setAuthors([...authors, values]);
    } else {
      // Edit existing author
      const updatedAuthors = [...authors];
      updatedAuthors[selectedAuthorIndex] = values;
      setAuthors(updatedAuthors);
      setSelectedAuthorIndex(null); // Reset selection after editing
    }

    // Clear form values
    resetForm();
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const handleEditAuthor = (index) => {
    setSelectedAuthorIndex(index);
    formik.setValues(authors[index]);
  };

  const handleDeleteAuthor = (index) => {
    const updatedAuthors = [...authors];
    updatedAuthors.splice(index, 1);
    setAuthors(updatedAuthors);
    setSelectedAuthorIndex(null); // Reset selection after deleting
    formik.resetForm(); // Clear form values
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="invalid-feedback">{formik.errors.name}</div>
              ) : null}
            </div>
            <div className="form-group">
              <label>Birth Date:</label>
              <input
                type="date"
                name="birthDate"
                value={formik.values.birthDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`form-control ${formik.touched.birthDate && formik.errors.birthDate ? 'is-invalid' : ''}`}
              />
              {formik.touched.birthDate && formik.errors.birthDate ? (
                <div className="invalid-feedback">{formik.errors.birthDate}</div>
              ) : null}
            </div>
            <div className="form-group">
              <label>Biography:</label>
              <input
                type="text"
                name="biography"
                value={formik.values.biography}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`form-control ${formik.touched.biography && formik.errors.biography ? 'is-invalid' : ''}`}
              />
              {formik.touched.biography && formik.errors.biography ? (
                <div className="invalid-feedback">{formik.errors.biography}</div>
              ) : null}
            </div>
            <br />
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
        <div className="col-md-8">
          <table className="table custom-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Birth Date</th>
                <th>Biography</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {authors.map((author, index) => (
                <tr key={index}>
                  <td>{author.name}</td>
                  <td>{author.birthDate}</td>
                  <td>{author.biography}</td>
                  <td>
                    <button onClick={() => handleEditAuthor(index)} className="btn btn-warning">
                      Edit
                    </button>{' '}
                    <button onClick={() => handleDeleteAuthor(index)} className="btn btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AuthorForm;
