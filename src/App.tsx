import { Home } from './pages/Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { StartMatch } from './pages/StartMatch';
import store from './store';


function App() {

  return (
    <Provider store={store}>
       <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<StartMatch />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
