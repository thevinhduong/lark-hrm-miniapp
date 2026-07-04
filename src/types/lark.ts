// ============================================
// Lark Block Framework Types
// These types represent the Lark Block SDK APIs
// ============================================

declare global {
  // Lark Block SDK namespace
  namespace BlockType {
    interface BlockContext {
      blockTypeID: string
      appID: string
      version: string
    }
  }

  interface Window {
    BlockType?: {
      register: (config: {
        entry: string
        width?: string
        height?: string
      }) => void
    }
    lark?: {
      jssdk: {
        request: (config: {
          url: string
          method?: string
          data?: Record<string, unknown>
        }) => Promise<unknown>
        getUserInfo: () => Promise<{ name: string; avatar: string }>
      }
    }
  }
}

export interface BlockConfig {
  entry: string
  width?: string
  height?: string
  blockTypeID: string
  appID: string
}

export const BLOCK_CONFIG: BlockConfig = {
  entry: 'index',
  width: '100%',
  height: 'auto',
  blockTypeID: 'blk_69a47a51c8800ede6d63de15',
  appID: 'cli_a92ec64c69b8ded1',
}

export {}
