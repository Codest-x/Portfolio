import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import Fade from 'react-reveal/Fade'
import Swal from 'sweetalert2'

export default function Contact() {
  const form = useRef()
  const [loading, setLoading] = useState(false)

  const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
  })

  const sendEmail = (e) => {
    e.preventDefault()
    setLoading(true)
    emailjs
      .sendForm(
        'service_2gmkf37',
        'template_yf0plrd',
        form.current,
        'user_gd2KR0qfZipAt8R4uhcr4'
      )
      .then(
        (result) => {
          e.target.reset()
          setLoading(false)
          Toast.fire({
            icon: 'success',
            title: 'Enviado Correctamente'
          })
        },
        (error) => {
          console.log(error.text)
          Toast.fire({
            icon: 'error',
            title: 'Hubo un error'
          })
        }
      )
  }
  return (
    <Fade left>
      <div className="w-full h-full p-4 my-10">
        <form
          ref={form}
          onSubmit={sendEmail}
          className="flex flex-col justify-center items-center w-full mx-auto rounded-xl gap-8 p-8 xl:flex-col xl:w-3/4 2xl:w-3/5"
          style={{ boxShadow: '0px 0px 20px 0px #00000026' }}
        >
          <div className="flex flex-col w-full gap-8 justify-center items-center xl:flex-row">
            <div className="flex flex-col w-full xl:w-2/5 gap-8">
              <div className="relative">
                <input
                  type="text"
                  className="form__field"
                  placeholder="Name"
                  name="user_name"
                  id="name"
                  required
                  disabled={loading}
                  minLength={3}
                />
                <label htmlFor="name" className="form__label">
                  Nombre y Apellido
                </label>
              </div>
              <div className="relative">
                <input
                  type="email"
                  className="form__field"
                  placeholder="Email"
                  name="user_email"
                  id="email"
                  required
                  disabled={loading}
                />
                <label htmlFor="email" className="form__label">
                  Correo
                </label>
              </div>
              <div className="relative">
                <input
                  type="tel"
                  className="form__field"
                  placeholder="Telefono"
                  name="user_phone"
                  id="phone"
                  disabled={loading}
                />
                <label htmlFor="phone" className="form__label">
                  Telefono {'(Opcional)'}
                </label>
              </div>
            </div>
            <div className="flex flex-col w-full xl:w-3/5 relative">
              <label className="text-xl pb-4">Mensaje</label>
              <textarea
                name="message"
                className="form__textarea"
                minLength={20}
                disabled={loading}
              />
            </div>
          </div>
          <div className="flex flex-row items-center gap-4">
            <input
              className="form_send text-2xl hover:scale-110 transition-all hover:bg-[gray] hover:text-white"
              type="submit"
              value="Enviar"
            />
            <div
              style={{ display: loading ? 'block' : 'none' }}
              className="w-8 h-8 animate-spin rounded-full border-t-2 border-r-2"
            />
          </div>
        </form>
      </div>
    </Fade>
  )
}
