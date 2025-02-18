import "../../assets/style/cmps/AboutGoal.css"
const {Link} = ReactRouterDOM
export function AboutGoal(){
    return(
        <section className="about-goal">
            <h2>Our Goals</h2>
            <ul>
                <li>Make the search for books easier to you</li>
                <li>Let the user use in Google Api Books</li>
            </ul>
            <button type="button" className="back-btn" ><Link to="/about">Back</Link></button>
        </section>
    )
}