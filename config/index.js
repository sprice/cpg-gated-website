export const navConfig = {
  config: [
    {
      title: "Home",
      blockId: "2ce8af5320e54b09b6e924f246474816",
      path: "/",
      private: false,
    },
    {
      title: "Gated: One",
      blockId: "32e8f081be364b64a5e4cfb05d0553ec",
      path: "/one",
      private: true,
    },
    {
      title: "Gated: Two",
      blockId: "8dae98cbf47943eaa91bbb02bfee9568",
      path: "/two",
      private: true,
    },
  ],
  // config: [
  //   {
  //     title: "Page",
  //     blockId: "777c2af47da84cef8c8846bb038fc97f",
  //     path: "/1",
  //     private: false,
  //   },
  //   {
  //     title: "Callout",
  //     blockId: "5393eec2b27848f08241d649baa678de",
  //     path: "/2",
  //     private: true,
  //   },
  //   {
  //     title: "Divider",
  //     blockId: "d2358f140288425d91618df4286eebcb",
  //     path: "/3",
  //     private: true,
  //   },
  // ],
};

export const getPage = (path) => {
  return navConfig.config.find((page) => path == page.path);
};
