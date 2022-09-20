import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade'
import PostsSection from '../components/posts-section'
import Contact from '../components/contact-form'
import { Card, AbilityCard } from '../components/cards'
import { getFeaturedPosts, getPersonalPosts } from '../api/Post-requests'
import { getAllAbilities } from '../api/Abilities-request'
import HomeIMG from '../assets/me-home.png'

export default function Home() {
  const [featuredPosts, setFeaturedPosts] = useState([])
  const [personalPosts, setPersonalPosts] = useState([])
  const [abilities, setAbilities] = useState([])
  const [loadingFeatured, setFeatLoading] = useState(true)
  const [loadingPersonal, setPersonalLoading] = useState(true)

  useEffect(() => {
    getAllAbilities().then((response) => setAbilities(response))
    getFeaturedPosts().then((response) => {
      setFeaturedPosts(response)
      setFeatLoading(false)
    })
    getPersonalPosts(true).then((response) => {
      setPersonalPosts(response)
      setPersonalLoading(false)
    })
  }, [])

  return (
    <>
      <section className="relative mt-14 w-full h-full p-4 2xl:mb-8 xl:h-screen 2xl:h-screen">
        <div className=" w-full lg:flex flex-row-reverse justify-around">
          <div>
            <h1 className="hidden title left-1/2 -translate-x-1/2 top-0 absolute m-0 font-bold text-white shadow-title bg-transparent uppercase xl:block text-15xl">
              Esteban
            </h1>
            <Fade left>
              <img
                className=" w-full relative z-10 mt-8 -left-8 xl:-top-20 xl:left-16 xl:w-4/5 2xl:w-full 2xl:-left-8 brightness-0"
                src={HomeIMG}
                alt="me-img"
              />
            </Fade>
          </div>
          <Fade left cascade>
            <div className="flex flex-col items-start justify-center gap-3 xl:ml-28 2xl:ml-0">
              <span className="text-xl text-gray">Esteban Estrada</span>
              <h1 className="font-bold m-0 xl:text-5xl 2xl:text-6xl">
                Desarrollador
                <br /> Frontend Junior
              </h1>
              <span className="lg:text-xl">
                Tecnico en diseño y programación de software
              </span>
              <nav className="lg:text-lg">
                <span>
                  Lee{' '}
                  <strong className="hover:underline">
                    <Link to="/sobre-mi">Sobre Mí,</Link>
                  </strong>{' '}
                  Ver{' '}
                  <strong className="hover:underline">
                    <Link to="/proyectos">Proyectos</Link>
                  </strong>{' '}
                  o Ver{' '}
                  <strong className="hover:underline">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://codestapi.herokuapp.com/assets/EstebanEstradaCV.pdf"
                    >
                      {' '}
                      CV
                    </a>
                  </strong>
                </span>
              </nav>
            </div>
          </Fade>
        </div>
        <div className="relative mouse z-20 xl:-top-48 2xl:-top-72" />
      </section>
      <section className="w-full h-full p-4 xl:pb-16">
        <Fade left>
          <h1 className="font-bold w-full text-center xl:text-6xl xl:text-left xl:pl-16 2xl:pl-36">
            Habilidades
          </h1>
          <div className="grid grid-cols-2 mt-10 gap-8 mb-6 w-9/10 content-center justify-items-center mx-auto xl:grid-cols-5 xl:pt-12">
            {abilities.map((ability) => (
              <AbilityCard
                title={ability.title}
                image={ability.image}
                link={ability.link}
                key={ability._id}
              />
            ))}
          </div>
        </Fade>
      </section>
      <PostsSection
        title="Trabajos Destacados"
        loading={loadingFeatured}
        posts={featuredPosts}
      />
      <PostsSection
        title="Proyectos Personales"
        posts={personalPosts}
        loading={loadingFeatured}
      />
      <Fade left>
        <div className="relative mt-6 p-4 w-full h-full text-center xl:mt-0">
          <span className="text-lg xl:text-xl">
            Necesitas un desarrollador ?
          </span>
          <h1 className=" text-4xl font-bold m-0 xl:text-7xl hover:underline">
            Trabajemos juntos
          </h1>
          <Contact />
        </div>
      </Fade>
    </>
  )
}
