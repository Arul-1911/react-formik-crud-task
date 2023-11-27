import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const BookForm = () => {
  const [books, setBooks] = useState([]);
  const [selectedBookIndex, setSelectedBookIndex] = useState(null);

//   useEffect(() => {
//     // Simulated data fetching, replace with actual API calls if needed
//     const fetchData = async () => {
//       // Example: Fetch books data from an API endpoint
//       // const response = await fetch('your_books_api_endpoint');
//       // const data = await response.json();

//       // For demonstration, using static data
//       const staticData = [
//         { title: 'Book 1', author: 'Author 1', isbn: '123456789', publicationDate: '2023-01-01' },
//         { title: 'Book 2', author: 'Author 2', isbn: '987654321', publicationDate: '2023-02-01' },
//         { title: 'Book 3', author: 'Author 3', isbn: '123456789', publicationDate: '2023-01-01' },
//         { title: 'Book 4', author: 'Author 4', isbn: '987654321', publicationDate: '2023-02-01' },
//         { title: 'Book 5', author: 'Author 5', isbn: '123456789', publicationDate: '2023-01-01' },
//         { title: 'Book 6', author: 'Author 6', isbn: '987654321', publicationDate: '2023-02-01' },
//         // Add more books as needed
//       ];

//       setBooks(staticData);
//     };

//     fetchData();
//   }, []);

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
  };

  const handleDeleteBook = (index) => {
    const updatedBooks = [...books];
    updatedBooks.splice(index, 1);
    setBooks(updatedBooks);
    setSelectedBookIndex(null); // Reset selection after deleting
  };

  // Validation Schema using Yup
  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    author: Yup.string().required('Author is required'),
    isbn: Yup.string().required('ISBN is required'),
    publicationDate: Yup.date().required('Publication Date is required'),
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 col-lg-4">
          <Formik
            initialValues={{ title: '', author: '', isbn: '', publicationDate: '' }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              handleBookSubmit(values);
              resetForm(); // Reset the form after submission
            }}
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
