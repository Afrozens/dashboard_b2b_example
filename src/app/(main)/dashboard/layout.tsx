import { cookies } from "next/headers";

import { User } from "@/models/user";
import { AuthenticatedCookies } from "@/utils/auth";
import Custom404 from "@/components/general/404";
import { handleAuthUserMe } from "@/app/lib/auth";
import TemplateDashboard from "@/components/dashboard/TemplateDashboard";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const cookieStore = cookies();
    const token = cookieStore.get(AuthenticatedCookies.ACCESS)?.value
    let user: User | null = null

    user = await handleAuthUserMe(token)

    return (
        <>
            {!user ? (
                <Custom404 />
            ) : (
            <TemplateDashboard user={user} >
                {children}
            </TemplateDashboard>
            )}
        </>
    );
}