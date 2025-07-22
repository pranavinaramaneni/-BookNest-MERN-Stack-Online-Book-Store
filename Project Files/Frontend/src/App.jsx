import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';

import Login from './User/Login';
import Signup from './User/Signup';
import Unavbar from './User/Unavbar';
import Addbook from './Seller/Addbook';
import Item from './Seller/Book';   // If unused, can be removed
import Myproducts from './Seller/Myproducts';
import Slogin from './Seller/Slogin';
import Book from './Seller/Book';
import Orders from './Seller/Orders';
import Products from './User/Products';
import Uitem from './User/Uitem';
import Myorders from './User/Myorders';
import OrderItem from './User/OrderItem';
import Uhome from './User/Uhome';
import Shome from './Seller/Shome';
import Ssignup from './Seller/Ssignup';
import Home from './Componenets/Home';  // Check folder name spelling: Components?
import Alogin from './Admin/Alogin';
import Asignup from './Admin/Asignup';
import Ahome from './Admin/Ahome';
import Users from './Admin/Users';
import Vendors from './Admin/Seller';  // Duplicate import — you also import Seller below
import Seller from './Admin/Seller';
import Wishlist from './User/Wishlist';
import Items from './Admin/Items';

function App() {
  return (
    <Routes>
      {/* Home */}
      <Route path='/' element={<Home />} />

      {/* Admin */}
      <Route path='/alogin' element={<Alogin />} />
      <Route path='/asignup' element={<Asignup />} />
      <Route path='/ahome' element={<Ahome />} />
      <Route path='/users' element={<Users />} />
      <Route path='/sellers' element={<Seller />} />
      <Route path='/items' element={<Items />} />

      {/* Seller */}
      <Route path='/slogin' element={<Slogin />} />
      <Route path='/ssignup' element={<Ssignup />} />
      <Route path='/shome' element={<Shome />} />
      <Route path='/myproducts' element={<Myproducts />} />
      <Route path='/addbook' element={<Addbook />} />
      <Route path='/book/:id' element={<Book />} />
      <Route path='/orders' element={<Orders />} />

      {/* User */}
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/nav' element={<Unavbar />} />
      <Route path='/uhome' element={<Uhome />} />
      <Route path='/uproducts' element={<Products />} />
      <Route path='/uitem/:id' element={<Uitem />} />
      <Route path='/orderitem/:id' element={<OrderItem />} />
      <Route path='/myorders' element={<Myorders />} />
      <Route path='/wishlist' element={<Wishlist />} />
    </Routes>
  );
}

export default App;
