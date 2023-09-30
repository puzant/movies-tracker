import React, { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'

import { useQuery } from 'react-query'
import { getGenres } from '@/api'

export const Filters = () => {
  const { data: genresData } = useQuery('genres', getGenres)


  const sortingOptions = [
    { id: 1, name: 'Popularity Descending' },
    { id: 2, name: 'Popularity Aescending' },
    { id: 3, name: 'Rating Descending' },
    { id: 4, name: 'Rating Aescending' },
    { id: 5, name: 'Release Date Descending' },
    { id: 6, name: 'Release Date Aescending' },
  ]

  const [selectedOption, setSelectedOption] = React.useState(sortingOptions[0])


  return (
    <div className='w-[20%] flex flex-col gap-4'>
      <div className='border shadow-md p-4'>
        <span className='font-semibold'>Sort</span>
        <hr className="my-2" />

        <span className=''>Sort By</span>
        <div className='h-2'></div>

        <Listbox value={selectedOption} onChange={setSelectedOption}>
          <Listbox.Button className="bg-[#e4e7eb] px-4 py-2 rounded-md font-normal w-full text-left">{selectedOption.name}</Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="border rounded-md shadow-sm mt-1">
              {sortingOptions.map((option) => (

                <Listbox.Option
                  key={option.id}
                  value={option}
                  disabled={option.unavailable}
                  className={({ active }) =>
                    `relative cursor-default select-none p-1.5 ${active ? 'bg-[#e4e7eb]' : 'bg-white'
                    }`
                  }
                >
                  {option.name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </Listbox>
      </div>

      <div className='border shadow-md p-4'>
        <span className='font-semibold'>Filters</span>
        <hr className="my-2" />

        <span className=''>Genres</span>
        <div className='flex flex-wrap gap-3 mt-2'>
          {genresData?.data?.genres.map(genre => (
            <div
              className='rounded-2xl text-xs border border-gray-400 p-2.5 hover:bg-gray-200 cursor-pointer ease-in duration-300'
              key={genre.id}
            >
              {genre.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}