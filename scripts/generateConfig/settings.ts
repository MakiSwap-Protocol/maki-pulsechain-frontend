import { BASE_URL } from 'config'
import { SettingsObject, SettingsType } from './types'

const settings: SettingsObject[] = [
  {
    name: 'farms',
    url: `${BASE_URL}/farms`,
    type: SettingsType.FARM,
  },
  {
    name: 'pools',
    url: `${BASE_URL}/pools`,
    type: SettingsType.POOL,
  }
]
export default settings
