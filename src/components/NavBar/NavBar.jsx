import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return <>
       <nav className="navbar navbar-expand-lg bg-body-brimary border-bottom pt-4">
          <div className="container">
            <Link className="navbar-brand fs-3 m-auto" to={'/'}>Customer's transactions</Link>
          </div>
      </nav>
  </>
}
