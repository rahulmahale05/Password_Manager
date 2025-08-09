import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-purple-600 text-white flex w-full justify-around items-center px-[2%] p-3'>
        <div className='logo font-bold text-2xl'>&lt;Pass<span className='text-green-500'>Op/&gt;</span></div>
        <button className='flex mx-[3%] justify-around w-[9%] items-center'>
            <a href="https://github.com/rahulmahale05"><img width={40} src="icons/github.jpg" className='invert rounded-full cursor-pointer' alt="" /></a>
            <h1 className='font-bold text-lg'><a href="https://github.com/rahulmahale05">GitHub</a></h1>
        </button>
    </nav>
  )
}

export default Navbar
