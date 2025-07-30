const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM
import { AppHeader } from "./cmps/AppHeader.jsx"
import { HomePage } from "./pages/HomePage.jsx"
import {AboutUs} from "./pages/AboutUs.jsx"
import {BookDetails} from "./pages/BookDetails.jsx"
import {BookIndex} from "./pages/BookIndex.jsx"
import {BookEdit} from "./pages/BookEdit.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"
import { AddReview } from "./cmps/AddReview.jsx"



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
                        <Route path="/book" element={<BookIndex />} />
                        <Route path="/book/:bookId" element={<BookDetails />} />
                        <Route path="/book/:bookId/addreview" element={<AddReview />} />
                        <Route path="/book/edit/:bookId" element={<BookEdit />} />
                        <Route path="/book/edit" element={<BookEdit />} />
                    </Routes>
                </main>
                <UserMsg/>
            </section>
        </Router>
    )
}

