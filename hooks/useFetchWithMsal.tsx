import { scopes } from "@/msal.config";
import { InteractionType, PopupRequest } from "@azure/msal-browser";
import { useAccount, useMsal, useMsalAuthentication } from "@azure/msal-react";
import { useCallback, useState } from "react";

export const useFetchWithMsal = (params: PopupRequest) => {
  const { instance, accounts } = useMsal();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const account = useAccount(accounts[0]);

  const { result, error: msalError } = useMsalAuthentication(
    InteractionType.Popup,
    {
      ...params,
      // @ts-ignore
      account: accounts[0],
      redirectUri: "/redirect",
    }
  );

  /**
   * Execute a fetch request with the given options
   * @param {string} method: GET, POST, PUT, DELETE
   * @param {String} endpoint: The endpoint to call
   * @param {Object} data: The data to send to the endpoint, if any
   * @returns JSON response
   */
  // @ts-ignore
  const execute = async (method, endpoint, data = null) => {
    if (msalError) {
      // @ts-ignore
      setError(msalError);
      return;
    }

    // console.log(
    //   "result",

    // );

    const token = await instance.acquireTokenSilent({
      scopes: scopes,
      account: accounts[0],
    });

    if (token && token.accessToken) {
      try {
        let response = null;

        const headers = new Headers();
        const bearer = `Bearer ${token.accessToken}`;
        headers.append("Authorization", bearer);

        if (data) headers.append("Content-Type", "application/json");

        let options = {
          method: method,
          headers: headers,
          body: data ? JSON.stringify(data) : null,
        };

        setIsLoading(true);

        response = await (await fetch(endpoint, options)).json();
        setData(response);

        setIsLoading(false);
        return response;
      } catch (e) {
        // @ts-ignore
        setError(e);
        setIsLoading(false);
        throw e;
      }
    }
  };

  return {
    isLoading,
    error,
    data,
    execute: useCallback(execute, [result, msalError, instance, accounts]), // to avoid infinite calls when inside a `useEffect`
  };
};
