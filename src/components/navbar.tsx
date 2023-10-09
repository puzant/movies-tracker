import React from 'react'
import { Link } from 'react-router-dom'
import useMoviesStore from '@/store'

import tmdbLogo from '@/assets/tmdb-logo.svg'
import MenuIcon from '@mui/icons-material/Menu';


export const Navbar = () => {
  const isAuthenticated = useMoviesStore(state => state.isAuthenticated)
  const setAuthenticated = useMoviesStore(state => state.setAuthenticated)

  const [searchValue, setSearchValue] = React.useState("")

  return (
    <div className="bg-[#172554] p-4 text-white flex items-center justify-between">
      <div className="hidden sm:flex gap-5">
        <img width="154" height="20" src={tmdbLogo} />
        <Link to="/"><span>Movies</span></Link>
        <Link to="/upcoming"><span>Upcoming</span></Link>
      </div>

      <div className='block sm:hidden'>
        <MenuIcon />
      </div>

      <div className='hidden sm:flex gap-5 items-center'>
        <input
          className='px-3 py-2 bg-gray-500/50 rounded-sm px-4 placeholder:text-white focus:outline-none'
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          placeholder='Search...'
        />

        {!isAuthenticated ? <Link to="/login"><span>Login</span></Link> :
          <span className='cursor-pointer' onClick={setAuthenticated}>Logout</span>}
      </div>
    </div>
  )
}