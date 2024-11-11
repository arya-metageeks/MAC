export const addParticipantsAbi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "initialOwner",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
        ],
        name: "OwnableInvalidOwner",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "OwnableUnauthorizedAccount",
        type: "error",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "address[]",
                name: "_playerAddress",
                type: "address[]",
            },
            {
                components: [
                    {
                        internalType: "string",
                        name: "tournamentId",
                        type: "string",
                    },
                    {
                        internalType: "uint256",
                        name: "headshot",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "kills",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "score",
                        type: "uint256",
                    },
                ],
                internalType: "struct UserGameRecords.UserPlayDetails[]",
                name: "_updateData",
                type: "tuple[]",
            },
        ],
        name: "batchUpdate",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "player",
                type: "address",
            },
        ],
        name: "getPlayerAllRecordIds",
        outputs: [
            {
                internalType: "string[]",
                name: "",
                type: "string[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "player",
                type: "address",
            },
            {
                internalType: "string",
                name: "tournamentId",
                type: "string",
            },
        ],
        name: "getPlayerRecord",
        outputs: [
            {
                components: [
                    {
                        internalType: "string",
                        name: "tournamentId",
                        type: "string",
                    },
                    {
                        internalType: "uint256",
                        name: "headshot",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "kills",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "score",
                        type: "uint256",
                    },
                ],
                internalType: "struct UserGameRecords.UserPlayDetails",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];







