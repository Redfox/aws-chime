import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '../../pages/home';
import Meeting from '../../pages/meeting';

const AppRoot: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/meeting' element={<Meeting />} />
        </Routes>
      </Router>
    </>
  )
}

export default AppRoot;