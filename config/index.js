export const navConfig = {
  config: [
    {
      title: "Home",
      blockId: "ccbd510110eb4f1bbcc9356b90a2cdf1",
      path: "/",
      private: false,
    },
    {
      title: "Members Portal",
      blockId: "ce9ea572d38045f0835c68b0eeb34e39",
      path: "/members-portal",
      private: false,
    },
    {
      title: "General",
      blockId: "356d4a2a92ca47ebbe678885070e9701",
      path: "/general",
      private: false,
    },
    {
      title: "Learn",
      blockId: "bfef305e641d46f8b9d196c58890d980",
      path: "/learn",
      private: false,
    },
    {
      title: "Build",
      blockId: "b5b5a124f9924676b2e3ab9974770d32",
      path: "/build",
      private: false,
    },
    {
      title: "New Members",
      blockId: "45ed240f9106497a9d5cffbd6c93cb38",
      path: "/new-members",
      private: false,
    },
    {
      title: "Allowlists",
      blockId: "0ccfd5f38d594fa6b38deec20961604e",
      path: "/allowlists",
      private: false,
    },
  ],
};

export const getPage = (path) => {
  return navConfig.config.find((page) => path == page.path);
};
