use anchor_lang::prelude::*;

use crate::state::Marketplace;

#[derive(Accounts)]
pub struct Save<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,
    #[account(mut)]
    pub marketplace: Account<'info, Marketplace>,
    pub system_program: Program<'info, System>,
}
impl<'info> Save<'info> {
    pub fn save(&mut self,job_key:Pubkey) -> Result<()> {
        msg!("Current number of job keys: {}", self.marketplace.job_keys.len());
        self.marketplace.job_keys.push(job_key);
        Ok(())
    }
}