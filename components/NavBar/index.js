/* This example requires Tailwind CSS v2.0+ */
import Link from "next/link";
import ConnectWalletButton from "../ConnectWalletButton";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { navConfig } from "../../config";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar(props) {
  const { ownsToken, setOwnsToken } = props;
  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {navConfig.config.map((link, index) => {
                    if (link.private && !ownsToken) return;
                    return (
                      <Link href={link.path} key={index}>
                        <a className="border-red-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-extralight font-cpg">
                          {link.title}
                        </a>
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <ConnectWalletButton
                  ownsToken={ownsToken}
                  setOwnsToken={setOwnsToken}
                />
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navConfig.config.map((link, index) => {
                if (link.private && !ownsToken) return;
                return (
                  <Disclosure.Button
                    as="a"
                    key={index}
                    href={link.path}
                    className="bg-red-50 border-cpg-red text-cpg-red block pl-3 pr-4 py-2 border-l-4 text-base font-extralight font-cpg"
                  >
                    {link.title}
                  </Disclosure.Button>
                );
              })}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200 ml-2">
              <ConnectWalletButton
                ownsToken={ownsToken}
                setOwnsToken={setOwnsToken}
                alignSide={true}
              />
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
