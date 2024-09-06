use anchor_lang::prelude::*;

use crate::{Applicant, Job};

#[derive(Accounts)]
pub struct Get<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(mut)]
    pub job: Box<Account<'info, Job>>,
    pub system_program: Program<'info, System>,
}

impl<'info>  Get<'info> {
    pub fn get_applications(&mut self) -> Result<Vec<Applicant>> {
        Ok(self.job.applicants.clone())
    }
}

