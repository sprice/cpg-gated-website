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
  const { data: ensAvatar } = useEnsAvatar({ addressOrName: account?.address });
  const { data: ensName } = useEnsName({ address: account?.address });
  const { connect, connectors, error, isConnecting, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();
  const { activeChain } = useNetwork();

  const { signMessageAsync } = useSignMessage();

  const signIn = React.useCallback(async () => {
    try {
      const address = account?.address;
      const chainId = activeChain?.id;
      if (!address || !chainId) return;

      setState((x) => ({ ...x, error: undefined, loading: true }));
      // Fetch random nonce, create SIWE message, and sign with wallet
      const nonceRes = await fetch("/api/nonce");
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: "Sign in with Ethereum to the app.",
        uri: window.location.origin,
        version: "1",
        chainId,
        nonce: await nonceRes.text(),
      });
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });

      // Verify signature
      const verifyRes = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, signature }),
      });
      if (!verifyRes.ok) throw new Error("Error verifying message");

      setState((x) => ({ ...x, address, loading: false }));
    } catch (error) {
      setState((x) => ({ ...x, error, loading: false }));
    }
  }, []);

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
  }, [state.address]);

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

  if (account) {
    const prettyAddress = shortAddress(account.address);
    return (
      <div>
        {/* <img src={ensAvatar} alt="ENS Avatar" /> */}

        {alignSide && (
          <>
            <p>
              <small>
                {ensName ? `${ensName} (${prettyAddress})` : prettyAddress}
              </small>
            </p>
            <p>
              <small>Connected with {account?.connector?.name}</small>
            </p>
            <p>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={disconnectWallet}
              >
                Disconnect
              </button>
            </p>
          </>
        )}
        {!alignSide && (
          <>
            <small>
              {ensName ? `${ensName} (${prettyAddress})` : prettyAddress}
            </small>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={disconnectWallet}
            >
              Disconnect
            </button>
          </>
        )}
        {state.address ? (
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={async () => {
              await fetch("/api/logout");
              setState({});
            }}
          >
            Sign Out
          </button>
        ) : (
          <button
            type="button"
            disabled={state.loading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={signIn}
          >
            Sign-In with Ethereum
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      <ConnectWalletModal open={open} setOpen={setOpen} />
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={openModal}
      >
        Connect Wallet
      </button>
    </>
  );
}
