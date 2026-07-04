/**
 * Lark Workplace Block Entry Point
 *
 * This file is the main entry for the Lark Block runtime.
 * When running in the Lark Developer Tool, this component
 * is registered via the BlockType API.
 *
 * BlockTypeID: blk_69a47a51c8800ede6d63de15
 * App ID: cli_a92ec64c69b8ded1
 */

import React from 'react'

// In Lark Block runtime, import the main page component
// import { RecruitmentListPage } from '../src/pages/RecruitmentListPage'

interface BlockData {
  blockTypeID: string
  appID: string
}

export default function BlockEntry() {
  // In production, this would render inside the Lark Block container
  // The actual UI is built in the React web version for development
  // and bundled for Lark Block runtime

  return (
    <div className="lark-block-container">
      {/* The RecruitmentListPage component renders here */}
      <p>Hiring Management Hub - Lark Workplace Block</p>
      <p>BlockTypeID: blk_69a47a51c8800ede6d63de15</p>
    </div>
  )
}
