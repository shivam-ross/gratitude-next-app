import SignIn from "@/components/signin";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Signin () {
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    if(session) {
        redirect("/home");
    }
    return <div>
        <SignIn/>
    </div>
}