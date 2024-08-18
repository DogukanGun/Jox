import * as anchor from "@coral-xyz/anchor";
import { Program,BN } from "@coral-xyz/anchor";
import { Jox } from "../target/types/jox";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { randomBytes } from "crypto";
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
describe("jox", () => {
  // Configure the client to use the local cluster.
  // my pubkey BRBqCuMuZBU1c1PAvPfuqTjQrMjpY3MfReUz6tnnQAf8
  anchor.setProvider(anchor.AnchorProvider.env());

  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Jox as Program<Jox>;

  const maker = anchor.web3.Keypair.generate();

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

  it("Airdrop", async() => {
    const airdrop = await provider.connection.requestAirdrop(maker.publicKey, 1 * anchor.web3.LAMPORTS_PER_SOL).then(confirm);
    console.log("\nAirdropped 1 SOL to maker", airdrop);
  })
  const seed = new BN(randomBytes(8));

  it("Job is posted", async () => {
    const job = PublicKey.findProgramAddressSync(
      [Buffer.from("job"), maker.publicKey.toBuffer(), seed.toBuffer("le", 8)],
      program.programId
    )[0];
    const tx = await program
      .methods
      .publish(seed,"Test cid","Test Company","Test Job")
      .accountsPartial({
        maker: maker.publicKey,
        posting:job,
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
  });
});
