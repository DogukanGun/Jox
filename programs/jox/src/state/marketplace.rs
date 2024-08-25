use anchor_lang::prelude::*;


#[account]
pub struct Marketplace {
    pub admin: Pubkey,
    pub job_keys: Vec<Pubkey>, // Store Pubkeys of job accounts
    pub bump: u8,
    pub name: String, //Set this at max length of 32
}

const MAX_JOB_KEYS: usize = 100;

impl Space for Marketplace {
    const INIT_SPACE: usize = 8 +  // Discriminator
                             32 + // admin
                             4 + 64 + 1 + // name (length + maximum length + bump)
                             4 + (32 * MAX_JOB_KEYS); // job_keys (length + maximum number of Pubkeys)
    
}