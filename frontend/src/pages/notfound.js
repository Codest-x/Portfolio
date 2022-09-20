import React from 'react'
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade'

export default function NotFound() {
  return (
    <section className="w-full h-[calc(100vh-228px)] pt-14">
      <div className="cont_principal cont_error_active">
        <Fade left>
          <div className="cont_error">
            <h1>404</h1>
            <p>Parece que no existe esta pagina</p>
            <p>
              Deberias volver al <Link className="font-bold text-primary hover:underline" to="/">Inicio</Link>
            </p>
          </div>
        </Fade>
      </div>
    </section>
  )
}
