import { Fragment, ReactNode } from 'react'
import { Listbox, Transition } from '@headlessui/react'

import { getGenres } from '@/api'
import { useCustomQuery } from '../queries'
import { IGenre, ISortingOption } from '@/interfaces'
import { LoadingSpinner } from '@/components'
import { sortingOptions } from '@/utils/constants'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface IFilters {
  children: ReactNode
  selectedGenres: IGenre[]
  selectedOption: () => void
  onSortSelection: () => void
  onGenreSelection: (selectedGenre: IGenre) => void
}

export const Filters = ({
  children,
  selectedGenres,
  selectedOption,
  onSortSelection,
  onGenreSelection,
}: IFilters) => {

  const {
    data: genresData,
    isLoading: genresLoading
  } = useCustomQuery(getGenres, 'genres')

  const { genres } = genresData?.data || {}

  return (
    <div className='w-[20%] hidden sm:flex flex-col gap-4'>
      <div className='border shadow-md p-4'>
        <span className='font-semibold'>Sort</span>
        <hr className="my-2" />

        <span>Sort By</span>
        <div className='h-2'></div>

        <Listbox value={selectedOption} onChange={onSortSelection}>
          <Listbox.Button className="bg-[#e4e7eb] px-4 py-2 rounded-md font-normal w-full text-left flex justify-between">
            <span>{selectedOption.name}</span>
            <ExpandMoreIcon />
          </Listbox.Button>
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

        <span>Release Date</span>
        <div className='flex flex-col gap-4 mt-4'>
          {children}
        </div>

        <hr className="my-3" />

        <span>Genres</span>
        <div className='flex flex-wrap gap-3 mt-2'>
          {genresLoading ? <div className='m-auto'><LoadingSpinner /></div> :
            genres?.map((genre: IGenre) => (
              <div
                onClick={() => onGenreSelection(genre)}
                className={`${selectedGenres.includes(genre) ? 'bg-[#3b82f6] border border-transparent text-white' : 'bg-trasnparent'} rounded-2xl text-xs border border-gray-400 p-2.5 cursor-pointer ease-in duration-300`}
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