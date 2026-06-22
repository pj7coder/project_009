import { connectDB } from '@/lib/mongodb';
import { BlogModel } from '@/lib/models';
import { INITIAL_BLOGS } from '@/data/stoneData';

// GET /api/blogs — fetch all blogs
export async function GET() {
  try {
    await connectDB();

    let blogs = await BlogModel.find({}).lean();

    if (blogs.length === 0) {
      await BlogModel.insertMany(INITIAL_BLOGS);
      blogs = await BlogModel.find({}).lean();
    }

    const cleaned = blogs.map(({ _id, __v, ...rest }: any) => rest);
    return Response.json(cleaned);
  } catch (error) {
    console.error('[API/blogs GET]', error);
    return Response.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

// POST /api/blogs — create a new blog
export async function POST(request: Request) {
  try {
    const { isAuthenticated } = await import('@/lib/auth');
    if (!(await isAuthenticated())) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();

    if (!body.title || !body.author) {
      return Response.json({ error: 'title and author are required' }, { status: 400 });
    }

    const id = body.id || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const blog = await BlogModel.create({ ...body, id });
    const { _id, __v, ...cleaned } = blog.toObject();
    return Response.json(cleaned, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return Response.json({ error: 'A blog with this ID already exists' }, { status: 409 });
    }
    console.error('[API/blogs POST]', error);
    return Response.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}
