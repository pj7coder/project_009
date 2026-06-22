import { connectDB } from '@/lib/mongodb';
import { ProjectModel } from '@/lib/models';

// PUT /api/projects/[id] — update a project by string id
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const updated = await ProjectModel.findOneAndUpdate(
      { id },
      { $set: body },
      { new: true, runValidators: true }
    ).lean();

    if (!updated) {
      return Response.json({ error: 'Project not found' }, { status: 404 });
    }

    const { _id, __v, ...cleaned } = updated as any;
    return Response.json(cleaned);
  } catch (error) {
    console.error('[API/projects/[id] PUT]', error);
    return Response.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

// DELETE /api/projects/[id] — delete a project by string id
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const deleted = await ProjectModel.findOneAndDelete({ id }).lean();
    if (!deleted) {
      return Response.json({ error: 'Project not found' }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('[API/projects/[id] DELETE]', error);
    return Response.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
