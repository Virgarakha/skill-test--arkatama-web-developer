import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import Penumpang from './pages/Penumpang/Penumpang'
import Travel from './pages/Travel/Travel'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route element={<PrivateRoute/>}>
            <Route path='/' element={<Penumpang />} />
            <Route path='/travel' element={<Travel />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App