// import { TranslatableText } from 'state/types'

import { ChainId } from "maki-pulsechain-sdk";



// // ---------------------
// //  IFO
// // ---------------------

// export type IfoStatus = 'coming_soon' | 'live' | 'finished'

// export interface Ifo {
//   id: string
//   isActive: boolean
//   address: string
//   name: string
//   subTitle?: string
//   description?: string
//   launchDate: string
//   launchTime: string
//   saleAmount: string
//   raiseAmount: string
//   makiToBurn: string
//   projectSiteUrl: string
//   currency: string
//   currencyAddress: string
//   tokenDecimals: number
//   releaseBlockNumber: number
//   campaignId?: string
// }

// ---------------------
//  Address
// ---------------------
export interface Address {
  [id: number]: string;
}

// // ---------------------
// //  Token
// // ---------------------

// export enum QuoteToken {
//   'PLS' = 'PLS',
//   'MAKI' = 'MAKI',
//   // 'SYRUP' = 'SYRUP',
//   // 'SOY' = 'SOY',
//   // 'ETH' = 'ETH',
//   // 'BTC' = 'BTC',
//   // 'HUSD' = 'HUSD',
// }

export interface Token {
  symbol: string
  address?: Address
  decimals?: number
  projectLink?: string
  husdPrice?: string
}

// // ---------------------
// //  Farm
// // ---------------------

export interface FarmConfig {
  pid: number
  lpSymbol: string
  lpAddresses: Address
  token: Token
  quoteToken: Token
  multiplier?: string
  isCommunity?: boolean
  dual?: {
    rewardPerBlock: number
    earnLabel: string
    endBlock: number
  }
}

// // ---------------------
// //  Pool
// // ---------------------

export enum PoolCategory {
  'COMMUNITY' = 'Community',
  'CORE' = 'Core',
  'PLS' = 'Pls', // Pools using native HT behave differently than pools using a token
  'AUTO' = 'Auto',
}

// export enum PoolIds {
//   poolBasic = 'poolBasic',
//   poolUnlimited = 'poolUnlimited',
// }

export interface PoolConfig {
  sousId: number
  earningToken: Token
  stakingToken: Token
  contractAddress: Address
  poolCategory: PoolCategory
  tokenPerBlock: string
  sortOrder?: number
  harvest?: boolean
  isFinished?: boolean
  enableEmergencyWithdraw?: boolean
}

// // ---------------------
// //  Image
// // ---------------------

// export type Images = {
//   lg: string
//   md: string
//   sm: string
//   ipfs?: string
// }

// // ---------------------
// //  NFTs
// // ---------------------

// export type NftImages = {
//   blur?: string
// } & Images

// export type NftVideo = {
//   webm: string
//   mp4: string
// }

// export type NftSource = {
//   [key in NftType]: {
//     address: Address
//     identifierKey: string
//   }
// }

// export enum NftType {
//   // EASYBAKE = 'easybake',
//   // MAKI = 'maki',
//   PANCAKE = 'pancake',
//   MIXIE = 'mixie',
// }

// export type Nft = {
//   description: string
//   name: string
//   images: NftImages
//   sortOrder: number
//   type: NftType
//   video?: NftVideo

//   // Uniquely identifies the nft.
//   // Used for matching an NFT from the config with the data from the NFT's tokenURI
//   identifier: string

//   // Used to be "bunnyId". Used when minting NFT
//   variationId?: number | string
// }

// // --------------------
// // Team
// // --------------------

// export type TeamImages = {
//   alt: string
// } & Images

// export type Team = {
//   id: number
//   name: string
//   description: string
//   isJoinable?: boolean
//   users: number
//   points: number
//   images: TeamImages
//   background: string
//   textColor: string
// }

// // ---------------------
// //  Campaign
// // ---------------------

// export type CampaignType = 'ifo'

// export type Campaign = {
//   id: string
//   type: CampaignType
//   title?: TranslatableText
//   description?: TranslatableText
//   badge?: string
// }

// // ---------------------
// //  Page Meta
// // ---------------------

// export type PageMeta = {
//   title: string
//   description?: string
//   image?: string
// }

export enum CandlePeriod {
  FiveMinutes = 5 * 60,
  FifteenMinutes = 15 * 60,
  OneHour = 60 * 60,
  FourHours = 4 * 60 * 60,
  OneDay = 24 * 60 * 60,
  OneWeek = 7 * 24 * 60 * 60
}

// export interface RawCandlestickDatum {
//   time: string
//   open: string
//   high: string
//   low: string
//   close: string
// }

export interface NumericalCandlestickDatum {
  time: number
  open: number
  high: number
  low: number
  close: number
}
