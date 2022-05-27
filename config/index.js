export const navConfig = {
  config: [
    {
      title: "Start Here",
      blockId: "aae345d6a11c4cce9e39e8cde5036335",
      path: "/",
      private: false,
    },
    {
      title: "Future Gated Page One",
      blockId: "02a59d96341f4b26848b266c2baabca4",
      path: "/gated-one",
      private: true,
    },
    {
      title: "Future Gated Page Two",
      blockId: "ca9286892cae4c00a8b89952cc74ff4c",
      path: "/gated-two",
      private: true,
    },
  ],
};

export const getPage = (path) => {
  return navConfig.config.find((page) => path == page.path);
};
