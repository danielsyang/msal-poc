import { scopes } from "@/config";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";

export default function AuthButton() {
  const { instance } = useMsal();

  const handleLoginPopup = () => {
    instance
      .loginPopup({
        // redirectUri: "/redirect", // redirects the top level app after logout
        scopes,
      })
      .catch((error) => console.log(error));
  };

  const handleLogoutPopup = () => {
    instance
      .logoutPopup({
        mainWindowRedirectUri: "/", // redirects the top level app after logout
        account: instance.getActiveAccount(),
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <AuthenticatedTemplate>
        <button
          className="p-4 border rounded bg-red-400"
          onClick={handleLogoutPopup}
        >
          Log out
        </button>
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <button className="p-4 border rounded" onClick={handleLoginPopup}>
          Continue with Outlook
        </button>
      </UnauthenticatedTemplate>
    </>
  );
}
