import Home from "./view/home"
import Layout from "./layout"
import { BrowserRouter,Routes,Route } from "react-router-dom"

function App() {

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/todo-list/" element={<Layout/>}>
            <Route index element={<Home/>} />
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
