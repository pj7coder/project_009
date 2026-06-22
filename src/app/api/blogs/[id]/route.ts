import { connectDB } from '@/lib/mongodb';
import { BlogModel } from '@/lib/models';

// PUT /api/blogs/[id] — update a blog by string id
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const updated = await BlogModel.findOneAndUpdate(
      { id },
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
    await connectDB();
    const { id } = await params;

    const deleted = await BlogModel.findOneAndDelete({ id }).lean();
    if (!deleted) {
      return Response.json({ error: 'Blog not found' }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('[API/blogs/[id] DELETE]', error);
    return Response.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}
