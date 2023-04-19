// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as anchor from "@coral-xyz/anchor";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { OnChainMetadata, IDL } from "../../types/on_chain_metadata";

type Data = Record<string, string | Object>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let provider = new anchor.AnchorProvider(
    new anchor.web3.Connection(process.env.CONNECTION_URL as string),
    new NodeWallet(anchor.web3.Keypair.generate()),
    {}
  );
  try {
    let program = new anchor.Program(
      IDL,
      process.env.PROGRAM_ADDRESS as string,
      provider
    ) as anchor.Program<OnChainMetadata>;
    let metadata = await program.account.onChainMetadata.fetch(
      req.query.account as string,
      "confirmed"
    );

    if (metadata.isValidated) {
      let obj = JSON.parse(metadata.data.toString("utf-8"));
      return res.status(200).json(obj);
    } else {
      return res.status(500).json({
        name: "Error: on-chain metadata has not been `validated` yet, so it cannot be parsed as JSON",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      name: "Error: on-chain metadata does not exist",
    });
  }
}
