import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
    const user = await currentUser();

    if (user) {
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
