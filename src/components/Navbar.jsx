import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-around bg-orange-600 text-white'>
        <div className="logo">
            <span className="font-bold text-xl mx-9 my-2 py-3">MyTodo</span>
        </div>
      <ul className="flex gap-8 mx-9">
        <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all' duration-1000>Your Todos</li>
      </ul>
    </nav>
  )
}

export default Navbar
