export const navConfig = {
  config: [
    {
      title: "Home",
      blockId: "ce9ea572d38045f0835c68b0eeb34e39",
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
  
// beginning of new pages + embeds
//    config: [
//     {
//       title: "Home",
//       blockId: "6d28e79c2dad4831a50af47c16fd41e6",
//       path: "/",
//       private: false,
//     },
//     {
//       title: "Members Portal",
//       blockId: "9034213770194455aa547b3e906c9e17",
//       path: "/members-portal",
//       private: true,
//    // embedlink: <iframe src="https://v1.embednotion.com/embed/ce9ea572d38045f0835c68b0eeb34e39"></iframe>  <style>  iframe { width: 100%; height: 500px; border: 2px solid #ccc; border-radius: 10px; padding: none; }  </style>
//     },
//     {
//       title: "General",
//       blockId: "ef98383ca8814d74abd3aa6397d74087",
//       path: "/general",
//       private: true,
//    // embedlink: <iframe src="https://v1.embednotion.com/embed/356d4a2a92ca47ebbe678885070e9701"></iframe>  <style>  iframe { width: 100%; height: 500px; border: 2px solid #ccc; border-radius: 10px; padding: none; }  </style>
//     },
//     {
//       title: "Learn",
//       blockId: "80f7d4c9ff4a4ceeb7076b4f3987a5ea",
//       path: "/learn",
//       private: true,
//    // embedlink: <iframe src="https://v1.embednotion.com/embed/bfef305e641d46f8b9d196c58890d980"></iframe>  <style>  iframe { width: 100%; height: 500px; border: 2px solid #ccc; border-radius: 10px; padding: none; }  </style>
//     },
//     {
//       title: "Build",
//       blockId: "cfc8f300d44f413d92fb4b9fed1da177",
//       path: "/build",
//       private: true,
//    // embedlink: <iframe src="https://v1.embednotion.com/embed/b5b5a124f9924676b2e3ab9974770d32"></iframe>  <style>  iframe { width: 100%; height: 500px; border: 2px solid #ccc; border-radius: 10px; padding: none; }  </style>
//     }, 
//     {
//       title: "New Members",
//       blockId: "dbb9dc9b93de401998cd03e9d106f51b",
//       path: "/new-members",
//       private: true,
//    // embedlink: <iframe src="https://v1.embednotion.com/embed/45ed240f9106497a9d5cffbd6c93cb38"></iframe>  <style>  iframe { width: 100%; height: 500px; border: 2px solid #ccc; border-radius: 10px; padding: none; }  </style>
//     }, 
//     {
//       title: "Allowlists",
//       blockId: "93a177303bd8441db28ace7eec46b7ec",
//       path: "/allowlists",
//       private: true,
//    // embedlink: <iframe src="https://v1.embednotion.com/embed/0ccfd5f38d594fa6b38deec20961604e"></iframe>  <style>  iframe { width: 100%; height: 500px; border: 2px solid #ccc; border-radius: 10px; padding: none; }  </style>
//     }, 
//   ],
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
