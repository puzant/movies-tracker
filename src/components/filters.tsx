import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'

import { IGenre, ISortingOption } from '@/interfaces'

interface IFilters {
  genres: IGenre[]
  sortingOptions: ISortingOption[]
  selectedOption: () => void
  onChange: () => void
  onGenreSelection: () => void
  selectedGenres: IGenre[]
}

export const Filters = ({
  genres,
  sortingOptions,
  selectedOption,
  onChange,
  onGenreSelection,
  selectedGenres
}: IFilters) => {
  return (
    <div className='w-[20%] flex flex-col gap-4'>
      <div className='border shadow-md p-4'>
        <span className='font-semibold'>Sort</span>
        <hr className="my-2" />

        <span className=''>Sort By</span>
        <div className='h-2'></div>

        <Listbox value={selectedOption} onChange={onChange}>
          <Listbox.Button className="bg-[#e4e7eb] px-4 py-2 rounded-md font-normal w-full text-left">{selectedOption.name}</Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="border rounded-md shadow-sm mt-1">
              {sortingOptions.map((option: ISortingOption) => (
                <Listbox.Option
                  key={option.id}
                  value={option}
                  className='relative cursor-default p-1.5 ui-not-active:bg-white ui-active:bg-[#e4e7eb]'
                >
                  <span className='cursor-pointer'>{option.name}</span>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </Listbox>
      </div>

      <div className='border shadow-md p-4'>
        <span className='font-semibold'>Filters</span>
        <hr className="my-2" />

        <span>Genres</span>
        <div className='flex flex-wrap gap-3 mt-2'>
          {genres?.map((genre: IGenre) => (
            <div
              onClick={() => onGenreSelection(genre)}
              className={`${selectedGenres.includes(genre) ? 'bg-[#3b82f6] border border-transparent text-white' : 'bg-trasnparent'}  rounded-2xl text-xs border border-gray-400 p-2.5 cursor-pointer ease-in duration-300`}
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