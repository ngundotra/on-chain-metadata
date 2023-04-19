use borsh::{BorshDeserialize, BorshSerialize};
use shank::ShankInstruction;
use solana_program::{
    account_info::AccountInfo, declare_id, entrypoint, entrypoint::ProgramResult, msg,
    pubkey::Pubkey,
};

declare_id!("H5u5pzqCq2uxTK6w1AA1b7bxWeSKL3LEsi4QYutkxAh9");

#[cfg(not(feature = "no-entrypoint"))]
entrypoint!(process_instruction);

#[derive(BorshDeserialize, BorshSerialize, ShankInstruction)]
pub enum MetadataUpdate {
    Allocate { space: u64 },
    Write { offset: u64, data: Vec<u8> },
    Validate,
}

fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    match MetadataUpdate::try_from_slice(instruction_data)? {
        MetadataUpdate::Allocate { space } => {
            // ...
            msg!("Allocating {} bytes", space);
        }
        MetadataUpdate::Write { offset, data } => {
            // ...
            msg!("Writing {} bytes at offset {}", data.len(), offset);
        }
        MetadataUpdate::Validate => {
            // ...
            msg!("Validating metadata json");
        }
    }
    Ok(())
}
