import Space from "@/app/models/space.model";
import TestiMonial from "@/app/models/testimonial.model";
import connectToDb from "@/lib/connetToDb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectToDb();
        const body = await req.json();

        const space = await Space.findOne({ spaceName: body.spaceName });

        if (!space) {
            return NextResponse.json({ error: "NO space found " }, { status: 404 });
        }

        const newTestimonial = new TestiMonial({
            message: body.message,
            imageUrl: body.imageUrl,
            rating: body.rating,
            userName: body.userName,
            userEmail: body.userEmail,
            userImage: body.userImage,
            permissionToShare: body.permissionToShare,
            spaceId: space._id
        });
        await newTestimonial.save();
        return NextResponse.json({ success: "new testimonial submited" }, { status: 201 })


    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}