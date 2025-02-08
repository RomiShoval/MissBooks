const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM
import { AppHeader } from "./cmps/AppHeader.jsx"
import { HomePage } from "./pages/HomePage.jsx"
import {AboutUs} from "./pages/AboutUs.jsx"
import {BookIndex} from "./pages/BookIndex.jsx"



export function App() {
    return (
        <Router>
            <section className="app">
                <AppHeader />
                <main className="main-layout">
                    <Routes>
                        <Route path="/" element={<Navigate to="/home" />} />
                        <Route path ="/home" element = {<HomePage/>}/>
                        <Route path ="/about" element = {<AboutUs/>}/>
                        <Route path ="/books" element = {<BookIndex/>}/>
                    </Routes>
                </main>
            </section>
        </Router>
    )
}

