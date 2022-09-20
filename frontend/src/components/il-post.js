/* eslint-disable react/prop-types */
import React from 'react'
import Swal from 'sweetalert2'
import { deletePost } from '../api/Post-requests'

export default function IlPost({ id, image, title, shorttitle, onClick }) {
  const deleteSelectedPost = (id) => {
    deletePost(id).then((response) => {
      Swal.fire({
        title: '¿ Borrar Post ?',
        showCancelButton: true,
        confirmButtonText: 'Borrar'
      }).then((result) => {
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
    <div className="flex flex-row bg-white rounded-lg gap-8 items-center justify-between h-[144px] pr-4">
      <img
        src={image}
        alt="front-img"
        className="w-64 rounded-lg object-cover"
        style={{ aspectRatio: '16/9' }}
      />
      <div>
        <h1 className="m-0">{title}</h1>
        <h2 className="m-0">{shorttitle}</h2>
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
            deleteSelectedPost(id)
          }}
          className="px-2 py-1 rounded-xl text-2xl border-2 bg-[red] text-white hover:scale-110 transition-all hover:bg-[white] hover:text-primary hover:border-2 border-[red]"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
