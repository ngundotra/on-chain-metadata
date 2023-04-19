use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod on_chain_metadata {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, space: u64) -> Result<()> {
        ctx.accounts.metadata.data = vec![0; space.try_into().unwrap()];
        Ok(())
    }

    pub fn write(ctx: Context<Write>, offset: u64, data: Vec<u8>) -> Result<()> {
        ctx.accounts.metadata.data[offset as usize..offset as usize + data.len()]
            .copy_from_slice(&data);
        ctx.accounts.metadata.is_validated = false;
        ctx.accounts.metadata.written += data.len() as u64;

        Ok(())
    }

    pub fn validate(ctx: Context<Validate>) -> Result<()> {
        match serde_json::from_slice::<serde_json::Value>(&ctx.accounts.metadata.data) {
            Ok(_val) => {
                ctx.accounts.metadata.is_validated = true;
                Ok(())
            }
            Err(e) => {
                msg!("Invalid JSON: {}", e);
                return Err(ErrorCode::InvalidJson.into());
            }
        }
    }
}

#[error_code]
pub enum ErrorCode {
    InvalidJson,
}

#[derive(Accounts)]
#[instruction(space: u64)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    pub owner: Signer<'info>,
    /// CHECK: it's okay for this account to be totally wiped imo
    #[account(init, payer = payer, space = 8 + std::mem::size_of::<OnChainMetadata>() + space as usize)]
    pub metadata: Account<'info, OnChainMetadata>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Write<'info> {
    pub owner: Signer<'info>,
    #[account(mut)]
    pub metadata: Account<'info, OnChainMetadata>,
}

#[derive(Accounts)]
pub struct Validate<'info> {
    #[account(mut)]
    pub metadata: Account<'info, OnChainMetadata>,
}

#[account]
pub struct OnChainMetadata {
    pub owner: Pubkey,
    pub written: u64,
    pub is_validated: bool,
    pub data: Vec<u8>,
}
