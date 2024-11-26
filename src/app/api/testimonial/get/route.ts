import Space from "@/app/models/space.model";
import TestiMonial from "@/app/models/testimonial.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log({ body })
        const spaces = await Space.findOne({ owner: body.userId, _id: body.spaceId });
        console.log({ spaces })
        if (!spaces) {
            return NextResponse.json({ message: "No space available" });
        }
        const testimonials = await TestiMonial.find({ spaceId: spaces._id });
        if (!testimonials) {
            return NextResponse.json({ error: "No Testimonial found for this space" }, { status: 401 })
        }
        console.log('this is spaces : ', spaces)
        return NextResponse.json({ space: spaces, testimonials }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error " }, { status: 500 });
    }

}