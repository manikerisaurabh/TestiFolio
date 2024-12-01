import Space from "@/app/models/space.model";
import TestiMonial from "@/app/models/testimonial.model";
import connectToDb from "../../../../lib/connetToDb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        console.log('API reached at testimonial/add');
        await connectToDb();

        // Parse the request body
        const body = await req.json();

        // Find the corresponding space by ID
        const space = await Space.findOne({ _id: body.spaceName });

        if (!space) {
            return NextResponse.json({ error: "No space found" }, { status: 404 });
        }

        console.log("Space found:", space);

        // Create a new testimonial
        const newTestimonial = new TestiMonial({
            message: body.message,
            imageUrl: body.imageUrl,
            rating: body.rating,
            userName: body.userName,
            userEmail: body.userEmail,
            userImage: body.userImage,
            permissionToShare: body.permissionToShare,
            spaceId: space._id,
            testimonialType: body.testimonialType
        });

        // Save the testimonial
        await newTestimonial.save();
        console.log("New testimonial created with ID:", newTestimonial._id);

        // Push the testimonial ID into the space's testimonials array
        const updatedSpace = await Space.findByIdAndUpdate(
            space._id,
            { $push: { testimonials: newTestimonial._id } },
            { new: true } // Ensure the updated document is returned
        );

        console.log("Updated Space:", updatedSpace);

        if (!updatedSpace) {
            return NextResponse.json({ error: "Failed to update space with testimonial" }, { status: 500 });
        }

        return NextResponse.json({ success: "New testimonial submitted and linked to space" }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
