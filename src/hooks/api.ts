import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'

/*
 * Due to Cors the api was forked and a proxy was created
 * @see https://github.com/makiswap/gatsby-pancake-api/commit/e811b67a43ccc41edd4a0fa1ee704b2f510aa0ba
 */
export const baseUrl = 'https://api.thegraph.com/subgraphs/name/devair1/maki-pls'

/* eslint-disable camelcase */

export interface TradePair {
  swap_pair_contract: string
  base_symbol: string
  quote_symbol: string
  last_price: number
  base_volume_24_h: number
  quote_volume_24_h: number
}

export interface ApiStatResponse {
  update_at: string
  '24h_total_volume': number
  total_value_locked: number
  total_value_locked_all: number
  trade_pairs: {
    [key: string]: TradePair
  }
}

export const useGetStats = () => {
  const [data, setData] = useState<ApiStatResponse | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/stat`)
        const responsedata: ApiStatResponse = await response.json()

        setData(responsedata)
      } catch (error) {
        console.error('Unable to fetch data:', error)
      }
    }

    fetchData()
  }, [setData])

  return data
}

export const useTVL = () => {
  const [tvl, setTvl] = useState(new BigNumber(0))

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `
          {
            pancakeFactories {
              totalLiquidityUSD
            }
          }
        `
        const response = await fetch(baseUrl, {
          method: 'POST',
          body: JSON.stringify({ query }),
          headers: { 'Content-Type': 'application/json' }
        })
          .then(res => res.json())
          .then(json => json.data.pancakeFactories[0].totalLiquidityUSD)
        setTvl(new BigNumber(response));
      } catch (error) {
        console.error('Error fetching TVL', error)
      }
    }
    fetchData()
  }, [setTvl]);

  return tvl
}
