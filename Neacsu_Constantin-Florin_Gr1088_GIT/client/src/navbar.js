import { NavLink } from 'react-router-dom'

function Navbar() {
    return (
        <nav>
            <NavLink
                to="/"
                className="nav-link"
            >
                Movies
            </NavLink>
            <NavLink
                to="/crewMembers"
                className="nav-link"
            >
                Crew Members
            </NavLink>
        </nav>
    )
}

export default Navbar;