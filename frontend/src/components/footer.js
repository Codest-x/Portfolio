/* eslint-disable multiline-ternary */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getFeaturedPosts } from '../api/Post-requests'

const Social = [
  {
    image: 'facebook',
    link: 'https://www.facebook.com/profile.php?id=100007426125835',
    key: 'lkff'
  },
  {
    image: 'whatsapp',
    link: 'https://api.whatsapp.com/send/?phone=+573203700631&text&app_absent=0',
    key: 'lkfw'
  },
  {
    image: 'instagram',
    link: 'https://www.instagram.com/esteban_nve/?hl=es-la',
    key: 'lkfi'
  },
  {
    image: 'github',
    link: 'https://github.com/nvecoder',
    key: 'lkfg'
  }
]

const Footer = () => {
  const [linkfooter, getlinkFooter] = useState()

  useEffect(() => {
    getFeaturedPosts().then((response) => {
      getlinkFooter(response)
    })
  }, [])
  return (
    <footer
      style={{ boxShadow: '0px 10px 20px black' }}
      className="footer relative gap-8 w-full h-full p-4 mt-10 flex flex-col xl:flex-row mx-auto xl:px-24 xl:py-10 xl:gap-0 2xl:px-40"
    >
      <div className="w-full flex flex-row items-center justify-center xl:w-3/4">
        <div className="w-full flex flex-col items-center justify-center gap-1 xl:w-2/4 xl:items-start">
          <h2 className="text-2xl font-bold">Contacto</h2>
          <span>
            Correo: {''}
            <a href="mailto:davinsontc@outlook.com">davinsontc@outlook.com</a>
          </span>
          <span>Telefono: +57 320 370 0631</span>
          <span className="text-center xl:text-left">
            Sientase libre de comunicarse conmigo{' '}
            <br className="hidden xl:block 2xl:hidden" /> y preguntarme lo que
            desee
          </span>
        </div>
        <div className="hidden xl:flex flex-col gap-1 w-2/4">
          <h2 className="text-2xl font-bold">Proyectos Destacados</h2>
          {linkfooter ? (
            linkfooter.map((link) => (
              <Link
                to={`/post/${link._id}`}
                key={link?.data?._id}
                className="hover:underline"
              >
                {link.data.title}
              </Link>
            ))
          ) : (
            <span className="hover:underline">Cargando</span>
          )}
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-start gap-8 pb-4 xl:w-1/4 xl:pb-0">
        <h2 className="text-2xl font-bold">Sigueme</h2>
        <div className="flex flex-row items-center justify-center gap-8">
          {Social.map((icon) => (
            <a
              href={icon.link}
              key={icon.key}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={`https://codestapi.herokuapp.com/assets/${icon.image}.png`}
                className="w-10 hover:scale-110 transition-all"
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export { Footer, Social }
