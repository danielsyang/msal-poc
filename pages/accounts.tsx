import RouteGuard from "@/components/routeGuard";
import { useFetchWithMsal } from "@/hooks/useFetchWithMsal";
import { appRoles } from "@/msal.config";
import { useEffect, useState } from "react";

const roles = [appRoles.Admin, appRoles.Developer];

interface Account {
  accountId: string;
  companyName: string;
  contactCount: number;
  dynamicQrCodeCount: number;
  staticQrCodeCount: number;
}

export default function Accounts() {
  const { error, execute } = useFetchWithMsal({
    scopes: roles,
  });
  const [table, setTable] = useState<Account[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    execute(
      "GET",
      "https://093rtr3p75.execute-api.us-east-1.amazonaws.com/prod/accounts"
    )
      .then((data) => {
        if (data.code !== 403) {
          setTable(data.accounts);
        }
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [execute]);

  return (
    <RouteGuard roles={roles}>
      <h1 className="text-4xl mb-4">accounts</h1>

      {isLoading && <p className="text-2xl text-red-400">Loading...</p>}

      <table>
        <thead>
          <tr>
            <th>accountId</th>
            <th>companyName</th>
            <th>contactCount</th>
            <th>dynamicQrCodeCount</th>
            <th>staticQrCodeCount</th>
          </tr>
        </thead>
        <tbody>
          {table.map(
            ({
              accountId,
              companyName,
              contactCount,
              dynamicQrCodeCount,
              staticQrCodeCount,
            }) => (
              <tr key={accountId}>
                <td>{accountId}</td>
                <td>{companyName}</td>
                <td>{contactCount}</td>
                <td>{dynamicQrCodeCount}</td>
                <td>{staticQrCodeCount}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </RouteGuard>
  );
}
