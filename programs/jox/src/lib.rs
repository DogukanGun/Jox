use anchor_lang::prelude::*;

pub mod state;

pub mod contexts;
use contexts::*;

pub mod errors;
pub use errors::*;
pub use state::*;

declare_id!("5xWrz1tgbg3VdyfCfiHQVJnQ4XfFX13Y7L2PT75Yq4GJ");

#[program]
pub mod jox {

    use super::*;

    pub fn publish(
        ctx: Context<Publish>,
        seed: u64,
        application_pid: String,
        company_name: String,
        position_title: String,
        amount:u64
    ) -> Result<()> {
        ctx.accounts.create_job_posting(
            seed,
            application_pid,
            company_name,
            position_title,
            &ctx.bumps,
        )?;
        ctx.accounts.stake(amount)
    }

    pub fn save(ctx:Context<Save>,job_key:Pubkey) -> Result<()>{
        ctx.accounts.save(job_key)
    }

    pub fn init(ctx: Context<Initialize>, name: String) -> Result<()> {
        ctx.accounts.init_marketplace(name, &ctx.bumps)
    }

    pub fn apply(ctx: Context<Apply>, cid:String) -> Result<()> {
        ctx.accounts.apply(cid)
    }

    pub fn close(ctx: Context<Close>) -> Result<()> {
        ctx.accounts.close()
    }
}
