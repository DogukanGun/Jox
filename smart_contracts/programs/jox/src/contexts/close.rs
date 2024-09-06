use anchor_lang::prelude::*;
use anchor_spl::{token::{TokenAccount, Mint, Transfer, Token, transfer, close_account, CloseAccount}, associated_token::AssociatedToken};

use crate::Job;


#[derive(Accounts)]
pub struct Close<'info> {
    #[account(mut)]
    pub maker: Signer<'info>,
    #[account(mut)]
    pub taker: Signer<'info>,
    #[account(mut)]
    pub job: Box<Account<'info, Job>>,
    pub maker_mint: Box<Account<'info, Mint>>,
    #[account(
        init,
        payer = taker,
        associated_token::mint = maker_mint,
        associated_token::authority = taker,
    )]
    taker_ata: Box<Account<'info, TokenAccount>>,
    #[account(
        mut,
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

impl<'info> Close<'info> {
    pub fn close(&mut self) -> Result<()> {
        let cpi_accounts = Transfer {
            from: self.vault.to_account_info(),
            to: self.taker_ata.to_account_info(),
            authority: self.maker.to_account_info(),
        };

        let signer_seeds = &[
            &b"vault"[..],
            &self.maker.key().to_bytes()[..],
            &[self.job.vault_bump],
        ];
        let binding = [&signer_seeds[..]];
        let ctx = CpiContext::new_with_signer(self.token_program.to_account_info(), cpi_accounts, &binding);
        transfer(ctx, self.vault.amount)
    }

    pub fn close_job_offer(&mut self) -> Result<()> {
        let cpi_accounts = CloseAccount {
            account: self.vault.to_account_info(),
            destination: self.maker.to_account_info(),
            authority: self.maker.to_account_info(),
        };
        let signer_seeds = &[
            &b"vault"[..],
            &self.maker.key().to_bytes()[..],
        ];
        let binding = [&signer_seeds[..]];
        let ctx = CpiContext::new_with_signer(self.token_program.to_account_info(), cpi_accounts, &binding);
        close_account(ctx)
    }
}
