import './App.css';

import { BrowserRouter, Routes, Route, Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import UserRegistration from './pages/UserRegistration';
import HomePage from './pages/HomePage';
import SymptomTracking from './pages/SymptomTracking';
import MedicationAndDiet from './pages/MedicationAndDiet';
import MedicalQA from './pages/MedicalQA';
import LoginForm from './pages/LoginForm';
import MotivationalQuotes from './pages/MotivationalQuotes';


const router = createBrowserRouter([
  { path:"/", element:<LandingPage /> },
  { path:"/newuser", element:<UserRegistration /> },
  { path:"/home", element:<HomePage /> },
  { path:"/symptoms", element:<SymptomTracking /> },
  { path:"/medication", element:<MedicationAndDiet /> },
  { path:"/qna", element:<MedicalQA /> },
  { path:"/login", element:<LoginForm /> },
  { path:"/quotes", element:<MotivationalQuotes /> }
]);

function App() {
  return (<>
    <RouterProvider router = {router}/>
    <Outlet>
    </Outlet>
    </>
  );
}

export default App;
