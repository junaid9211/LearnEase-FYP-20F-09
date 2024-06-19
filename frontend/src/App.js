import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './pages/Home';

import MySummary from './pages/Summary';
import Chat from './pages/Chat';
import Quiz from './pages/Quiz';
import FlashCards from "./pages/FlashCards";
import StudyPlan from "./pages/Plan";
import FileUpload from "./pages/PdfUpload";
import ChatWithpdf from "./components/ChatWithPdf";
import BookDetail from './components/BookDetail';  // Import the BookDetail component
import Faqs from "./components/Faqs";

function App() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/dashboard' element={<Home/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/faqs' element={<Faqs/>}/>

      <Route path='/chat' element={<Chat/>}/>
      <Route path='/flashcards' element={<FlashCards/>}/>
      <Route path='/quiz' element={<Quiz/>}/>
      <Route path='/summary' element={<MySummary/>}/>
      <Route path='/plan' element={<StudyPlan/>}/>
      <Route path='/pdf' element={<FileUpload/>}/>
      <Route path='/chat-pdf' element={<ChatWithpdf/>}/>

      <Route path='/book/:id' element={<BookDetail/>}/>  // Add this line
    </Routes>
  );
}

export default App;
