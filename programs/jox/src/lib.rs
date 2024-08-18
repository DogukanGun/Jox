use anchor_lang::prelude::*;
 
pub mod contexts;
use contexts::*;

declare_id!("5xWrz1tgbg3VdyfCfiHQVJnQ4XfFX13Y7L2PT75Yq4GJ");

#[program]
pub mod jox {

    use super::*;

    pub fn publish(ctx:Context<Publish>,seed: u64,application_pid:String,company_name:String,position_title:String)->Result<()> {
        ctx.accounts.create_job_posting(seed,application_pid,company_name,position_title,&ctx.bumps)
    }
}

#[derive(Accounts)]
pub struct Initialize {}
