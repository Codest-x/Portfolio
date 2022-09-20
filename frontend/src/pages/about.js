import React from 'react'
import { Link } from 'react-router-dom'
import { Social } from '../components/footer'
import Fade from 'react-reveal/Fade'

export default function About() {
  return (
    <section className="pt-14 w-full h-full">
      <Fade left>
        <div className="w-full h-full flex flex-col items-center justify-center xl:w-4/5 mx-auto xl:flex-row">
          <div className="flex w-9/10 relative flex-col items-center m-10 justify-start h-full xl:w-2/4 xl:justify-center xl:m-0 xl:h-screen">
            <div className="shadow-2xl">
              <img
                src="https://i.postimg.cc/90qLvbL6/me-about.jpg"
                alt="aboutimage"
                className=""
              />

              <div className="bg-white hidden my-1 flex-row justify-center items-center rounded-md gap-4 xl:flex">
                {Social.map((icon) => (
                  <a
                    href={icon.link}
                    key={icon.key}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mx-1 my-2"
                  >
                    <img
                      src={`https://codestapi.onrender.com/assets/${icon.image}.png`}
                      className="w-10 hover:scale-110 transition-all"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white w-9/10 h-full flex flex-col items-center justify-center py-0 text-center gap-2 xl:w-2/4 xl:h-screen">
            <h1 className="text-8xl m-0 uppercase font-bold">
              Hola
              <span>!</span>
            </h1>

            <div className="about-para">
              <p className="font-light p-[0.5rem] opacity-80">
                Soy tecnico en diseño y programación de software, me especializo
                en crear paginas web de acuerdo a los requerimentos del cliente
                o empresa, basandome en diseños atractivos, elegantes,
                minimalistas y sobre todo funcionales.
              </p>
              <p className="font-light p-[0.5rem] opacity-80">
                Uso tecnologias como MongoDB, Express, React y Node conocido
                como el Mern Stack y tambien trabajo con CMS como Wordpress,
                dependiendo los requerimentos del cliente
                <br />
                <br />
                Mira mi hoja de vida{' '}
                <a
                  style={{ color: 'black' }}
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://codestapi.onrender.com/assets/EstebanEstradaCV.pdf"
                >
                  <strong className="font-bold">Aqui!</strong>
                </a>
                {''} o haz click en el boton
              </p>
            </div>

            <div className="flex mx-8 py-4 gap-5">
              <a
                className="form_send bg-[gray] text-white text-xl hover:scale-110 transition-all hover:bg-[white] hover:text-primary xl:text-2xl"
                target="_blank"
                rel="noopener noreferrer"
                href="https://codestapi.onrender.com/assets/EstebanEstradaCV.pdf"
              >
                Hoja de vida
              </a>
              <Link
                className="form_send text-2xl hover:scale-110 transition-all hover:bg-[gray] hover:text-white"
                to="/proyectos"
              >
                Proyectos
              </Link>
            </div>
          </div>
        </div>
      </Fade>
    </section>
  )
}
