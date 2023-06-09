import BigNumber from 'bignumber.js'
import { DEFAULT_GAS_LIMIT, DEFAULT_TOKEN_DECIMAL, BIG_TEN, BIG_ZERO, BASE_CHAIN_ID, MAKI_POOL_PID, MAKI_PLS_POOL_PID } from 'config'
import { ethers, Contract } from 'ethers'
import { Pair, TokenAmount, Token } from 'maki-pulsechain-sdk'
import { getLpContract, getMasterchefContract } from 'utils/contractHelpers'
import farms from 'config/constants/farms'
import { getAddress, getMakiAddress } from 'utils/configHelpers'
import tokens from 'config/constants/tokens'
// import pools from 'config/constants/pools'
// import sousChefABI from 'config/abi/sousChef.json'
// import { multicallv2 } from './multicall'
// import { web3WithArchivedNodeProvider } from './web3'
import { getBalanceAmount } from './formatBalance'

export const approve = async (lpContract: Contract, masterChefContract: Contract, account) => {
  const tx = await lpContract.approve(masterChefContract.address, ethers.constants.MaxUint256, { from: account })
  const receipt = await tx.wait()
  return receipt
}

export const stake = async (masterChefContract, pid, amount, account) => {
  if (pid === 0) {
    const tx = await masterChefContract
      .enterStaking(new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString(), { from: account, gasLimit: 500000 })
    const receipt = await tx.wait()
    return receipt.status
  }

  const tx = await masterChefContract
    .deposit(pid, new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString(), { from: account, gasLimit: DEFAULT_GAS_LIMIT })
  const receipt = await tx.wait()
  return receipt.status
}

export const sousStake = async (sousChefContract, amount, decimals = 18, account) => {
  const tx = await sousChefContract
    .deposit(new BigNumber(amount).times(BIG_TEN.pow(decimals)).toString(), { from: account, gasLimit: DEFAULT_GAS_LIMIT })
  const receipt = await tx.wait()
  return receipt.status
}

export const sousStakePls = async (sousChefContract, amount, account) => {
  const tx = await sousChefContract
    .deposit({
      from: account,
      gasLimit: DEFAULT_GAS_LIMIT,
      value: new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString(),
    })
  const receipt = await tx.wait()
  return receipt.status
}

export const unstake = async (masterChefContract, pid, amount, account) => {
  if (pid === 0) {
    const tx = await masterChefContract
      .leaveStaking(new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString(), { from: account, gasLimit: DEFAULT_GAS_LIMIT })
    const receipt = await tx.wait()
    return receipt.status
  }

  const tx = await masterChefContract
    .withdraw(pid, new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString(), { from: account, gasLimit: DEFAULT_GAS_LIMIT })
  const receipt = await tx.wait()
  return receipt.status
}

export const sousUnstake = async (sousChefContract, amount, decimals, account) => {
  const tx = await sousChefContract
    .withdraw(new BigNumber(amount).times(BIG_TEN.pow(decimals)).toString(), { from: account, gasLimit: DEFAULT_GAS_LIMIT })
  const receipt = await tx.wait()
  return receipt.status
}

export const sousEmergencyUnstake = async (sousChefContract, account) => {
  const tx = await sousChefContract
    .emergencyWithdraw({ from: account })
  const receipt = await tx.wait()
  return receipt.status
}

export const harvest = async (masterChefContract, pid, account) => {
  if (pid === 0) {
    const tx = await masterChefContract
      .leaveStaking('0', { from: account, gasLimit: DEFAULT_GAS_LIMIT })
    const receipt = await tx.wait()
    return receipt.status
  }

  const tx = await masterChefContract
    .deposit(pid, '0', { from: account, gasLimit: DEFAULT_GAS_LIMIT})
  const receipt = await tx.wait()
  return receipt.status
}

export const soushHarvest = async (sousChefContract, account) => {
  const tx = await sousChefContract
    .deposit('0', { from: account, gasLimit: DEFAULT_GAS_LIMIT })
  const receipt = await tx.wait()
  return receipt.status
}

export const soushHarvestPls = async (sousChefContract, account) => {
  const tx = await sousChefContract
    .deposit({ from: account, gasLimit: DEFAULT_GAS_LIMIT, value: BIG_ZERO })
  const receipt = await tx.wait()
  return receipt.status
}

