/* eslint-disable multiline-ternary */
/* eslint-disable react/prop-types */
import React from 'react'
import { Fade } from 'react-reveal'
import { Card } from '../components/cards'

export default function PostsSection({ title, posts, loading }) {
  return (
    <Fade left>
      <section className="w-full h-full p-4 xl:mb-24">
        <h1 className="w-full title-section text-center mt-0 font-bold xl:text-6xl xl:text-left xl:pl-16 2xl:pl-36">
          {title}
        </h1>
        <div className="w-full h-full grid grid-cols-1 gap-8 mx-auto xl:grid-cols-3 xl:w-9/10 xl:gap-0 2xl:w-[85%] ">
          {loading ? (
            <Card
              loading={true}
            />
          ) : (
            posts.map((post) => (
              <Card
                id={post._id}
                key={post._id}
                shorttitle={post.data.shorttitle}
                description={post.data.description}
                date={post.data.date}
                image={post.data.image}
                title={post.data.title}
                link={post.data.link}
                loading={loading}
              />
            ))
          )}
        </div>
      </section>
    </Fade>
  )
}
