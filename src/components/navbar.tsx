import React from 'react'
import tmdbLogo from '@/assets/tmdb-logo.svg'

export const Navbar = () => {
  const [searchValue, setSearchValue] = React.useState("")

  return (
    <div className="bg-[#172554] p-5 text-white flex items-center justify-between">
      <div className="flex gap-5">
        <img width="154" height="20" src={tmdbLogo} />
        <span className="cursor-pointer">Movies</span>
        <span className="cursor-pointer">Upcoming</span>
      </div>

      <div className='flex gap-5 items-center'>
        <input
          className='p-1 bg-gray-500/50 rounded-sm px-4 placeholder:text-white focus:outline-none'
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          placeholder='Search...'
        />
        <span className="cursor-pointer">Login</span>
      </div>
    </div>
  )
}