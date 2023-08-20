import { Link, NavLink } from 'react-router-dom'

function RouteGuard({ children }) {
  const isLoggedIn = true
  if (!isLoggedIn) return <Navigate to="/" />
  return <>{children}</>
}

export function AppHeader(props) {
  const headerAttrs = { className: 'app-header', id: 'Header' }

  return (
      <header {...headerAttrs}>
        <section className="container">
          <h1 className="logo">Coinbay</h1>
          {/* <nav>
          <NavLink to="/" className="nav-link">Home</NavLink>
          <NavLink to="/contact" className="nav-link">Contacts</NavLink>
        </nav> */}
        </section>
      </header>
  )
}

