import { connectDB } from '@/lib/mongodb';
import { ProductModel } from '@/lib/models';
import { INITIAL_PRODUCTS } from '@/data/stoneData';

// GET /api/products — fetch all products
export async function GET() {
  try {
    await connectDB();

    let products = await ProductModel.find({}).lean();

    // Auto-seed the DB if it's empty (first-time setup)
    if (products.length === 0) {
      await ProductModel.insertMany(INITIAL_PRODUCTS);
      products = await ProductModel.find({}).lean();
    }

    // Strip Mongoose's __v and _id, expose our own string id field
    const cleaned = products.map(({ _id, __v, ...rest }) => rest);
    return Response.json(cleaned);
  } catch (error) {
    console.error('[API/products GET]', error);
    return Response.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

// POST /api/products — create a new product
export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    if (!body.name || !body.category) {
      return Response.json({ error: 'name and category are required' }, { status: 400 });
    }

    const id = body.id || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const product = await ProductModel.create({ ...body, id });
    const { _id, __v, ...cleaned } = product.toObject();
    return Response.json(cleaned, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return Response.json({ error: 'A product with this ID already exists' }, { status: 409 });
    }
    console.error('[API/products POST]', error);
    return Response.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
