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
import { BookAdd } from "./cmps/BookAdd.jsx"
import { AboutGoal } from "./cmps/AboutCmps/AboutGoal.jsx"
import { AboutTeam } from "./cmps/AboutCmps/AboutTeam.jsx"
import { Dashboard } from "./cmps/DashBoard.jsx"



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
                        <Route path ="/about/team" element = {<AboutTeam/>}/>
                        <Route path ="/about/goal" element = {<AboutGoal/>}/>
                        <Route path="/book" element={<BookIndex />} />
                        <Route path="/book/add" element={<BookAdd/>}></Route>
                        <Route path="/book/:bookId" element={<BookDetails />} />
                        <Route path="/book/:bookId/addreview" element={<AddReview />} />
                        <Route path="/book/edit/:bookId" element={<BookEdit />} />
                        <Route path="/book/edit" element={<BookEdit />} />
                        <Route path="/dashboard" element={<Dashboard />}/>                    
                    </Routes>
                </main>
                <UserMsg/>
            </section>
        </Router>
    )
}

