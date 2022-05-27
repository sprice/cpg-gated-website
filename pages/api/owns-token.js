import { withIronSessionApiRoute } from "iron-session/next";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const aWeb3 = createAlchemyWeb3(process.env.NEXT_PUBLIC_EVM_RPC_URL);
import { ironOptions } from "./utils";

const genesisContract = process.env.NEXT_PUBLIC_GENESIS_CONTRACT;
const popContract = process.env.NEXT_PUBLIC_POP_CONTRACT;

const handler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      const owner = req.session.siwe?.address;
      if (!owner) {
        return res
          .status(404)
          .json({ status: 404, message: `Address not signed in` });
      }

      const genesis = await aWeb3.alchemy.getNfts({
        owner,
        contractAddresses: genesisContract,
      });

      const pop = await aWeb3.alchemy.getNfts({
        owner,
        contractAddresses: popContract,
      });

      // @TODO: This can be generalized for an array of contract addresses in env vars
      const hasGenesis = genesis?.ownedNfts?.length > 0;
      const hasPop = pop?.ownedNfts?.length > 0;

      const ownsToken = hasGenesis || hasPop;

      req.session.ownsToken = ownsToken;

      res.send({ address: req.session.siwe?.address, ownsToken });
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withIronSessionApiRoute(handler, ironOptions());
