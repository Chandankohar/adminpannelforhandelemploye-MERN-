import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const IndexPage = () => {
  return (
    <>
      <Header/>
      <div>
      <Outlet/>
      </div>
    </>
  )
}

export default IndexPage
