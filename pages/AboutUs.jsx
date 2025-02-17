import "../assets/style/pages/AboutUs.css"
const { NavLink } = ReactRouterDOM

export function AboutUs() {
    return (
    <div>
        <div className="about-us">
            <h2>About Us</h2>
            <p>We are an app that presents some book and its deatils.</p>
        </div>
        <nav>
        <button><NavLink to="/about/team">Team</NavLink></button>
        <button><NavLink to="/about/goal">Goal</NavLink></button>
        </nav>
    </div>     
    )  
}

