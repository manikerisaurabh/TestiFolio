// import { NextRequest, NextResponse } from "next/server";
// import { cookies } from "next/headers";
// import { User } from "@/app/components/NavbarProfile";
// import Space from '../../models/space.model.js'
// import connectToDb from "../../../lib/connetToDb";

// import { currentUser } from "@clerk/nextjs/server";

// export async function POST(req: NextRequest) {
//     const curUser = await currentUser();
//     const cookieStore = cookies();
//     const userSession = (await cookieStore).get("userSession");
//     const user: User = curUser ? curUser : userSession ? JSON.parse(userSession.value) : null;

//     try {
//         await connectToDb();
//         const body = await req.json();
//         console.log({ body });
//         console.log({ user })
//         const newSpace = new Space({
//             spaceName: body.spaceName,
//             spaceLogo: body.spaceLogo,
//             headerTitle: body.headerTitle,
//             customMessage: body.customMessage,
//             questions: body.questions,
//             owner: user.id
//         })
//         await newSpace.save();
//         return NextResponse.json({ success: "New space created successfully" })

//     } catch (error) {
//         console.log({ error })
//         return NextResponse.json({ error: "Internal Server errir" })
//     }
// }




//doing bellow code to deploy on render because render is slow and i am using free instance 

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { User } from "@/app/components/NavbarProfile";
import Space from '../../models/space.model.js'
import connectToDb from "../../../lib/connetToDb";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
    // Start by fetching the current user
    return currentUser()
        .then(async (curUser) => {
            // Retrieve session from cookies
            const cookieStore = cookies();
            const userSession = (await cookieStore).get("userSession");
            const user: User = curUser ? curUser : userSession ? JSON.parse(userSession.value) : null;

            // If no user, return an error response
            if (!user) {
                return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
            }

            // Proceed with the main functionality
            await connectToDb();
            const body = await req.json();
            console.log({ body });
            console.log({ user });

            // Create a new space
            const newSpace = new Space({
                spaceName: body.spaceName,
                spaceLogo: body.spaceLogo,
                headerTitle: body.headerTitle,
                customMessage: body.customMessage,
                questions: body.questions,
                owner: user.id
            });

            // Save the space to the database
            await newSpace.save();

            return NextResponse.json({ success: "New space created successfully" });
        })
        .catch((error) => {
            // Handle errors during the user retrieval or main functionality
            console.log({ error });
            return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
        });
}
