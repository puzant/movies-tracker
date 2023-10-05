import React from 'react'
import { Link } from 'react-router-dom'

import tmdbLogo from '@/assets/tmdb-logo.svg'

export const Navbar = () => {
  const [searchValue, setSearchValue] = React.useState("")

  return (
    <div className="bg-[#172554] p-4 text-white flex items-center justify-between">
      <div className="flex gap-5">
        <img width="154" height="20" src={tmdbLogo} />
        <Link to="/"><span>Movies</span></Link>
        <Link to="/"><span>Upcoming</span></Link>
      </div>

      <div className='flex gap-5 items-center'>
        <input
          className='px-3 py-2 bg-gray-500/50 rounded-sm px-4 placeholder:text-white focus:outline-none'
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          placeholder='Search...'
        />
        <Link to="/login"><span>Login</span></Link>

      </div>
    </div>
  )
}