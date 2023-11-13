'use client'

import { useMsal, AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { authScopes } from "../authConfig";
import { useEffect, useState } from "react";

export default function App() {
    const { instance, accounts } = useMsal();
    const [accountDetails, setAccountDetails] = useState<any>(null);

    useEffect(() => {
    if (accounts.length > 0) {
        console.log('accounts', accounts)
        setAccountDetails(accounts[0]);
    }
    }
    , [accounts]);

    function handleLogin() {
        console.log('accounts', instance)
        instance.loginPopup(authScopes).then(response => {
            console.log("login successful!", response);

            instance.setActiveAccount(response.account);
            setAccountDetails(response.account);
        }).catch(e => {
            console.error(e);
        });
    }
    console.log({accountDetails})
    function handleLogout() {
        instance.logoutPopup().then(response => {

        }).catch(e => {
            console.log(e);
        });
    }

    return (
        <div className="flex justify-center items-center h-[100vh]">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto text-center flex flex-col gap-3">
              <h1>Welcome !</h1>
              <AuthenticatedTemplate>
                  <h6>You are logged in!</h6>
                  {accountDetails && (
                      <center>
                          Name: {accountDetails.name}
                      </center>
                  )}
                  <button onClick={() => handleLogout()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Logout</button >
              </AuthenticatedTemplate>
              <UnauthenticatedTemplate>
                  <p>Please log in</p>

                  <button onClick={() => handleLogin()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Login
                  </button>
              </UnauthenticatedTemplate>
            </div>
        </div>
    );
}