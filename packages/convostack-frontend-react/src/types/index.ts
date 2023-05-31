import * as React from "react"

export type CustomStyling = {
  headerColor?: string
  headerText?: string
  headerTextColor?: string
  widgetLaunchButtonColor?: string
  widgetLocation?: "right" | "left"
  widgetWindowHeightOffset?: string
  widgetWindowWidth?: string
  iconsColor?: string
}

export type CustomEmbedStyling = {
  headerColor?: string
  headerText?: string
  headerTextColor?: string
  embedWidth?: string
  embedHeight?: string
  embedFlex?: string
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
  hash?: string
  userId?: string
}
