
import './App.scss'
import { StayIndex } from './views/StayIndex'

import { AppHeader } from './components/AppHeader'

import { StayDetails } from './views/StayDetails'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { OrderIndex } from './views/OrderIndex'
import { StayEdit } from './views/StayEdit'

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
            <Route path="/edit/:stayId?"
              element={<StayEdit />} />
          </Route>
          <Route path='/orders' element={<OrderIndex/>}/>
        </Routes>
      </section>
    </Router>
  )
}

export default App
