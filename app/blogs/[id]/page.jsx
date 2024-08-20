"use client"
import BlogSingle from '@/Components/BlogSingle'

const page = ({params}) => {
    
    return (
        <BlogSingle params={params.id} />
    )
}

export default page