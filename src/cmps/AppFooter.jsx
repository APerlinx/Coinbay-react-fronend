import { Link, NavLink } from 'react-router-dom'

function RouteGuard({ children }) {
  const isLoggedIn = true
  if (!isLoggedIn) return <Navigate to="/" />
  return <>{children}</>
}

export function AppFooter(props) {
  const headerAttrs = { className: 'app-footer', id: 'Footer' }

  return (
    <footer {...headerAttrs}>
      <section className="container">
        <nav>
          <NavLink to="/" className="nav-link">Home</NavLink>
          <NavLink to="/contact" className="nav-link">Contacts</NavLink>
          <NavLink to="/transfer/list" className="nav-link">Profile</NavLink>
          <NavLink to="/chart" className="nav-link">Chart</NavLink>

        </nav>
      </section>
    </footer>
  )
}

