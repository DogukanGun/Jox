use anchor_lang::prelude::*;

use super::Applicant;


#[account]
pub struct Job {
    pub seed: u64,
    pub application_pid: String,
    pub applicants: Vec<Applicant>,
    pub company_name: String,
    pub position_title: String,
    pub bump: u8,
    pub vault_bump: u8,
}
impl Space for Job {
    const INIT_SPACE: usize = 8 // seed
                          + 12 + MAX_APPLICATION_PID_LENGTH // application_pid
                          + 12 + MAX_COMPANY_NAME_LENGTH // company_name
                          + 12 + MAX_POSITION_TITLE_LENGTH // position_title
                          + Applicant::INIT_SPACE //applicant
                          + 1 // bump
                          + 1; // bump
}

const MAX_APPLICATION_PID_LENGTH: usize = 64;
const MAX_COMPANY_NAME_LENGTH: usize = 64;
const MAX_POSITION_TITLE_LENGTH: usize = 64;