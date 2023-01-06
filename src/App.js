import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import '../node_modules/toastr/build/toastr.css'
import '../node_modules/toastr/build/toastr.min.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Restaurents from './Components/Restaurents';
import Categories from './Components/Categories';
import AppHeader from './Components/AppHeader';
import FoodItems from './Components/FoodItems';

function App() {
  return <>
    <BrowserRouter>
      <AppHeader />
      <Routes>
        <Route path='/' element={<Restaurents />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/food-items' element={<FoodItems />} />
      </Routes>
    </BrowserRouter>
  </>
}

export default App;
