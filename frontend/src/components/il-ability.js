/* eslint-disable react/prop-types */
import React from 'react'
import Swal from 'sweetalert2'
import { deleteAbility } from '../api/Abilities-request'

export default function IlAbility({ id, image, title, link, onClick }) {
  const deleteSelectedAb = (id) => {
    deleteAbility(id).then((response) => {
      Swal.fire({
        title: '¿ Borrar Habilidad ?',
        showCancelButton: true,
        confirmButtonText: 'Borrar'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          if (response.data.error) {
            Swal.fire(response.data.error, '', 'error')
          } else {
            Swal.fire(response.data.status, '', 'success')
            document.location.reload()
          }
        }
      })
    })
  }
  return (
    <div
      className="flex flex-row bg-white rounded-lg items-center justify-between h-[144px] pr-4"
      key={id}
    >
      <img
        src={image}
        alt="front-img"
        className="w-64 rounded-lg object-contain"
        style={{ aspectRatio: '16/9' }}
      />
      <div className="w-[40%] overflow-hidden">
        <h1 className="m-0">{title}</h1>
        <h2 className="m-0">{link}</h2>
      </div>
      <div className="flex flex-row gap-8">
        <button
          onClick={onClick}
          className="px-2  py-1 rounded-xl text-2xl bg-[gray] text-white hover:scale-110 transition-all hover:bg-[white] hover:text-primary hover:border-2 border-[gray]"
        >
          Select
        </button>
        <button
          onClick={() => {
            deleteSelectedAb(id)
          }}
          className="px-2 py-1 rounded-xl text-2xl border-2 bg-[red] text-white hover:scale-110 transition-all hover:bg-[white] hover:text-primary hover:border-2 border-[red]"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
