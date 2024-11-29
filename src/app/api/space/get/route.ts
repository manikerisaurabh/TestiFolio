import Space from "@/app/models/space.model";
import connectToDb from "@/lib/connetToDb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectToDb();
        const body = await req.json();
        const spaces = await Space.find({ owner: body.userId });

        if (!spaces) {
            return NextResponse.json({ message: "No space available" });
        }

        return NextResponse.json(spaces);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error " }, { status: 500 });
    }

}