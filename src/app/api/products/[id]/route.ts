import { connectDB } from '@/lib/mongodb';
import { ProductModel } from '@/lib/models';

// PUT /api/products/[id] — update a product by its string id
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const updated = await ProductModel.findOneAndUpdate(
      { id },
      { $set: body },
      { new: true, runValidators: true }
    ).lean();

    if (!updated) {
      return Response.json({ error: 'Product not found' }, { status: 404 });
    }

    const { _id, __v, ...cleaned } = updated as any;
    return Response.json(cleaned);
  } catch (error) {
    console.error('[API/products/[id] PUT]', error);
    return Response.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

// DELETE /api/products/[id] — delete a product by its string id
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const deleted = await ProductModel.findOneAndDelete({ id }).lean();
    if (!deleted) {
      return Response.json({ error: 'Product not found' }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('[API/products/[id] DELETE]', error);
    return Response.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
