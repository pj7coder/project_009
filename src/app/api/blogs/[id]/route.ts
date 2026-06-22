import { connectDB } from '@/lib/mongodb';
import { BlogModel } from '@/lib/models';

// PUT /api/blogs/[id] — update a blog by string id
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { isAuthenticated } = await import('@/lib/auth');
    if (!(await isAuthenticated())) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;
    const cleanId = String(id);
    const body = await request.json();

    const updated = await BlogModel.findOneAndUpdate(
      { id: cleanId },
      { $set: body },
      { new: true, runValidators: true }
    ).lean();

    if (!updated) {
      return Response.json({ error: 'Blog not found' }, { status: 404 });
    }

    const { _id, __v, ...cleaned } = updated as any;
    return Response.json(cleaned);
  } catch (error) {
    console.error('[API/blogs/[id] PUT]', error);
    return Response.json({ error: 'Failed to update blog' }, { status: 500 });
  }
}

// DELETE /api/blogs/[id] — delete a blog by string id
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { isAuthenticated } = await import('@/lib/auth');
    if (!(await isAuthenticated())) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;
    const cleanId = String(id);

    const deleted = await BlogModel.findOneAndDelete({ id: cleanId }).lean();
    if (!deleted) {
      return Response.json({ error: 'Blog not found' }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('[API/blogs/[id] DELETE]', error);
    return Response.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}
