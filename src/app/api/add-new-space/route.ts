import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { User } from "@/app/components/NavbarProfile";
import Space from '../../models/space.model.js'
import connectToDb from "../../../lib/connetToDb";


export async function POST(req: NextRequest) {
    const cookieStore = cookies();
    const userSession = (await cookieStore).get("userSession");
    const user: User = userSession ? JSON.parse(userSession.value) : null;

    try {
        await connectToDb();
        const body = await req.json();
        console.log({ body });
        console.log({ user })
        const newSpace = new Space({
            spaceName: body.spaceName,
            spaceLogo: body.spaceLogo,
            headerTitle: body.headerTitle,
            customMessage: body.customMessage,
            questions: body.questions,
            owner: user.id
        })
        await newSpace.save();
        return NextResponse.json({ success: "New space created successfully" })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Internal Server errir" })
    }
}