use anchor_lang::prelude::*;

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
    pub system_program: Program<'info, System>,
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
            bump: bumps.posting,
        });
        msg!("Job is created");
        Ok(())
    }
}
