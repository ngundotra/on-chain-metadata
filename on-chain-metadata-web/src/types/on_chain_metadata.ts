export type OnChainMetadata = {
  "version": "0.1.0",
  "name": "on_chain_metadata",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "owner",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "metadata",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "space",
          "type": "u64"
        }
      ]
    },
    {
      "name": "write",
      "accounts": [
        {
          "name": "owner",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "metadata",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "offset",
          "type": "u64"
        },
        {
          "name": "data",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "validate",
      "accounts": [
        {
          "name": "metadata",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "onChainMetadata",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "written",
            "type": "u64"
          },
          {
            "name": "isValidated",
            "type": "bool"
          },
          {
            "name": "data",
            "type": "bytes"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidJson"
    }
  ]
};

export const IDL: OnChainMetadata = {
  "version": "0.1.0",
  "name": "on_chain_metadata",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "owner",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "metadata",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "space",
          "type": "u64"
        }
      ]
    },
    {
      "name": "write",
      "accounts": [
        {
          "name": "owner",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "metadata",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "offset",
          "type": "u64"
        },
        {
          "name": "data",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "validate",
      "accounts": [
        {
          "name": "metadata",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "onChainMetadata",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "written",
            "type": "u64"
          },
          {
            "name": "isValidated",
            "type": "bool"
          },
          {
            "name": "data",
            "type": "bytes"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidJson"
    }
  ]
};
