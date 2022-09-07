import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import mainContext from "./context/mainContext";
import Toolbar from "./components/Toolbar";
import LoginPage from "./pages/LoginPage";
import MoviesPage from "./pages/MoviesPage";
import SignUpPage from "./pages/SignUpPage";
import io from "socket.io-client"
const socket = io.connect("http://localhost:4000")

function App() {

  const [onlineUser, setOnlineUser] = useState(null)
  const [movies, setMovies] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [singleMovie, setSingleMovie] = useState(null)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const states = {
    socket,
    onlineUser,
    setOnlineUser,
    movies,
    setMovies,
    showModal,
    setShowModal,
    singleMovie,
    setSingleMovie,
    error,
    setError,
    success,
    setSuccess
  };

  useEffect(() => {
    socket.on("send-movies", movies => setMovies(movies))
    socket.on("update-user", user => {
      console.log(user)
      setOnlineUser(user)})
  }, [])

  return (
    <mainContext.Provider value={states}>
      <div className="App">
        <BrowserRouter>
          {onlineUser && <Toolbar />}
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/movies" element={<MoviesPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </mainContext.Provider>
  );
}

export default App;
