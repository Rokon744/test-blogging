import { conneectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { writeFile } from "fs/promises";
// import { unlink } from "fs/promises";
const { NextResponse } = require("next/server");


const LoadDB = async () => {
  await conneectDB();
};
LoadDB();



// API endpoint to get all blogs
export async function GET(request) {
  const blogs = await BlogModel.find({})
  return NextResponse.json({blogs});
}


// API Endpoint for uploading blogs
export async function POST(request) {
  const formData = await request.formData();
  const timestamp = Date.now();

  const image = formData.get("image");
  const imageByteData = await image.arrayBuffer();
  const buffer = Buffer.from(imageByteData);
  const path = `./public/${timestamp}_${image.name}`;
  await writeFile(path, buffer);
  const imgUrl = `/${timestamp}_${image.name}`;
  console.log(imgUrl);

  const blogData = {
    title: `${formData.get("title")}`,
    description: `${formData.get("description")}`,
    category: `${formData.get("category")}`,
    author: `${formData.get("author")}`,
    image: `${imgUrl}`,
    authorImg: `${formData.get("authorImg")}`,
  };

  await BlogModel.create(blogData);
  console.log("Blog Saved");
  

  return NextResponse.json({ success: true, msg: "Blog Added" });
}


// API Endpoint for deleting blogs
export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ success: false, msg: "Blog ID is required" }, { status: 400 });
  }

  // Find the blog to delete
  const blog = await BlogModel.findById(id);

  if (!blog) {
    return NextResponse.json({ success: false, msg: "Blog not found" }, { status: 404 });
  }

  // Remove the image file from the server
  const imagePath = `./public${blog.image}`;
  await unlink(imagePath);

  // Delete the blog from the database
  await BlogModel.findByIdAndDelete(id);
  console.log("Blog Deleted");

  return NextResponse.json({ success: true, msg: "Blog Deleted" });
}