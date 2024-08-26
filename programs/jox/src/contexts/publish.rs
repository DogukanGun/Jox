use anchor_lang::{prelude::*, system_program::{Transfer, transfer}};
use anchor_spl::{associated_token::AssociatedToken, token::{Mint, TokenAccount, Token}};

use crate::Job;

#[derive(Accounts)]
#[instruction(seed: u64)]
pub struct Publish<'info> {
    #[account(mut)]
    pub maker: Signer<'info>,
    #[account(
        init,
        payer = maker,
        space = Job::INIT_SPACE,
        seeds = [b"job", maker.key().as_ref(), seed.to_le_bytes().as_ref()],
        bump
    )]
    pub posting: Account<'info, Job>,
    pub maker_mint: Box<Account<'info, Mint>>,
    #[account(
        mut,
        associated_token::authority = maker,
        associated_token::mint = maker_mint,
    )]
    pub maker_ata: Box<Account<'info, TokenAccount>>,
    #[account(
        init,
        payer = maker,
        seeds = [b"vault", maker.key().as_ref()],
        bump,
        token::mint = maker_mint,
        token::authority = maker,
    )]
    pub vault: Box<Account<'info, TokenAccount>>,
    pub system_program: Program<'info, System>,
    associated_token_program: Program<'info, AssociatedToken>,
    token_program: Program<'info, Token>,
}


impl<'info> Publish<'info> {
    pub fn create_job_posting(
        &mut self,
        seed: u64,
        application_pid: String,
        company_name: String,
        position_title: String,
        bumps: &PublishBumps,
    ) -> Result<()> {
        self.posting.set_inner(Job {
            seed,
            application_pid,
            company_name,
            position_title,
            applicants:Vec::new(),
            bump: bumps.posting,
            vault_bump: bumps.vault
        });
        msg!("Job is created");
        Ok(())
    }

    pub fn stake(&mut self,amount:u64) -> Result<()> {
        let accounts = Transfer {
            from: self.maker.to_account_info(),
            to: self.vault.to_account_info(),
        };

        let cpi_ctx = CpiContext::new(self.system_program.to_account_info(), accounts);
        transfer(cpi_ctx, amount)?;

        Ok(())
    }
}
