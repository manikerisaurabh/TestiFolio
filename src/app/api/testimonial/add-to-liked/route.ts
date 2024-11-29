import TestiMonial from "@/app/models/testimonial.model";
import connectToDb from "../../../../lib/connetToDb";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        await connectToDb();

        const testimonial = await TestiMonial.findById(body.id);

        if (!testimonial) {
            throw new Error("Testimonial not found");
        }

        testimonial.isLiked = !testimonial.isLiked; // Toggle the boolean value
        await testimonial.save();

        return NextResponse.json({ updated: true, updatedTestimonial: testimonial }, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
