import { MenuEntry } from 'maki-toolkit'
import { FACTORY_ADDRESS } from 'maki-pulsechain-sdk'
import { BASE_URL } from 'config'
import { ContextApi } from 'contexts/Localization/types'
import { getScanUrl, getMakiAddress, getMasterChefAddress, getRouterAddress, getSoyAddress } from 'utils/configHelpers'

const config: (t: ContextApi['t']) => MenuEntry[] = (t) => [
  {
    label: t('Home'),
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: t('Trade'),
    icon: 'TradeIcon',
    href: BASE_URL,
    items: [
      {
        label: t('Exchange'),
        href: '/swap',
      },
      {
        label: t('Liquidity'),
        href: '/pool',
      },
      {
        label: t('Limit'),
        href: '/limit',
      },
      {
        label: t('Promode'),
        href: '/pro-mode',
      },
    ],
  },
  {
    label: t('Farms'),
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: t('Pools'),
    icon: 'PoolIcon',
    href: '/pools',
  },
  // {
  //   label: t('Lottery'),
  //   icon: 'TicketIcon',
  //   href: 'https://lottery.makiswap.com',
  // },
  {
    label: t('Contracts'),
    icon: 'ContractsIcon',
    items: [
      {
        label: 'MakiToken.sol',
        href: `${getScanUrl()}/address/${getMakiAddress()}`
      },
      {
        label: 'SoyBar.sol',
        href: `${getScanUrl()}/address/${getSoyAddress()}`
      },
      {
        label: 'MasterChef.sol',
        href: `${getScanUrl()}/address/${getMasterChefAddress()}`
      },
      {
        label: 'MakiswapFactory.sol',
        href: `${getScanUrl()}/address/${FACTORY_ADDRESS}`
      },
      {
        label: 'MakiswapRouter.sol',
        href: `${getScanUrl()}/address/${getRouterAddress()}`
      },
    ],
  },
  {
    label: t('Audits'),
    icon: 'GroupsIcon',
    items: [
      {
        label: t('Chainsulting'),
        href: 'https://github.com/chainsulting/Smart-Contract-Security-Audits/blob/master/MakiSwap/02_Smart%20Contract%20Audit_MakiSwap.pdf',
      },
      {
        label: t('Certik'),
        href: 'https://www.certik.org/projects/makiswap',
      },
    ],
  },
  // {
  //   label: t('Bridge'),
  //   icon: 'BridgeIcon',
  //   href: 'https://bridge.makiswap.com/bridge',
  // },
  // {
  //   label: t('Bridge'),
  //   icon: 'BridgeIcon',
  //   href: '/bridge',
  // },
  {
    label: t('Info'),
    icon: 'InfoIcon',
    items: [
      {
        label: t('Overview'),
        href: 'https://polygon-info.makiswap.com',
      },
      {
        label: t('Tokens'),
        href: 'https://polygon-info.makiswap.com/tokens',
      },
      {
        label: t('Pairs'),
        href: 'https://polygon-info.makiswap.com/pairs',
      },
      {
        label: t('Accounts'),
        href: 'https://polygon-info.makiswap.com/accounts',
      },
    ],
  },
  {
    label: t('More'),
    icon: 'MoreIcon',
    items: [
      {
        label: t('Docs'),
        href: 'https://docs.makiswap.com/',
      },
      {
        label: t('Github'),
        href: 'https://github.com/MakiSwap-Protocol',
      },
      {
        label: t('Contact'),
        href: 'https://docs.makiswap.com/jiro-ono/contact-us/business-and-partnerships',
      },
    ],
  },
]

export default config
