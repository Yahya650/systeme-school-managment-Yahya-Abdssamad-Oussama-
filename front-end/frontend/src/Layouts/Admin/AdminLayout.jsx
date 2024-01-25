import React from 'react'
import _header from './_header';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {

  return (
    <>
      <header> <_header /> </header>
      <section> <Outlet /> </section>
      {/* <footer></footer> */}
    </>
  )
}

export default AdminLayout
