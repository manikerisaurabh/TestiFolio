import connectToDb from "../../../lib/connetToDb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { userId } = await req.json();
        console.log(userId)
        await connectToDb();

        return NextResponse.json(userId)
    } catch (error) {
        console.log("Error in signup controller : " + error);
        return NextResponse.json({ error: "Internal Server Error " }, { status: 500 })
    }
}