import connectToDb from "@/lib/connetToDb";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import User from '../../models/user.model.js'
export async function GET() {
    const user = await currentUser();

    if (user) {
        await checkInDB(user.id, user.firstName, user.lastName)
        const userSession = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.emailAddresses[0]?.emailAddress,
            imageUrl: user.imageUrl
        };

        // Store user session in cookies (secure and HttpOnly)
        const headers = new Headers();
        headers.append("Set-Cookie", `userSession=${JSON.stringify(userSession)}; Path=/; HttpOnly; Secure; SameSite=Strict;`);

        return NextResponse.json({ user: userSession }, { headers });
    }

    return NextResponse.json({ error: "User not found" }, { status: 401 });
}


const checkInDB = async (userId: string, firstName: string | null, lastName: string | null) => {
    await connectToDb();
    const user = await User.findOne({ id: userId });
    if (!user) {
        const userName = firstName && lastName ? `${lastName}${firstName}` : userId;
        const newUser = new User({
            id: userId,
            userName: userName,
        });
        await newUser.save();
    }
}
