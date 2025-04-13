
import { updateImgUrlInSettingsByUserId } from '@/lib/actions';
import React, { useActionState, useState } from 'react'

const AvatarImgUrlForm = ({userId}: {userId: string}) => {
    const [state, formAction] = useActionState(updateImgUrlInSettingsByUserId, null)
      
    // handling hidden data which will not be provided by user
      const [hiddenFormData, setHiddenFormData] = useState({
        userId
      })
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
      const {name, value, type} = e.target
      setHiddenFormData(prevFormData => {
        return {
          ...prevFormData,
          [name]: type === "checkbox" && (e.target instanceof HTMLInputElement) ? e.target.checked : value,
        }
      })
    }

    return (
      <form action={formAction} className='w-1/1 flex flex-row justify-between gap-4 my-2 text-gray-900 !z-10'>
        <input
          className='flex w-full text-start text-base pl-2 min-h-4 max-h-full rounded-md outline-none resize-none border border-gray-400'
          type='text'
          name='imgUrl'
          max={3}
          required
          placeholder='Add new url here...'
        />

        <input
          type='text'
          name='userId'
          value={hiddenFormData.userId}
          onChange={handleChange}
          hidden
        />

        <div className='flex flex-row gap-4 w-[100px] items-center justify-center text-gray-600'>
          <button className='w-full border border-gray-600 rounded-md uppercase'>Add</button>
        </div>

        {state?.error && <p>{state.error}</p>}
      </form>
  )
}

export default AvatarImgUrlForm