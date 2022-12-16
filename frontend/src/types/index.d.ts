export interface NFT {
    amount: string;
    block_number: string;
    block_number_minted: string;
    contract_type: string;
    last_metadata_sync: string;
    last_token_uri_sync: string;
    metadata: string;
    minter_address: string;
    name: string;
    normalized_metadata: {
        animation_url: string | null;
        attributes: {
            display_type: string | null;
            max_value: number | null;
            order: number | null;
            trait_count: number | null;
            trait_type: string | null;
            value: number | null;
        }[];
        description: string;
        external_link: string | null;
        image: string;
        name: string;
    },
    owner_of: string;
    symbol: string;
    token_address: string;
    token_hash: string;
    token_id: string;
    token_uri: string;
    transfer_index: number[];
}