/* eslint-disable multiline-ternary */
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getPost } from '../api/Post-requests'
import Fade from 'react-reveal/Fade'

export default function Post() {
  const [post, setPost] = useState()
  const [screens, setScreens] = useState([])
  const [loading, setLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    window.scrollTo(0, 0)
    getPost(id).then((response) => {
      setPost(response)
      setScreens(response.screens)
      setLoading(false)
    })
  }, [])

  return (
    <section className="relative w-full h-full p-4 mt-14">
      <Fade left>
        <div className="w-full h-full flex flex-col gap-4 items-center justify-center xl:w-4/5 mx-auto">
          <div className="flex flex-col gap-4 items-center justify-center xl:gap-8 xl:flex-row">
            <h1 className="m-0 font-bold text-5xl xl:text-7xl">
              {post?.data?.title}
            </h1>
            <span className="font-bold text-xl xl:text-2xl">
              {post?.data?.shorttitle}
            </span>
          </div>
          <p className="leading-normal text-center w-full break-all">
            {post?.data?.description}
          </p>
          {post?.data?.link ? (
            <p className="text-center">
              Si deseas conocer mas sobre {post?.data?.title} haz click{' '}
              <strong>
                <a
                  href={`${post?.data?.link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Aqui
                </a>
              </strong>
            </p>
          ) : (
            ''
          )}

          {post?.data?.link ? (
            <a
              href={`${post?.data?.link}`}
              target="_blank"
              rel="noopener noreferrer"
              className="form_send text-2xl hover:scale-110 transition-all hover:bg-[gray] hover:text-white"
            >
              Ir al Sitio
            </a>
          ) : (
            ''
          )}
        </div>
      </Fade>
      <div className="w-full h-full flex flex-col gap-8 mt-8">
        {screens.map((screen) => (
          <Fade left key={screen?._id}>
            <div className="flex flex-col justify-center items-center gap-8 xl:items-start  xl:flex-row">
              <h1 className="m-0 ">{screen?.title}</h1>
              <img className="w-full xl:w-[70%]" src={screen?.image} />
            </div>
          </Fade>
        ))}
      </div>
    </section>
  )
}
