import * as React from "react"

export type CustomStyling = {
  headerColor?: string
  headerText?: string
  widgetLaunchButtonColor?: string
  widgetLocation?: "right" | "left"
  widgetWindowHeightOffset?: string
  widgetWindowWidth?: string
  headerTextColor?: string
  iconsColor?: string
}

export type CustomEmbedStyling = {
  embedHeight?: string
  embedWidth?: string
  headerTextColor?: string
  iconsColor?: string
}

export type CustomIcons = {
  widgetLaunchButtonOpenIcon?: React.ReactNode
  widgetLaunchButtonCloseIcon?: React.ReactNode
  createNewConversationIcon?: React.ReactNode
  sendMessageIcon?: React.ReactNode
  backArrowIcon?: React.ReactNode
}

export type UserData = {
  email?: string
  name?: string
  hash: string
  userId?: string
}
