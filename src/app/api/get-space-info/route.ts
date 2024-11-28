import Space from "@/app/models/space.model";
import connectToDb from "@/lib/connetToDb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { userId, spaceName } = await req.json();
    try {
        console.log({ userId, spaceName })
        await connectToDb();
        const space = await Space.findOne({ _id: spaceName, owner: userId });

        console.log('this is search space ', space)

        return NextResponse.json({ data: space });

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}