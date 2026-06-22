import { connectDB } from '@/lib/mongodb';
import { ProjectModel } from '@/lib/models';
import { INITIAL_PROJECTS } from '@/data/stoneData';

// GET /api/projects — fetch all projects
export async function GET() {
  try {
    await connectDB();

    let projects = await ProjectModel.find({}).lean();

    if (projects.length === 0) {
      await ProjectModel.insertMany(INITIAL_PROJECTS);
      projects = await ProjectModel.find({}).lean();
    }

    const cleaned = projects.map(({ _id, __v, ...rest }: any) => rest);
    return Response.json(cleaned);
  } catch (error) {
    console.error('[API/projects GET]', error);
    return Response.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

// POST /api/projects — create a new project
export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    if (!body.title || !body.category) {
      return Response.json({ error: 'title and category are required' }, { status: 400 });
    }

    const id = body.id || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const project = await ProjectModel.create({ ...body, id });
    const { _id, __v, ...cleaned } = project.toObject();
    return Response.json(cleaned, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return Response.json({ error: 'A project with this ID already exists' }, { status: 409 });
    }
    console.error('[API/projects POST]', error);
    return Response.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
