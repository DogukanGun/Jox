use anchor_lang::prelude::*;

#[account]
pub struct Applicant {
    pub wallet: Pubkey,
    pub document_cid: String,
}
impl Space for Applicant {
    const INIT_SPACE: usize = 8 // seed
                          + 12  // document_cid
                          + 64  // wallet
                          + 1; // bump
}
