import React from "react";

export const useIsMounted = () => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return mounted;
};

export const shortAddress = (address) => {
  if (!address) return;
  return `${address.substring(0, 5)}…${address.substring(38)}`;
};
