import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { OnChainMetadata } from "../target/types/on_chain_metadata";
import { red } from "bn.js";
import { assert } from "chai";

const VIP_METADATA = {
  description:
    "[Milady Maker](https://www.miladymaker.net) is a collection of 10,000 generative pfpNFT's in a neochibi aesthetic inspired by Tokyo street style tribes.",
  external_url: "https://miladymaker.net",
  image: "https://www.miladymaker.net/milady/3762.png",
  name: "Milady 3762",
  attributes: [
    {
      trait_type: "Background",
      value: "roadside",
    },
    {
      trait_type: "Race",
      value: "tan",
    },
    {
      trait_type: "Eyes",
      value: "sleepy",
    },
    {
      trait_type: "Eye Color",
      value: "green",
    },
    {
      trait_type: "Shirt",
      value: "western jacket",
    },
    {
      trait_type: "Hair",
      value: "og green",
    },
    {
      trait_type: "Hat",
      value: "trucker white rabbit",
    },
    {
      trait_type: "Drip Score",
      value: "30",
    },
    {
      trait_type: "Core",
      value: "hypebeast-gyaru",
    },
    {
      trait_type: "Drip Grade",
      value: "b-drip",
    },
    {
      trait_type: "Number",
      value: "3762",
    },
  ],
};

describe("on-chain-metadata", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.OnChainMetadata as Program<OnChainMetadata>;
  const wallet = program.provider.publicKey;

  let metadataKp: anchor.web3.Keypair = anchor.web3.Keypair.generate();
  let metadata = metadataKp.publicKey;

  it("Is initialized!", async () => {
    let metadataBytes = JSON.stringify(VIP_METADATA);

    // Create metadata
    let tx = await program.methods
      .initialize(new anchor.BN(metadataBytes.length))
      .preInstructions([])
      .accounts({
        owner: wallet,
        metadata,
      })
      .signers([metadataKp])
      .rpc({ skipPreflight: true, commitment: "confirmed" });

    console.log(
      "Initialized metadata account for address",
      metadata.toBase58()
    );

    let checked = await program.account.onChainMetadata.fetch(metadata);
    console.log(checked);

    // Write JSON on-chain
    let bytesWritten = 0;
    let byteStep = 600;
    while (bytesWritten < metadataBytes.length) {
      await program.methods
        .write(
          new anchor.BN(bytesWritten),
          Buffer.from(
            metadataBytes.slice(bytesWritten, bytesWritten + byteStep)
          )
        )
        .accounts({
          owner: wallet,
          metadata,
        })
        .rpc({ skipPreflight: true, commitment: "confirmed" });
      bytesWritten += byteStep;
    }

    // Validate JSON
    await program.methods
      .validate()
      .accounts({ metadata })
      .rpc({ skipPreflight: true, commitment: "confirmed" });
    console.log("Wrote metadata to account", metadata.toBase58());

    checked = await program.account.onChainMetadata.fetch(metadata);
    assert(checked.isValidated === true, "Expected isValidated to be true");
    const redone = JSON.parse(checked.data.toString("utf-8"));
    assert(
      JSON.stringify(redone) === JSON.stringify(VIP_METADATA),
      "Expected on-chain metadata to match off-chain JSON"
    );
  });
});
