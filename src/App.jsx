import { Route, Routes } from 'react-router-dom'
import { routerList } from './constants/Routes'

function App() {

  return (
    <Routes>
      {
        routerList?.length>0 && 
        routerList?.map((route,index)=>
          <Route key={index} element={route?.component} path={route?.key} />
        )
      }
    </Routes>
  )
}

export default App
