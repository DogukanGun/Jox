import * as anchor from "@coral-xyz/anchor";
import { Program, BN } from "@coral-xyz/anchor";
import { Jox } from "../target/types/jox";
import { randomBytes } from "crypto";
import {
  Keypair,
  PublicKey,
  LAMPORTS_PER_SOL,
  Commitment,
} from "@solana/web3.js";
import { ASSOCIATED_TOKEN_PROGRAM_ID as associatedTokenProgram, TOKEN_PROGRAM_ID as tokenProgram, createMint, createAccount, mintTo, getAssociatedTokenAddress } from "@solana/spl-token"
const commitment: Commitment = "confirmed"

describe("jox", () => {
  // Configure the client to use the local cluster.
  // my pubkey 4bf9YFTm2usSdo2qCg2tsrkJwRepk4LejfNLg6wYJq1a
  anchor.setProvider(anchor.AnchorProvider.env());

  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Jox as Program<Jox>;

  const maker = anchor.web3.Keypair.generate();
  const taker = anchor.web3.Keypair.generate();
  const name = "Test Marketplace63";
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
  //Mint
  let maker_token: PublicKey;
  // ATAs
  let maker_ata: PublicKey; // Maker + maker token
  let taker_receive_ata: PublicKey; // Taker + maker

  //Seeds
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
  const vault = PublicKey.findProgramAddressSync([Buffer.from("vault"), maker.publicKey.toBuffer()], program.programId)[0];


  it("Airdrop", async () => {
    const airdropMaker = await provider.connection.requestAirdrop(maker.publicKey, 20 * anchor.web3.LAMPORTS_PER_SOL).then(confirm);
    const airdropTaker = await provider.connection.requestAirdrop(taker.publicKey, 20 * anchor.web3.LAMPORTS_PER_SOL).then(confirm);
    console.log("\nAirdropped 5 SOL to maker", airdropMaker);
    console.log("\nAirdropped 5 SOL to maker", airdropTaker);
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
  it("Mint maker", async () => {
    // Create mints and ATAs
    let m = await newMintToAta(anchor.getProvider().connection, maker)
    maker_token = m.mint;
    maker_ata = m.ata;
    taker_receive_ata = await getAssociatedTokenAddress(maker_token, taker.publicKey, false, tokenProgram);

  })
  it("Job is created", async () => {
    try {
      const tx = await program
        .methods
        .publish(seed, "Test das", "Tesdasd Company121", "Test dasdo121b", new BN(1 * LAMPORTS_PER_SOL))
        .accountsPartial({
          maker: maker.publicKey,
          makerAta: maker_ata,
          makerMint: maker_token,
          vault: vault,
          posting: job,
          tokenProgram: tokenProgram,
          associatedTokenProgram: associatedTokenProgram,
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
  it("Apply for the job", async () => {
    try {
      const cid = "Test cid"
      const tx = await program
        .methods
        .apply(cid)
        .accountsPartial({
          applicant: taker.publicKey,
          job: job,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .signers([taker])
        .rpc({
          skipPreflight: true,
        })
      console.log(`Success! Check out your TX here:
          https://explorer.solana.com/tx/${tx}?cluster=devnet`);
      confirm(tx)
      console.log("\nApplied for the job");
      console.log("Your transaction signature", tx);
    } catch (error) {
      console.error("Error:", error);
      if (error.message.includes("parse")) {
        // Specific handling for parse errors
        console.error("Parsing error occurred:", error);
      }
    }
  })
  it("Accept the application", async () => {
    try {
      const vaultAccountInfo = await provider.connection.getAccountInfo(vault);
      console.log("Vault owner: ", vaultAccountInfo?.owner.toBase58());

      const takerAtaInfo = await provider.connection.getAccountInfo(taker_receive_ata);
      console.log("Taker ATA owner: ", takerAtaInfo?.owner.toBase58());
      const tx = await program
        .methods
        .close()
        .accountsPartial({
          maker: maker.publicKey,
          taker: taker.publicKey,
          job: job,
          makerMint: maker_token,
          takerAta: taker_receive_ata,
          vault: vault,
          tokenProgram: tokenProgram,
          associatedTokenProgram: associatedTokenProgram,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .signers([taker, maker])
        .rpc({
          skipPreflight: true,
        })
      console.log(`Success! Check out your TX here:
          https://explorer.solana.com/tx/${tx}?cluster=devnet`);
      confirm(tx)
      console.log("\nApplied for the job");
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

const confirmTx = async (signature: string) => {
  const latestBlockhash = await anchor.getProvider().connection.getLatestBlockhash();
  await anchor.getProvider().connection.confirmTransaction(
    {
      signature,
      ...latestBlockhash,
    },
    commitment
  )
}

const newMintToAta = async (connection, minter: Keypair): Promise<{ mint: PublicKey, ata: PublicKey }> => {
  const mint = await createMint(connection, minter, minter.publicKey, null, 6)
  // await getAccount(connection, mint, commitment)
  const ata = await createAccount(connection, minter, mint, minter.publicKey)
  const signature = await mintTo(connection, minter, mint, ata, minter, 21e8)
  await confirmTx(signature)
  return {
    mint,
    ata
  }
}