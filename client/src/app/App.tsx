import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { MoviesList, MoviesInsert, MoviesUpdate } from '../pages'

import { NavBar } from '../components'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
       <Router>
            <NavBar />
            <Routes>
                <Route path="/movies/list"  element={<MoviesList/>} />
                <Route path="/movies/create"  element={<MoviesInsert/>} />
                <Route
                    path="/movies/update/:id"
                    element={<MoviesUpdate />}
                />
            </Routes>
        </Router>
    )
}

export default App