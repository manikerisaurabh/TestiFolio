import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
    const user = await currentUser();
    if (user) {
        return NextResponse.json({ user }, { status: 200 })
    }

    return NextResponse.json({ error: "User not found" }, { status: 401 })
}