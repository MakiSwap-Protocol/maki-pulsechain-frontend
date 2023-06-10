import { INIT_CODE_HASH } from '../src/constants'

import { bytecode } from 'makiswap-core/build/MakiswapPair.json'
import { keccak256 } from '@ethersproject/solidity'

// this _could_ go in constants, except that it would cost every consumer of the sdk the CPU to compute the hash
// and load the JSON.
const COMPUTED_INIT_CODE_HASH = keccak256(['bytes'], [`0x${bytecode}`])

describe('constants', () => {
  describe('INIT_CODE_HASH', () => {
    it('matches computed bytecode hash', () => {
      expect(COMPUTED_INIT_CODE_HASH).toEqual(INIT_CODE_HASH)
    })
    //TODO: Replace with real MakiswapPair.json
    it('matches computed bytecode hash', () => {
      expect(COMPUTED_INIT_CODE_HASH).toEqual('0x18fe2170149ae45ff399783ee55c85b2f173c8283daa0a687bcc376123e772db')
    })
  })
})

// import { INIT_CODE_HASH } from '../src/constants'

// import { bytecode } from 'makiswap-core/build/MakiswapPair.json'
// import { keccak256 } from '@ethersproject/solidity'

// // this _could_ go in constants, except that it would cost every consumer of the sdk the CPU to compute the hash
// // and load the JSON.
// const COMPUTED_INIT_CODE_HASH = keccak256(['bytes'], [`0x${bytecode}`])

// describe('constants', () => {
//   describe('INIT_CODE_HASH', () => {
//     it('matches computed bytecode hash', () => {
//       expect(COMPUTED_INIT_CODE_HASH).toEqual(INIT_CODE_HASH)
//     })
//   })
// })
