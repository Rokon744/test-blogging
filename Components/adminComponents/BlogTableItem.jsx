import { assets } from '@/Assets/assets'
import Image from 'next/image'
import React from 'react'

const BlogTableItem = ({authorImg, title, author, date, mongoId, deleteBlog}) => {
    const BlogDate = new Date(date)
  return (
    <tr className='bg-white border-b'>
        <th scope='row' className='items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-green-900 whitespace-nowrap'>
            <Image src={authorImg? authorImg : assets.profile_icon} width={40} height={40} alt='' />
            <p>{author? author: "No author"}</p>
        </th>
        <td className='px-6 pt-4'>
            {title? title:"no title"}
        </td>
        <td className='px-6 pt-4'>
            {BlogDate.toDateString()}
        </td>
        <td className='px-6 pt-4 cursor-pointer' onClick={()=>deleteBlog(mongoId)}>
            x
        </td>
    </tr>
  )
}

export default BlogTableItem