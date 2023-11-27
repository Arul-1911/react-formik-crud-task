import AuthorForm from "./components/AuthorForm";
import BookForm from "./components/BookForm";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/books" element={<BookForm/>} />
          <Route path="/authors" element={<AuthorForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;