export const navConfig = {
  config: [
    {
      title: "🎈",
      blockId: "ccbd510110eb4f1bbcc9356b90a2cdf1",
      path: "/",
      private: false,
    },
    {
      title: "Home",
      blockId: "356d4a2a92ca47ebbe678885070e9701",
      path: "/home",
      private: true,
    },
    {
      title: "Resources",
      blockId: "bfef305e641d46f8b9d196c58890d980",
      path: "/resources",
      private: true,
    },
    {
      title: "Build",
      blockId: "b5b5a124f9924676b2e3ab9974770d32",
      path: "/build",
      private: true,
    },
    {
      title: "New Members",
      blockId: "45ed240f9106497a9d5cffbd6c93cb38",
      path: "/new-members",
      private: true,
    },
  ],
};

export const getPage = (path) => {
  return navConfig.config.find((page) => path == page.path);
};
