import logo from './logo.svg';
import './App.css';
import FormData from './FormData';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import ProductList from './ProductList';
// import ProductDetail from './ProductDetail';
import ProductList1 from './ProductList1';
import ProductDetail1 from './ProductDetail1';
import FormData1 from './FormData1';
import { createContext, useEffect, useState } from 'react';
export const UserContext = createContext();
export const NameContext=createContext();

const name="vishakha velari"

function App() {
  const [counter , setCount] = useState(0);
  useEffect(()=>{
    setTimeout(()=>{
      setCount(prev=> prev+1)
    },3000)
  })

  return (
    <UserContext.Provider value={counter}>
      <NameContext.Provider value={name}>
      <Router>
        <Routes>
          <Route path="/form" element={<FormData/>}/>
          <Route path="/form1" element={<FormData1/>}/>
          {/* <Route path="/product" element={<ProductList/>}/> */}
          {/* <Route path="/product/:id" element={<ProductDetail/>}/> */}
          {/* <Route path="/product" element={<ProductL/>}/> */}
          <Route path='/product' element={<ProductList1/>}/>
          <Route path='/product/:id' element={<ProductDetail1/>}/>
        </Routes>
      </Router>
      </NameContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
