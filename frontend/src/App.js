/* eslint-disable multiline-ternary */
/* eslint-disable space-before-function-paren */
import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Footer } from './components/footer'
import { Navigation } from './components/navigation'
import { About, NotFound, Home, Post, Projects, Admin } from './pages'
import Swal from 'sweetalert2'

function App() {
  const [isAuthenticated, setAuthenticated] = useState(
    localStorage.getItem('isAuthenticated')
  )
  const Login = async () => {
    if (!isAuthenticated) {
      const { value: formValues } = await Swal.fire({
        title: 'Login Admin',
        confirmButtonColor: 'black',
        html:
          '<label>Username</label>' +
          '<input id="swal-input1" class="swal2-input">' +
          '<label>Password</label>' +
          '<input id="swal-input2" class="swal2-input" type="password">',
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById('swal-input1').value,
            document.getElementById('swal-input2').value
          ]
        }
      })
      console.log(formValues)
      if (
        process.env.REACT_APP_USERNAME === formValues[0] &&
        process.env.REACT_APP_PASSWORD === formValues[1]
      ) {
        localStorage.setItem('isAuthenticated', true)
        setAuthenticated(true)
        document.location.href = '/admin'
      } else {
        Swal.fire('Error', 'Credenciales no Validas', 'error')
        setTimeout(() => {
          document.location.reload()
        }, 2000)
      }
    } else {
      document.location.href = '/admin'
    }
  }
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/proyectos" element={<Projects />} />
        <Route path="/sobre-mi" element={<About />} />
        {isAuthenticated ? (
          <Route path="/admin" element={<Admin />} />
        ) : (
          <Route path="*" element={<NotFound />} />
        )}
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
