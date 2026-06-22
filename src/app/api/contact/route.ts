import { connectDB } from '@/lib/mongodb';
import { ContactInfoModel } from '@/lib/models';
import { CONTACT_INFO } from '@/data/stoneData';

// GET /api/contact — fetch the single contact info document
export async function GET() {
  try {
    await connectDB();

    let info = await ContactInfoModel.findOne({ key: 'singleton' }).lean();

    // Seed from stoneData.ts defaults if no record exists yet
    if (!info) {
      info = await ContactInfoModel.create({ key: 'singleton', ...CONTACT_INFO });
      info = info.toObject();
    }

    const { _id, __v, key, ...cleaned } = info as any;
    return Response.json(cleaned);
  } catch (error) {
    console.error('[API/contact GET]', error);
    return Response.json({ error: 'Failed to fetch contact info' }, { status: 500 });
  }
}

// PUT /api/contact — replace the single contact info document
export async function PUT(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    const updated = await ContactInfoModel.findOneAndUpdate(
      { key: 'singleton' },
      { $set: { ...body, key: 'singleton' } },
      { new: true, upsert: true, runValidators: true }
    ).lean();

    const { _id, __v, key, ...cleaned } = updated as any;
    return Response.json(cleaned);
  } catch (error) {
    console.error('[API/contact PUT]', error);
    return Response.json({ error: 'Failed to update contact info' }, { status: 500 });
  }
}
