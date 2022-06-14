import React, { useState } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useNetwork,
  useSignMessage,
} from "wagmi";
import { SiweMessage } from "siwe";

import ConnectWalletModal from "../ConnectWalletModal";
import { useIsMounted, shortAddress } from "../../utils";

/* This example requires Tailwind CSS v2.0+ */
export default function ConnectWalletButton(props) {
  const { ownsToken, setOwnsToken, alignSide } = props;

  const [open, setOpen] = useState(false);
  const [state, setState] = useState({});

  const isMounted = useIsMounted();

  const { data: account } = useAccount();
  const { connectAsync, connectors, error, isConnecting, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();
  const { activeChain } = useNetwork();

  const { signMessageAsync } = useSignMessage();

  // Connect wallet and Sign In With Ethereum
  const signIn = React.useCallback(async (connector) => {
    try {
      const res = await connectAsync(connector);
      const nonceRes = await fetch("/api/nonce");
      const message = new SiweMessage({
        domain: window.location.host,
        address: res.account,
        statement: "Sign in with Ethereum to the app.",
        uri: window.location.origin,
        version: "1",
        chainId: res.chain?.id,
        nonce: await nonceRes.text(),
      });

      const signer = await connector.getSigner();
      const signature = await signer.signMessage(message.prepareMessage());

      const verifyRes = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, signature }),
      });
      if (!verifyRes.ok) throw new Error("Error verifying message");

      setState((x) => ({ ...x, address: res.account, loading: false }));
    } catch (error) {
      disconnect();
      await fetch("/api/logout");
      setState((x) => ({ ...x, error, loading: false }));
    }
  }, []);

  // Check for tokens owned
  React.useEffect(() => {
    const handler = async () => {
      try {
        const res = await fetch("/api/owns-token");
        const json = await res.json();
        const ownsToken = json?.ownsToken;
        setOwnsToken(ownsToken);
      } catch (_error) {}
    };
    // 1. page loads
    handler();

    // 2. window is focused (in case user logs out of another window)
    window.addEventListener("focus", handler);
    return () => window.removeEventListener("focus", handler);
  }, [state?.address]);

  // Check if user is Signed In With Ethereum
  React.useEffect(() => {
    const handler = async () => {
      try {
        const res = await fetch("/api/user");
        const json = await res.json();
        setState((x) => ({ ...x, address: json.address }));
      } catch (_error) {}
    };
    // 1. page loads
    handler();

    // 2. window is focused (in case user logs out of another window)
    window.addEventListener("focus", handler);
    return () => window.removeEventListener("focus", handler);
  }, []);

  const openModal = () => {
    if (!open) setOpen(true);
    else setOpen(false);
  };

  const disconnectWallet = () => {
    setOpen(false);
    disconnect();
  };

  if (!isMounted) return;

  const prettyAddress = shortAddress(state?.address);

  if (state.address) {
    return (
      <div>
        {/* <img src={ensAvatar} alt="ENS Avatar" /> */}

        {alignSide && (
          <>
            <p>
              <small>Connected as ${prettyAddress}</small>
            </p>
            <p>
              <small>Connected with {account?.connector?.name}</small>
            </p>
          </>
        )}
        {!alignSide && (
          <>
            <small className="mr-2">Connected as {prettyAddress}</small>
          </>
        )}

        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-cpg rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          onClick={async () => {
            await fetch("/api/logout");
            disconnectWallet();
            setState({});
          }}
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <>
      <ConnectWalletModal
        open={open}
        setOpen={setOpen}
        signIn={signIn}
        connectors={connectors}
        error={state?.error}
        isConnecting={isConnecting}
        pendingConnector={pendingConnector}
        disconnect={disconnect}
      />
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 border border-cpg-red text-sm font-cpg rounded-md shadow-sm text-white bg-cpg-red hover:bg-cpg-red focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cpg-red"
        onClick={openModal}
      >
        Connect Wallet
      </button>
    </>
  );
}
