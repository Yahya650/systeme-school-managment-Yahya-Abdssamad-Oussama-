import React from 'react'
import _header from './_header';
import { Outlet } from 'react-router-dom';

const SuperAdminLayout = () => {
  return (
    <>
      <header> <_header /> </header>
      <section> <Outlet /> </section>
      {/* <footer></footer> */}
    </>
  )
}

export default SuperAdminLayout
