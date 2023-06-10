import BigNumber from 'bignumber.js'
import poolsConfig from 'config/constants/pools'
import sousChefABI from 'config/abi/sousChef.json'
import makiABI from 'config/abi/maki.json'
import wplsABI from 'config/abi/wpls.json'
import multicall from 'utils/multicall'
import { getAddress, getNativeAddress } from 'utils/configHelpers'
import { BIG_ZERO } from 'config'
import { getSousChefContract } from 'utils/contractHelpers'

export const fetchPoolsBlockLimits = async () => {
  const poolsWithEnd = poolsConfig.filter((p) => p.sousId !== 0)
  const callsStartBlock = poolsWithEnd.map((poolConfig) => {
    return {
      address: getAddress(poolConfig.contractAddress),
      name: 'startBlock',
    }
  })
  const callsEndBlock = poolsWithEnd.map((poolConfig) => {
    return {
      address: getAddress(poolConfig.contractAddress),
      name: 'bonusEndBlock',
    }
  })

  const starts = await multicall(sousChefABI, callsStartBlock)
  const ends = await multicall(sousChefABI, callsEndBlock)

  return poolsWithEnd.map((makiPoolConfig, index) => {
    const startBlock = starts[index]
    const endBlock = ends[index]
    return {
      sousId: makiPoolConfig.sousId,
      startBlock: new BigNumber(startBlock).toJSON(),
      endBlock: new BigNumber(endBlock).toJSON(),
    }
  })
}

export const fetchPoolsTotalStaking = async () => {
  const nonPlsPools = poolsConfig.filter((p) => p.stakingToken.symbol !== 'PLS')
  const htPool = poolsConfig.filter((p) => p.stakingToken.symbol === 'PLS')

  const callsNonPlsPools = nonPlsPools.map((poolConfig) => {
    return {
      address: getAddress(poolConfig.stakingToken.address),
      name: 'balanceOf',
      params: [getAddress(poolConfig.contractAddress)],
    }
  })

  const callsPlsPools = htPool.map((poolConfig) => {
    return {
      address: getNativeAddress(),
      name: 'balanceOf',
      params: [getAddress(poolConfig.contractAddress)],
    }
  })

  const nonPlsPoolsTotalStaked = await multicall(makiABI, callsNonPlsPools)
  const htPoolsTotalStaked = await multicall(wplsABI, callsPlsPools)

  return [
    ...nonPlsPools.map((p, index) => ({
      sousId: p.sousId,
      totalStaked: new BigNumber(nonPlsPoolsTotalStaked[index]).toJSON(),
    })),
    ...htPool.map((p, index) => ({
      sousId: p.sousId,
      totalStaked: new BigNumber(htPoolsTotalStaked[index]).toJSON(),
    })),
  ]
}

export const fetchPoolStakingLimit = async (sousId: number): Promise<BigNumber> => {
  try {
    const sousContract = getSousChefContract(sousId)
    const stakingLimit = await sousContract.poolLimitPerUser()
    return new BigNumber(stakingLimit)
  } catch (error) {
    return BIG_ZERO
  }
}

export const fetchPoolsStakingLimits = async (
  poolsWithStakingLimit: number[],
): Promise<{ [key: string]: BigNumber }> => {
  const validPools = poolsConfig
    .filter((p) => p.stakingToken.symbol !== 'PLS' && !p.isFinished)
    .filter((p) => !poolsWithStakingLimit.includes(p.sousId))

  // Get the staking limit for each valid pool
  // Note: We cannot batch the calls via multicall because V1 pools do not have "poolLimitPerUser" and will throw an error
  const stakingLimitPromises = validPools.map((validPool) => fetchPoolStakingLimit(validPool.sousId))
  const stakingLimits = await Promise.all(stakingLimitPromises)

  return stakingLimits.reduce((accum, stakingLimit, index) => {
    return {
      ...accum,
      [validPools[index].sousId]: stakingLimit,
    }
  }, {})
}
