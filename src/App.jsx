
import './App.scss'
import { StayIndex } from './views/StayIndex'

import { AppHeader } from './components/AppHeader'

import { StayDetails } from './views/StayDetails'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { OrderIndex } from './views/OrderIndex'
import { StayEdit } from './views/StayEdit'
import { DynamicModal } from './components/UI/DynamicModal'
import { DashboardHome } from './views/DashboardHome'
import { ReservationManager } from './components/dashboard/ReservationManager'
import { Dashboard } from './components/dashboard/Dashboard'
import { Listings } from './components/dashboard/Listings'
import PaymentPage from './views/PaymentPage'
import { UserMsg } from './components/UI/UserMsg'

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
            <Route path="/edit/:stayId?"
              element={<StayEdit />} />
          </Route>
          <Route path='/details/:stayId' element={<StayDetails />} />
          <Route path='/book/:stayId' element={<PaymentPage />} />
          <Route path='/order' element={<OrderIndex />} />
          <Route path='/hosting' element={<DashboardHome />} >
            <Route path='/hosting/dashboard' element={<Dashboard />} />
            <Route path='/hosting/reservations' element={<ReservationManager />} />
            <Route path='/hosting/listings' element={<Listings />} />
          </Route>
        </Routes>
        <DynamicModal />
        <UserMsg />
      </section>
    </Router>
  )
}

export default App
