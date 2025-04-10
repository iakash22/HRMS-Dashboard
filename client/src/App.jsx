import { lazy, Suspense } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { OpenRoutes, PrivateRoute } from './components/core/auth';

// import Pages 
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Candidates = lazy(() => import('./pages/Candidates'));
const Employees = lazy(() => import('./pages/Employees'));
const Attendance = lazy(() => import('./pages/Attendance'));
const Leaves = lazy(() => import('./pages/Leaves'));

const App = () => {

  return (
    <>
      <Suspense fallback={<>Loading...</>}>
        <Routes>
          <Route
            element={
              <OpenRoutes />
            }
          >
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route>
          <Route path='/' element={<Candidates />} />
          <Route path='/employees' element={<Employees />} />
          <Route path='/attendance' element={<Attendance />} />
          <Route path='/leaves' element={<Leaves />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
