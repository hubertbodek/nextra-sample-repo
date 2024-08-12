/* eslint typescript-sort-keys/interface: error */
import type { PageOpts } from 'nextra'
import type { ReactNode } from 'react'
import type { ThemeConfig } from './constants'

export type Context = {
  pageOpts: PageOpts
  themeConfig: ThemeConfig
}

export type SearchResult = {
  children: ReactNode
  id: string
  prefix?: ReactNode
  route: string
}

