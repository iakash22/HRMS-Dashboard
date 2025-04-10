import { lazy, Suspense } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { OpenRoutes, PrivateRoute } from './components/core/auth';
import Loader from './components/common/Loader';
import { useSelector } from 'react-redux';
// import Pages 
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Candidates = lazy(() => import('./pages/Candidates'));
const Employees = lazy(() => import('./pages/Employees'));
const Attendance = lazy(() => import('./pages/Attendance'));
const Leaves = lazy(() => import('./pages/Leaves'));

const App = () => {
  const { accessToken } = useSelector(state => state.auth);
  return (
    <>
      <Suspense fallback={accessToken ? <Loader /> : <>Loading</>}>
        <Routes>
          <Route
            element={
              <OpenRoutes />
            }
          >
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path='/' element={<Candidates />} />
            <Route path='/employees' element={<Employees />} />
            <Route path='/attendance' element={<Attendance />} />
            <Route path='/leaves' element={<Leaves />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default App
