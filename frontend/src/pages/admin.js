/* eslint-disable indent */
/* eslint-disable multiline-ternary */
import React, { useEffect, useState } from 'react'
import { getAllPosts } from '../api/Post-requests'
import { getAllAbilities } from '../api/Abilities-request'
import IlPost from '../components/il-post'
import IlAbility from '../components/il-ability'
import FormPost from '../components/form-post'
import FormAbility from '../components/form-ability'

export default function Admin() {
  const [allPosts, setAllPosts] = useState()
  const [posttoedit, setPosttoedit] = useState()
  const [abilitytoedit, setAbtoedit] = useState()
  const [idtoedit, setIdtoedit] = useState()
  const [allAbilities, setAllAbilities] = useState()
  const [selectedPost, setSelectedPost] = useState(true)

  useEffect(() => {
    getAllPosts().then((response) => {
      setAllPosts(response)
    })
    getAllAbilities().then((response) => setAllAbilities(response))
  }, [])

  const HandlePost = () => {
    if (!selectedPost) {
      setSelectedPost(true)
    }
  }

  const HandleAb = () => {
    if (selectedPost) {
      setSelectedPost(false)
    }
  }

  const EditPost = (post) => {
    setIdtoedit(post._id)
    setPosttoedit({
      title: post.data.title,
      shorttitle: post.data.shorttitle,
      description: post.data.description,
      link: post.data.link,
      image: post.data.image,
      date: post.data.date,
      featured: post.featured,
      personal: post.personal,
      screens: post.screens
    })
  }

  const EditAbility = (ability) => {
    setIdtoedit(ability._id)
    setAbtoedit({
      title: ability.title,
      image: ability.image,
      link: ability.link
    })
  }

  return (
    <section className="relative h-[calc(100vh-284px)] w-full pt-10 px-10 mt-14">
      <div className="flex flex-row w-full items-start justify-center h-full">
        {selectedPost ? (
          <FormPost post={posttoedit} id={idtoedit} />
        ) : (
          <FormAbility post={abilitytoedit} id={idtoedit}/>
        )}

        <div className="flex flex-col w-2/4 rounded-2xl h-full overflow-y-auto">
          <div className="flex flex-row items-center justify-center h-8 rounded-t-2xl">
            <button
              onClick={HandlePost}
              className={`w-2/4 h-8 ${
                selectedPost ? 'bg-[black] text-white font-bold' : ''
              }`}
            >
              Posts
            </button>
            <button
              onClick={HandleAb}
              className={`w-2/4 h-8 ${
                !selectedPost ? 'bg-[black] text-white font-bold' : ''
              }`}
            >
              Habilities
            </button>
          </div>
          {selectedPost ? (
            <div className="bg-[black] p-8 flex flex-col gap-8 w-full">
              {allPosts
                ? allPosts.map((post) => (
                    <IlPost
                      key={post._id}
                      onClick={() => {
                        EditPost(post)
                      }}
                      id={post._id}
                      image={post.data.image}
                      title={post.data.title}
                      shorttitle={post.data.shorttitle}
                    />
                  ))
                : null}
            </div>
          ) : (
            <div className="bg-[black] p-8 flex flex-col gap-8 w-full">
              {allAbilities
                ? allAbilities.map((ability) => (
                    <IlAbility
                      key={ability._id}
                      onClick={() => {
                        EditAbility(ability)
                      }}
                      id={ability._id}
                      image={ability.image}
                      title={ability.title}
                      link={ability.link}
                    />
                  ))
                : null}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
