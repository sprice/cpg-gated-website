/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function ConnectWalletModal({
  open,
  setOpen,
  signIn,
  connectors,
  error,
  isConnecting,
  pendingConnector,
}) {
  const renderConnectors = () => (
    <div>
      {connectors.map((connector) => {
        if (connector.name === "Injected") return;
        return (
          <div key={connector.id}>
            <button
              type="button"
              className="mb-2 w-full inline-flex items-center px-4 py-2 border border-transparent text-sm font-extralight font-cpg rounded-md shadow-sm text-white bg-cpg-red hover:bg-cpg-red focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cpg-red"
              disabled={!connector.ready}
              onClick={() => {
                signIn(connector);
              }}
            >
              {connector.name}
              {!connector.ready && " (unsupported)"}
              {isConnecting &&
                connector.id === pendingConnector?.id &&
                " (connecting)"}
            </button>
          </div>
        );
      })}

      {error && <div>{error.message}</div>}
    </div>
  );

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6">
                {renderConnectors}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
