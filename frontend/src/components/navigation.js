/* eslint-disable multiline-ternary */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade'

const NavLinks = [
  {
    title: 'inicio',
    path: '/'
  },
  {
    title: 'Sobre Mi',
    path: '/sobre-mi'
  },
  {
    title: 'Proyectos',
    path: '/proyectos'
  }
]

const handleMenu = () => {
  document.getElementById('menu').classList.toggle('open')
  document.getElementById('menu').classList.contains('open')
    ? (document.body.style.overflowY = 'hidden')
    : (document.body.style.overflowY = 'scroll')
}

const Navigation = () => {
  const [isAuthenticated, setAuthenticated] = useState(
    localStorage.getItem('isAuthenticated')
  )
  const Logout = () => {
    localStorage.removeItem('isAuthenticated')
    setAuthenticated(false)
  }
  return (
    <>
      <Fade left>
        <div
          id="nav"
          className="px-4 flex flex-row items-center justify-between h-16 w-screen fixed top-0 left-0 bg-white z-30 lg:w-full"
        >
          <h1 className="font-bold">
            <Link to="/">{'<CODEST/>'}</Link>
          </h1>
          <img
            className="w-7 transition-transform hover:scale-110"
            src="https://codestapi.herokuapp.com/assets/menu.png"
            onClick={handleMenu}
            alt="menu-btn"
          />
        </div>
      </Fade>
      <div
        id="menu"
        className="hidden fixed w-full h-screen bg-primary opacity-90 top-0 left-0 overflow-hidden transition-all z-30"
      >
        <div className="w-full text-white uppercase list-none flex flex-col items-center text-3xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 xl:text-4xl">
          {NavLinks.map((link) => (
            <li className="pb-3 relative menu__link" key={link.title + 'link'}>
              <Link
                to={link.path}
                onClick={handleMenu}
                className="hover:text-white"
              >
                {link.title}
              </Link>
            </li>
          ))}
          {isAuthenticated ? (
            <li className="pb-3 relative menu__link" key={'closeacclink'}>
              <Link to={'/'} onClick={Logout} className="hover:text-white">
                Cerrar Sesion
              </Link>
            </li>
          ) : null}
          <img
            className="close-btn w-6 invert pt-2 relative hover:scale-110"
            src="https://codestapi.herokuapp.com/assets/close.png"
            alt="close-btn"
            onClick={handleMenu}
          />
        </div>
      </div>
    </>
  )
}

export { NavLinks, Navigation }
