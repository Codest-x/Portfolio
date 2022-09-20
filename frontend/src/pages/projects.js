import React, { useState, useEffect } from 'react'
import { getPersonalPosts, getProjectsPosts } from '../api/Post-requests'
import PostsSection from '../components/posts-section'
import { Card } from '../components/cards'

export default function Projects() {
  const [projectsPosts, setProjectsPosts] = useState()
  const [personalPosts, setPersonalPosts] = useState()
  const [loadingprojects, setLoadingProjects] = useState(true)
  const [loadingpersonal, setLoadingPersonal] = useState(true)

  useEffect(() => {
    getProjectsPosts().then((response) => {
      setProjectsPosts(response)
      setLoadingProjects(false)
    })
    getPersonalPosts().then((response) => {
      setPersonalPosts(response)
      setLoadingPersonal(false)
    })
  }, [])

  return (
    <section className="w-full h-full p-4 mt-14">
      <PostsSection
        title="Todos mis trabajos"
        posts={projectsPosts}
        loading={loadingprojects}
      />
      <PostsSection
        title="Proyectos Personales"
        posts={personalPosts}
        loading={loadingpersonal}
      />
    </section>
  )
}
