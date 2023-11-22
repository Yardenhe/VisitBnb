
import './App.scss'
import { StayIndex } from './views/StayIndex'

import { AppHeader } from './components/AppHeader'

import { StayDetails } from './views/StayDetails'

import { Route, HashRouter as Router, Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
        <AppHeader />
      <section className='main-layout'>
        <Routes>
          <Route 
          path='/' 
          element={<StayIndex />}
          >
            <Route
              path='/details/:stayId'
              element={<StayDetails />}
            />
          </Route>
        </Routes>
      </section>
    </Router>
  )
}

export default App
