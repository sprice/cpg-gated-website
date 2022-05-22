import React from "react";
import { withIronSessionApiRoute } from "iron-session/next";
const { Client } = require("@notionhq/client");
import { ironOptions } from "../utils";

const { NOTION_API_TOKEN } = process.env;

const notion = new Client({ auth: NOTION_API_TOKEN });

const handler = async (req, res) => {
  const { id } = req.query;
  const { method } = req;
  switch (method) {
    case "GET":
      const response = await notion.blocks.children.list({
        block_id: id,
      });
      console.log("response", response);
      res.send({ response });
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withIronSessionApiRoute(handler, ironOptions());
