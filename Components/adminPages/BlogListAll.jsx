"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import BlogTableItem from "../adminComponents/BlogTableItem"

const BlogListAll = () => {

    const [blogs, setBlogs] = useState([])

    const fetchBlog = async () => {
        const response = await axios.get('/api/blog')
        setBlogs(response.data.blogs)
    }

    const deleteBlog = async (id) => {
        const response = await axios.delete("/api/blog", {
            params: {
                id: id
            }
        })
        toast.success(response.data.msg)
        fetchBlog()
    }

    useEffect(() => {
        fetchBlog()
    }, [])

    return (
        <div className='flex-1 pt-5 sm:pt-12 sm:pl-16'>
            <h1>All Blogs</h1>
            <div className='relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
                <table className='w-full text-sm text-gray-500'>
                    <thead className='text-sm text-gray-700 text-left uppercase bg-gray-50'>
                        <tr>
                            <th scope='col' className='hidden sm:block px-6 py-3'>
                                Author Name
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                Blog Title
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                Date
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((item, index) => {
                            return <BlogTableItem key={index} mongoId={item._id} title={item.title} author={item.author} authorImg={item.authorImg} date={item.date} deleteBlog={deleteBlog} />
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default BlogListAll