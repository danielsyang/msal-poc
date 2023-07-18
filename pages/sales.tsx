import RouteGuard from "@/components/routeGuard";
import { appRoles } from "@/msal.config";

export default function Sales() {
  return (
    <RouteGuard roles={[appRoles.Sale]}>
      <div>sales</div>
    </RouteGuard>
  );
}
