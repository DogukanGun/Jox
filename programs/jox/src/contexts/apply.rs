use anchor_lang::prelude::*;

use crate::{Applicant, Job};

#[derive(Accounts)]
pub struct Apply<'info> {
    #[account(mut)]
    pub applicant: Signer<'info>,
    #[account(mut)]
    pub job: Box<Account<'info, Job>>,
    pub system_program: Program<'info, System>,
}

impl<'info> Apply<'info> {
    pub fn apply(&mut self,cid:String) -> Result<()> {
        self.job.applicants.push(Applicant {
            wallet:self.applicant.to_account_info().key(),
            document_cid:cid
        });
        Ok(())
    }
}
