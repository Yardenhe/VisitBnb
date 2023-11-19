
import './App.css'
import { StayIndex } from './views/StayIndex'
import { StayDetails } from './components/StayDetails'
import { Route, HashRouter as Router, Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
      <section className='app'>

        <Routes>
          <Route element={<StayIndex />}>
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
