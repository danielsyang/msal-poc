import { scopes } from "@/msal.config";
import {
  useMsal,
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { useEffect, useState } from "react";

interface RouteGuardProps {
  children?: React.ReactNode;
  roles: string[];
}

export const loginRequest = {
  scopes,
};

export default function RouteGuard({ children, roles }: RouteGuardProps) {
  const { accounts } = useMsal();
  const [isAuthorized, setAuthorized] = useState(false);

  useEffect(() => {
    const account = accounts[0];

    roles.forEach((role) => {
      if (account.idTokenClaims?.roles?.includes(role)) {
        setAuthorized(true);
      }
    });
  }, [accounts, roles]);

  return (
    <>
      <AuthenticatedTemplate>
        {isAuthorized ? (
          <>{children}</>
        ) : (
          "You are unauthorized to view this content"
        )}
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        You are unauthorized to view this content
      </UnauthenticatedTemplate>
    </>
  );
}
