import RouteGuard from "@/components/routeGuard";
import { appRoles } from "@/msal.config";

export default function Accounts() {
  return (
    <RouteGuard roles={[appRoles.Developer]}>
      <div>devs</div>
    </RouteGuard>
  );
}
