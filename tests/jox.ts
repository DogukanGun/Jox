import * as anchor from "@coral-xyz/anchor";
import { Program, BN } from "@coral-xyz/anchor";
import { Jox } from "../target/types/jox";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { randomBytes } from "crypto";
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  ComputeBudgetProgram,
} from "@solana/web3.js";

describe("jox", () => {
  // Configure the client to use the local cluster.
  // my pubkey 4bf9YFTm2usSdo2qCg2tsrkJwRepk4LejfNLg6wYJq1a
  anchor.setProvider(anchor.AnchorProvider.env());

  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Jox as Program<Jox>;

  const maker = anchor.web3.Keypair.generate();
  const name = "Test Marketplace33"; // or any variable you are using for the name
  const computeUnit = 4000;
  const confirm = async (signature: string): Promise<string> => {
    const block = await provider.connection.getLatestBlockhash();
    console.log(block.blockhash)
    console.log(block.lastValidBlockHeight)
    const res = await provider.connection.confirmTransaction({
      signature,
      ...block,
    });
    console.log(res);

    return signature;
  };
  const seed = new BN(randomBytes(8));

  const [marketplaceAccount, bump] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("marketplace"), // Constant seed
      Buffer.from(name, 'utf-8') // Name as seed
    ],
    program.programId
  );
  const job = PublicKey.findProgramAddressSync(
    [Buffer.from("job"), maker.publicKey.toBuffer(), seed.toBuffer("le", 8)],
    program.programId
  )[0];
  it("Airdrop", async () => {
    const airdrop = await provider.connection.requestAirdrop(maker.publicKey, 2 * anchor.web3.LAMPORTS_PER_SOL).then(confirm);
    console.log("\nAirdropped 1 SOL to maker", airdrop);
  })

  it("Marketplace init", async () => {
    const tx = await program
      .methods
      .init(name)
      .accountsPartial({
        admin: maker.publicKey,
        marketplace: marketplaceAccount,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([maker])
      .rpc({
        skipPreflight: true,
      })
    console.log(`Success! Check out your TX here:
        https://explorer.solana.com/tx/${tx}?cluster=devnet`);
    confirm(tx)
    console.log("\nInitialized Marketplace Account");
    console.log("Your transaction signature", tx);
  })

  it("Job is created", async () => {
    try {
      const tx = await program
        .methods
        .publish(seed, "Test das", "Tesdasd Company121", "Test dasdo121b")
        .accountsPartial({
          maker: maker.publicKey,
          posting: job,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .signers([maker])
        .rpc({
          skipPreflight: true,
        })
      console.log(`Success! Check out your TX here:
        https://explorer.solana.com/tx/${tx}?cluster=devnet`);
      confirm(tx)
      console.log("\nInitialized Job Account");
      console.log("Your transaction signature", tx);
    } catch (error) {
      console.error("Error:", error);
      if (error.message.includes("parse")) {
        // Specific handling for parse errors
        console.error("Parsing error occurred:", error);
      }
    }
  });
  it("Job is added into marketplace", async () => {
    try {
      const tx = await program
        .methods
        .save(job)
        .accountsPartial({
          admin: maker.publicKey,
          marketplace: marketplaceAccount,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .signers([maker])
        .rpc({
          skipPreflight: true,
        })
       
      console.log(`Success! Check out your TX here:
      https://explorer.solana.com/tx/${tx}?cluster=devnet`);
      confirm(tx)
      console.log("\nJob is added into marketplace");
      console.log("Your transaction signature", tx);
    } catch (error) {
      console.error("Error:", error);
      if (error.message.includes("parse")) {
        // Specific handling for parse errors
        console.error("Parsing error occurred:", error);
      }
    }

  })
});
