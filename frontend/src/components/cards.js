/* eslint-disable multiline-ternary */
/* eslint-disable space-before-function-paren */
/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({
  shorttitle,
  description,
  date,
  image,
  title,
  link,
  id,
  loading
}) => {
  return (
    <Link
      to={`/post/${id}`}
      className={`card relative my-0 mx-auto bg-primary rounded-2xl lg:mx-5 hover:scale-105 ${
        loading ? 'is-loading' : ''
      }`}
    >
      <div className="face face1 p-8 box-border items-center justify-center">
        <div
          className={`text-white w-full h-[80%] flex flex-col justify-center ${
            loading ? 'hidden' : ''
          }`}
        >
          <h2 className="m-0 p-0 text-2xl font-bold text-white">
            {shorttitle || 'No Title'}
          </h2>
          <div></div>
          <p className="h-[42%] break-all overflow-hidden">
            {description || 'No Description'}
          </p>
          <span className="absolute bottom-20 right-4">
            {date || 'No Date'}
          </span>
        </div>
      </div>
      <div
        className={`face face2 bg-primary rounded-2xl ${
          loading ? 'hidden' : ''
        }`}
      />
      <div
        className="face face2 rounded-2xl opacity-50 bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(${image})`
        }}
      />
      <div className="face face2 rounded-2xl text-white flex flex-col">
        <h2
          className={`m-0 p-0 text-5xl font-bold uppercase xl:text-7xl ${
            loading ? 'text-primary' : 'text-white'
          }`}
        >
          {loading ? 'Cargando' : title || 'No Title'}
        </h2>
        <span className={`link ${loading ? 'text-primary' : ''}`}>
          {loading ? '' : link || ''}
        </span>
      </div>
    </Link>
  )
}

const AbilityCard = ({ title, image, link }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="p-4 w-40 h-40 rounded-2xl flex flex-col items-center justify-center shadow-around xl:w-52 xl:h-52 hover:scale-110 transition-all text-primary"
    >
      <img
        src={image || 'https://via.placeholder.com/300.png'}
        alt="ability-icon"
        className="h-4/5 p-2"
      />
      <span className="font-bold text-xl">{title || 'No title'}</span>
    </a>
  )
}

export { Card, AbilityCard }
