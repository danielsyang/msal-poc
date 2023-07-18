import AuthButton from "@/components/authButton";
import { useMsal } from "@azure/msal-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const { accounts } = useMsal();
  const [user, setUser] = useState<{
    name?: string;
    roles?: string[];
    username?: string;
  } | null>(null);

  useEffect(() => {
    if (accounts.length !== 0) {
      setUser({
        name: accounts[0].idTokenClaims?.name,
        roles: accounts[0].idTokenClaims?.roles,
        username: accounts[0].username,
      });
    }
  }, [accounts]);

  return (
    <main>
      <div className="p-4 flex gap-4 items-center border-b-2">
        <Link href="/accounts">
          <p>Accounts</p>
        </Link>
        <Link href="/sales">
          <p>Sales</p>
        </Link>
        <Link href="/devs">
          <p>Dev</p>
        </Link>

        <div className="ml-auto">
          <AuthButton />
        </div>
      </div>
      <div className="px-4 py-8">
        {user && (
          <>
            <p>
              <span className="font-bold">Hello:</span> {user.name}
            </p>
            <p>
              <span className="font-bold">Roles: </span> [
              {user.roles?.join(", ")}]
            </p>
            <p>
              <span className="font-bold">Username: </span> {user.username}
            </p>
          </>
        )}
      </div>
    </main>
  );
}
