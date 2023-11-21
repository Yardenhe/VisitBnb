
import './App.scss'
import { StayIndex } from './views/StayIndex'
import { StayDetails } from './components/StayDetails'
import { AppHeader } from './components/AppHeader'
import { Route, HashRouter as Router, Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
      <section className='app'>
        <AppHeader />
        <Routes>
          <Route path='/' element={<StayIndex />}>
            <Route
              element={<StayDetails />}
            />
          </Route>
        </Routes>
      </section>
    </Router>
  )
}

export default App
