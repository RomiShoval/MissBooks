const { Link, NavLink } = ReactRouterDOM
import "../assets/style/cmps/AppHeader.css"

export function AppHeader() {
    return (
        <header className="app-header full main-layout">
            <section>
                <h1>Book App</h1>
                <nav className="app-nav">
                    <NavLink to="/home" >Home</NavLink>
                    <NavLink to="/about" >About Us</NavLink>
                    <NavLink to="/book" >Books</NavLink>
                </nav>
            </section>
        </header>
    )
}