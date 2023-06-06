import { Routes, Route } from 'react-router-dom';
import Layout from './layout';
import CommentForm from './commentForm';
import Login from './login';
import StudentForm from './studentForm';
import Signup from './signup';
import Home from './home';
import Students from './students';
import StudentLayout from './studentLayout';
import NotFound from './notFound';
import Student from './student';
import StudentEditForm from './studentEditForm';
import Comment from './comment';
import CommentEditForm from './commentEditForm';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* public routes */}
        <Route index element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />

        {/* protected routes */}
        <Route path='students/' element={<StudentLayout />}>
          <Route index element={<Students />} />
          <Route path='new' element={<StudentForm />} />
          <Route path=':id/' element={<Student />}>
            <Route index element={<Comment />} />
          </Route>
          <Route path=':id/edit' element={<StudentEditForm />} />
          <Route path=':id/new' element={<CommentForm />} />
          <Route path=':id/comments/:comId' element={<CommentEditForm />} />
        </Route>

        {/* catch all */}
        <Route patch='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
