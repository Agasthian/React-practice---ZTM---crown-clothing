import {Routes , Route} from 'react-router-dom'

import Home from './routes/home/home.component'
import Navigation from './routes/navigation/navigation.component'
const App = () => {

  
  
  const Shop = ()=>{
    return(
      <div>
        <p>This is a shop page</p>
      </div>
    )
  }
  return (
    <Routes>
      <Route element={<Navigation/>}>
        <Route index element={<Home/>}/>
        <Route path='shop' element={<Shop/>} />
      </Route>
    </Routes>
    
  );
}

export default App;