const makiPlsPid = MAKI_PLS_POOL_PID
const makiPlsFarm = farms.find((farm) => farm.pid === makiPlsPid)

const MAKI_TOKEN = new Token(BASE_CHAIN_ID, getMakiAddress(), 18)
const WPLS_TOKEN = new Token(BASE_CHAIN_ID, tokens.wpls.address[BASE_CHAIN_ID], 18)
const MAKI_PLS_TOKEN = new Token(BASE_CHAIN_ID, getAddress(makiPlsFarm.lpAddresses), 18)

/**
 * Returns the total MAKI staked in the MAKI-HT LP
 */
export const getUserStakeInMakiPlsLp = async (account: string, block?: number) => {
  try {
    const masterContract = getMasterchefContract()
    const makiPlsContract = getLpContract(getAddress(makiPlsFarm.lpAddresses))
    const totalSupplyLP = await makiPlsContract.totalSupply()
    const reservesLP = await makiPlsContract.getReserves()
    const makiPlsBalance = await masterContract.userInfo(makiPlsPid, account)

    const pair: Pair = new Pair(
      new TokenAmount(MAKI_TOKEN, reservesLP._reserve0.toString()),
      new TokenAmount(WPLS_TOKEN, reservesLP._reserve1.toString()),
    )
    const makiLPBalance = pair.getLiquidityValue(
      pair.token0,
      new TokenAmount(MAKI_PLS_TOKEN, totalSupplyLP.toString()),
      new TokenAmount(MAKI_PLS_TOKEN, makiPlsBalance.amount.toString()),
      false,
    )

    return new BigNumber(makiLPBalance.toSignificant(18))
  } catch (error) {
    console.error(`MAKI-PLS LP error: ${error}`)
    return BIG_ZERO
  }
}

/**
 * Gets the maki staked in the main pool
 */
export const getUserStakeInMakiPool = async (account: string, block?: number) => {
  try {
    const masterContract = getMasterchefContract()
    const response = await masterContract.userInfo(0, account)

    return getBalanceAmount(new BigNumber(response.amount))
  } catch (error) {
    console.error('Error getting stake in MAKI pool', error)
    return BIG_ZERO
  }
}

/**
 * Returns total staked value of active pools
 */
// export const getUserStakeInPools = async (account: string, block?: number) => {
//   try {
//     const multicallOptions = {
//       web3: web3WithArchivedNodeProvider,
//       blockNumber: block,
//       requireSuccess: false,
//     }
//     const eligiblePools = pools
//       .filter((pool) => pool.sousId !== 0)
//       .filter((pool) => pool.isFinished === false || pool.isFinished === undefined)

//     // Get the ending block is eligible pools
//     const endBlockCalls = eligiblePools.map((eligiblePool) => ({
//       address: getAddress(eligiblePool.contractAddress),
//       name: 'bonusEndBlock',
//     }))
//     const startBlockCalls = eligiblePools.map((eligiblePool) => ({
//       address: getAddress(eligiblePool.contractAddress),
//       name: 'startBlock',
//     }))
//     const endBlocks = await multicallv2(sousChefABI, endBlockCalls, multicallOptions)
//     const startBlocks = await multicallv2(sousChefABI, startBlockCalls, multicallOptions)

//     // Filter out pools that have ended
//     const activePools = eligiblePools.filter((eligiblePool, index) => {
//       const endBlock = new BigNumber(endBlocks[index])
//       const startBlock = new BigNumber(startBlocks[index])

//       return startBlock.lte(block) && endBlock.gte(block)
//     })

//     // Get the user info of each pool
//     const userInfoCalls = activePools.map((activePool) => ({
//       address: getAddress(activePool.contractAddress),
//       name: 'userInfo',
//       params: [account],
//     }))
//     const userInfos = await multicallv2(sousChefABI, userInfoCalls, multicallOptions)

//     return userInfos.reduce((accum: BigNumber, userInfo) => {
//       return accum.plus(new BigNumber(userInfo.amount._hex))
//     }, new BigNumber(0))
//   } catch (error) {
//     console.error('Error fetching staked values:', error)
//     return BIG_ZERO
//   }
// }
