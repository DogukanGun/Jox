use anchor_lang::prelude::*;

use crate::errors::MarketplaceError;
use crate::state::Marketplace;

#[derive(Accounts)]
#[instruction(name: String)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,
    #[account(
        init,
        space = Marketplace::INIT_SPACE,
        payer = admin,
        seeds = [b"marketplace", name.as_str().as_bytes()],
        bump
    )]
    pub marketplace: Box<Account<'info, Marketplace>>,
    pub system_program: Program<'info, System>,
}

impl<'info> Initialize<'info> {
    pub fn init_marketplace(&mut self, name: String, bumps: &InitializeBumps) -> Result<()> {
        require!(
            name.len() > 0 && name.len() < 33,
            MarketplaceError::NameTooLong
        );
        self.marketplace.set_inner(Marketplace {
            admin: self.admin.key(),
            name,
            bump: bumps.marketplace,
            job_keys: Vec::new(), // Initialize an empty job list,
        });
        msg!(&self.marketplace.key().clone().to_string());
        Ok(())
    }
}
