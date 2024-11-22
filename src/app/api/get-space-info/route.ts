import Space from "@/app/models/space.model";
import connectToDb from "@/lib/connetToDb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { userId, spaceName } = await req.json();
    try {
        await connectToDb();
        const space = await Space.findOne({ spaceName: spaceName, owner: userId });

        if (space) {
            console.log({ space })
        }

        return NextResponse.json({ data: space });

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}