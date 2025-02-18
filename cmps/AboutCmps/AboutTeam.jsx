import "../../assets/style/cmps/AboutTeam.css"
const {Link} = ReactRouterDOM
export function AboutTeam(){
    return(
        <section className="about-team">
            <h2>Our Team</h2>
            <ul>
                <li>Proffesor linkolen</li>
                <li>Dr Birenabum</li>
            </ul>
            <button type="button" className="back-btn" ><Link to="/about">Back</Link></button>
        </section>
    )
}