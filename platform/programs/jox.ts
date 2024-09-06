/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/jox.json`.
 */
export type Jox = {
    "address": "5xWrz1tgbg3VdyfCfiHQVJnQ4XfFX13Y7L2PT75Yq4GJ",
    "metadata": {
      "name": "jox",
      "version": "0.1.0",
      "spec": "0.1.0",
      "description": "Created with Anchor"
    },
    "instructions": [
      {
        "name": "apply",
        "discriminator": [
          248,
          243,
          145,
          24,
          105,
          50,
          162,
          225
        ],
        "accounts": [
          {
            "name": "applicant",
            "writable": true,
            "signer": true
          },
          {
            "name": "job",
            "writable": true
          },
          {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
          }
        ],
        "args": [
          {
            "name": "cid",
            "type": "string"
          }
        ]
      },
      {
        "name": "close",
        "discriminator": [
          98,
          165,
          201,
          177,
          108,
          65,
          206,
          96
        ],
        "accounts": [
          {
            "name": "maker",
            "writable": true,
            "signer": true
          },
          {
            "name": "taker",
            "writable": true,
            "signer": true
          },
          {
            "name": "job",
            "writable": true
          },
          {
            "name": "makerMint"
          },
          {
            "name": "takerAta",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "taker"
                },
                {
                  "kind": "const",
                  "value": [
                    6,
                    221,
                    246,
                    225,
                    215,
                    101,
                    161,
                    147,
                    217,
                    203,
                    225,
                    70,
                    206,
                    235,
                    121,
                    172,
                    28,
                    180,
                    133,
                    237,
                    95,
                    91,
                    55,
                    145,
                    58,
                    140,
                    245,
                    133,
                    126,
                    255,
                    0,
                    169
                  ]
                },
                {
                  "kind": "account",
                  "path": "makerMint"
                }
              ],
              "program": {
                "kind": "const",
                "value": [
                  140,
                  151,
                  37,
                  143,
                  78,
                  36,
                  137,
                  241,
                  187,
                  61,
                  16,
                  41,
                  20,
                  142,
                  13,
                  131,
                  11,
                  90,
                  19,
                  153,
                  218,
                  255,
                  16,
                  132,
                  4,
                  142,
                  123,
                  216,
                  219,
                  233,
                  248,
                  89
                ]
              }
            }
          },
          {
            "name": "vault",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    118,
                    97,
                    117,
                    108,
                    116
                  ]
                },
                {
                  "kind": "account",
                  "path": "maker"
                }
              ]
            }
          },
          {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
          },
          {
            "name": "associatedTokenProgram",
            "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
          },
          {
            "name": "tokenProgram",
            "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          }
        ],
        "args": []
      },
      {
        "name": "init",
        "discriminator": [
          220,
          59,
          207,
          236,
          108,
          250,
          47,
          100
        ],
        "accounts": [
          {
            "name": "admin",
            "writable": true,
            "signer": true
          },
          {
            "name": "marketplace",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    109,
                    97,
                    114,
                    107,
                    101,
                    116,
                    112,
                    108,
                    97,
                    99,
                    101
                  ]
                },
                {
                  "kind": "arg",
                  "path": "name"
                }
              ]
            }
          },
          {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
          }
        ],
        "args": [
          {
            "name": "name",
            "type": "string"
          }
        ]
      },
      {
        "name": "publish",
        "discriminator": [
          129,
          177,
          182,
          160,
          184,
          224,
          219,
          5
        ],
        "accounts": [
          {
            "name": "maker",
            "writable": true,
            "signer": true
          },
          {
            "name": "posting",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    106,
                    111,
                    98
                  ]
                },
                {
                  "kind": "account",
                  "path": "maker"
                },
                {
                  "kind": "arg",
                  "path": "seed"
                }
              ]
            }
          },
          {
            "name": "makerMint"
          },
          {
            "name": "makerAta",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "maker"
                },
                {
                  "kind": "const",
                  "value": [
                    6,
                    221,
                    246,
                    225,
                    215,
                    101,
                    161,
                    147,
                    217,
                    203,
                    225,
                    70,
                    206,
                    235,
                    121,
                    172,
                    28,
                    180,
                    133,
                    237,
                    95,
                    91,
                    55,
                    145,
                    58,
                    140,
                    245,
                    133,
                    126,
                    255,
                    0,
                    169
                  ]
                },
                {
                  "kind": "account",
                  "path": "makerMint"
                }
              ],
              "program": {
                "kind": "const",
                "value": [
                  140,
                  151,
                  37,
                  143,
                  78,
                  36,
                  137,
                  241,
                  187,
                  61,
                  16,
                  41,
                  20,
                  142,
                  13,
                  131,
                  11,
                  90,
                  19,
                  153,
                  218,
                  255,
                  16,
                  132,
                  4,
                  142,
                  123,
                  216,
                  219,
                  233,
                  248,
                  89
                ]
              }
            }
          },
          {
            "name": "vault",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    118,
                    97,
                    117,
                    108,
                    116
                  ]
                },
                {
                  "kind": "account",
                  "path": "maker"
                }
              ]
            }
          },
          {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
          },
          {
            "name": "associatedTokenProgram",
            "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
          },
          {
            "name": "tokenProgram",
            "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          }
        ],
        "args": [
          {
            "name": "seed",
            "type": "u64"
          },
          {
            "name": "applicationPid",
            "type": "string"
          },
          {
            "name": "companyName",
            "type": "string"
          },
          {
            "name": "positionTitle",
            "type": "string"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      },
      {
        "name": "save",
        "discriminator": [
          102,
          136,
          119,
          200,
          222,
          182,
          126,
          225
        ],
        "accounts": [
          {
            "name": "admin",
            "writable": true,
            "signer": true
          },
          {
            "name": "marketplace",
            "writable": true
          },
          {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
          }
        ],
        "args": [
          {
            "name": "jobKey",
            "type": "pubkey"
          }
        ]
      }
    ],
    "accounts": [
      {
        "name": "job",
        "discriminator": [
          75,
          124,
          80,
          203,
          161,
          180,
          202,
          80
        ]
      },
      {
        "name": "marketplace",
        "discriminator": [
          70,
          222,
          41,
          62,
          78,
          3,
          32,
          174
        ]
      }
    ],
    "errors": [
      {
        "code": 6000,
        "name": "nameTooLong",
        "msg": "Name must be between 1 and 32 characters"
      },
      {
        "code": 6001,
        "name": "jobListFull",
        "msg": "Job list is full"
      }
    ],
    "types": [
      {
        "name": "applicant",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "wallet",
              "type": "pubkey"
            },
            {
              "name": "documentCid",
              "type": "string"
            }
          ]
        }
      },
      {
        "name": "job",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "seed",
              "type": "u64"
            },
            {
              "name": "applicationPid",
              "type": "string"
            },
            {
              "name": "applicants",
              "type": {
                "vec": {
                  "defined": {
                    "name": "applicant"
                  }
                }
              }
            },
            {
              "name": "companyName",
              "type": "string"
            },
            {
              "name": "positionTitle",
              "type": "string"
            },
            {
              "name": "bump",
              "type": "u8"
            },
            {
              "name": "vaultBump",
              "type": "u8"
            }
          ]
        }
      },
      {
        "name": "marketplace",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "admin",
              "type": "pubkey"
            },
            {
              "name": "jobKeys",
              "type": {
                "vec": "pubkey"
              }
            },
            {
              "name": "bump",
              "type": "u8"
            },
            {
              "name": "name",
              "type": "string"
            }
          ]
        }
      }
    ]
  };
  
export const IDL:Jox = {
    "address": "5xWrz1tgbg3VdyfCfiHQVJnQ4XfFX13Y7L2PT75Yq4GJ",
    "metadata": {
      "name": "jox",
      "version": "0.1.0",
      "spec": "0.1.0",
      "description": "Created with Anchor"
    },
    "instructions": [
      {
        "name": "apply",
        "discriminator": [
          248,
          243,
          145,
          24,
          105,
          50,
          162,
          225
        ],
        "accounts": [
          {
            "name": "applicant",
            "writable": true,
            "signer": true
          },
          {
            "name": "job",
            "writable": true
          },
          {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
          }
        ],
        "args": [
          {
            "name": "cid",
            "type": "string"
          }
        ]
      },
      {
        "name": "close",
        "discriminator": [
          98,
          165,
          201,
          177,
          108,
          65,
          206,
          96
        ],
        "accounts": [
          {
            "name": "maker",
            "writable": true,
            "signer": true
          },
          {
            "name": "taker",
            "writable": true,
            "signer": true
          },
          {
            "name": "job",
            "writable": true
          },
          {
            "name": "makerMint"
          },
          {
            "name": "takerAta",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "taker"
                },
                {
                  "kind": "const",
                  "value": [
                    6,
                    221,
                    246,
                    225,
                    215,
                    101,
                    161,
                    147,
                    217,
                    203,
                    225,
                    70,
                    206,
                    235,
                    121,
                    172,
                    28,
                    180,
                    133,
                    237,
                    95,
                    91,
                    55,
                    145,
                    58,
                    140,
                    245,
                    133,
                    126,
                    255,
                    0,
                    169
                  ]
                },
                {
                  "kind": "account",
                  "path": "makerMint"
                }
              ],
              "program": {
                "kind": "const",
                "value": [
                  140,
                  151,
                  37,
                  143,
                  78,
                  36,
                  137,
                  241,
                  187,
                  61,
                  16,
                  41,
                  20,
                  142,
                  13,
                  131,
                  11,
                  90,
                  19,
                  153,
                  218,
                  255,
                  16,
                  132,
                  4,
                  142,
                  123,
                  216,
                  219,
                  233,
                  248,
                  89
                ]
              }
            }
          },
          {
            "name": "vault",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    118,
                    97,
                    117,
                    108,
                    116
                  ]
                },
                {
                  "kind": "account",
                  "path": "maker"
                }
              ]
            }
          },
          {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
          },
          {
            "name": "associatedTokenProgram",
            "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
          },
          {
            "name": "tokenProgram",
            "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          }
        ],
        "args": []
      },
      {
        "name": "init",
        "discriminator": [
          220,
          59,
          207,
          236,
          108,
          250,
          47,
          100
        ],
        "accounts": [
          {
            "name": "admin",
            "writable": true,
            "signer": true
          },
          {
            "name": "marketplace",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    109,
                    97,
                    114,
                    107,
                    101,
                    116,
                    112,
                    108,
                    97,
                    99,
                    101
                  ]
                },
                {
                  "kind": "arg",
                  "path": "name"
                }
              ]
            }
          },
          {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
          }
        ],
        "args": [
          {
            "name": "name",
            "type": "string"
          }
        ]
      },
      {
        "name": "publish",
        "discriminator": [
          129,
          177,
          182,
          160,
          184,
          224,
          219,
          5
        ],
        "accounts": [
          {
            "name": "maker",
            "writable": true,
            "signer": true
          },
          {
            "name": "posting",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    106,
                    111,
                    98
                  ]
                },
                {
                  "kind": "account",
                  "path": "maker"
                },
                {
                  "kind": "arg",
                  "path": "seed"
                }
              ]
            }
          },
          {
            "name": "makerMint"
          },
          {
            "name": "makerAta",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "maker"
                },
                {
                  "kind": "const",
                  "value": [
                    6,
                    221,
                    246,
                    225,
                    215,
                    101,
                    161,
                    147,
                    217,
                    203,
                    225,
                    70,
                    206,
                    235,
                    121,
                    172,
                    28,
                    180,
                    133,
                    237,
                    95,
                    91,
                    55,
                    145,
                    58,
                    140,
                    245,
                    133,
                    126,
                    255,
                    0,
                    169
                  ]
                },
                {
                  "kind": "account",
                  "path": "makerMint"
                }
              ],
              "program": {
                "kind": "const",
                "value": [
                  140,
                  151,
                  37,
                  143,
                  78,
                  36,
                  137,
                  241,
                  187,
                  61,
                  16,
                  41,
                  20,
                  142,
                  13,
                  131,
                  11,
                  90,
                  19,
                  153,
                  218,
                  255,
                  16,
                  132,
                  4,
                  142,
                  123,
                  216,
                  219,
                  233,
                  248,
                  89
                ]
              }
            }
          },
          {
            "name": "vault",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    118,
                    97,
                    117,
                    108,
                    116
                  ]
                },
                {
                  "kind": "account",
                  "path": "maker"
                }
              ]
            }
          },
          {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
          },
          {
            "name": "associatedTokenProgram",
            "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
          },
          {
            "name": "tokenProgram",
            "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          }
        ],
        "args": [
          {
            "name": "seed",
            "type": "u64"
          },
          {
            "name": "applicationPid",
            "type": "string"
          },
          {
            "name": "companyName",
            "type": "string"
          },
          {
            "name": "positionTitle",
            "type": "string"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      },
      {
        "name": "save",
        "discriminator": [
          102,
          136,
          119,
          200,
          222,
          182,
          126,
          225
        ],
        "accounts": [
          {
            "name": "admin",
            "writable": true,
            "signer": true
          },
          {
            "name": "marketplace",
            "writable": true
          },
          {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
          }
        ],
        "args": [
          {
            "name": "jobKey",
            "type": "pubkey"
          }
        ]
      }
    ],
    "accounts": [
      {
        "name": "job",
        "discriminator": [
          75,
          124,
          80,
          203,
          161,
          180,
          202,
          80
        ]
      },
      {
        "name": "marketplace",
        "discriminator": [
          70,
          222,
          41,
          62,
          78,
          3,
          32,
          174
        ]
      }
    ],
    "errors": [
      {
        "code": 6000,
        "name": "nameTooLong",
        "msg": "Name must be between 1 and 32 characters"
      },
      {
        "code": 6001,
        "name": "jobListFull",
        "msg": "Job list is full"
      }
    ],
    "types": [
      {
        "name": "applicant",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "wallet",
              "type": "pubkey"
            },
            {
              "name": "documentCid",
              "type": "string"
            }
          ]
        }
      },
      {
        "name": "job",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "seed",
              "type": "u64"
            },
            {
              "name": "applicationPid",
              "type": "string"
            },
            {
              "name": "applicants",
              "type": {
                "vec": {
                  "defined": {
                    "name": "applicant"
                  }
                }
              }
            },
            {
              "name": "companyName",
              "type": "string"
            },
            {
              "name": "positionTitle",
              "type": "string"
            },
            {
              "name": "bump",
              "type": "u8"
            },
            {
              "name": "vaultBump",
              "type": "u8"
            }
          ]
        }
      },
      {
        "name": "marketplace",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "admin",
              "type": "pubkey"
            },
            {
              "name": "jobKeys",
              "type": {
                "vec": "pubkey"
              }
            },
            {
              "name": "bump",
              "type": "u8"
            },
            {
              "name": "name",
              "type": "string"
            }
          ]
        }
      }
    ]
  };
  