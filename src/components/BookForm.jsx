// src/components/BookForm.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

let formik; // Declare formik variable

const BookForm = () => {
  const [books, setBooks] = useState([]);
  const [selectedBookIndex, setSelectedBookIndex] = useState(null);

  // Validation Schema using Yup
  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    author: Yup.string().required('Author is required'),
    isbn: Yup.string().required('ISBN is required'),
    publicationDate: Yup.date().required('Publication Date is required'),
  });

  const handleBookSubmit = (values) => {
    if (selectedBookIndex === null) {
      // Add new book
      setBooks([...books, values]);
    } else {
      // Edit existing book
      const updatedBooks = [...books];
      updatedBooks[selectedBookIndex] = values;
      setBooks(updatedBooks);
      setSelectedBookIndex(null); // Reset selection after editing
    }
  };

  const handleEditBook = (index) => {
    setSelectedBookIndex(index);
    // Populate the form fields with the values of the selected book
    const selectedBook = books[index];
    formik.setValues(selectedBook);
  };

  const handleDeleteBook = (index) => {
    const updatedBooks = [...books];
    updatedBooks.splice(index, 1);
    setBooks(updatedBooks);
    setSelectedBookIndex(null); // Reset selection after deleting
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 col-lg-4">
          <Formik
            initialValues={
              selectedBookIndex !== null
                ? books[selectedBookIndex] // Set initial values for editing
                : { title: '', author: '', isbn: '', publicationDate: '' } // Set initial values for adding
            }
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              handleBookSubmit(values);
              resetForm(); // Reset the form after submission
            }}
            innerRef={(formikInstance) => (formik = formikInstance)} // Assign formik reference
          >
            <Form>
              <div className="form-group">
                <label>Title:</label>
                <Field type="text" name="title" className="form-control" />
                <ErrorMessage name="title" component="div" className="text-danger" />
              </div>

              <div className="form-group">
                <label>Author:</label>
                <Field type="text" name="author" className="form-control" />
                <ErrorMessage name="author" component="div" className="text-danger" />
              </div>

              <div className="form-group">
                <label>ISBN:</label>
                <Field type="text" name="isbn" className="form-control" />
                <ErrorMessage name="isbn" component="div" className="text-danger" />
              </div>

              <div className="form-group">
                <label>Publication Date:</label>
                <Field type="date" name="publicationDate" className="form-control" />
                <ErrorMessage name="publicationDate" component="div" className="text-danger" />
              </div>

              <br />

              <div>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </Form>
          </Formik>
        </div>
        <div className="col-md-8">
          <table className="table custom-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>ISBN</th>
                <th>Publication Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={index}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.isbn}</td>
                  <td>{book.publicationDate}</td>
                  <td>
                    <button onClick={() => handleEditBook(index)} className="btn btn-warning">
                      Edit
                    </button>{' '}
                    <button onClick={() => handleDeleteBook(index)} className="btn btn-danger">
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

export default BookForm;
