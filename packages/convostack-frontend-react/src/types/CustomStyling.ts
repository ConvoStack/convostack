import * as React from "react"

export type CustomStyling = {
  headerColor?: string
  headerText?: string
  widgetLaunchButtonColor?: string
  widgetLocation?: "right" | "left"
  widgetWindowHeightOffset?: string
  widgetWindowWidth?: string
}

export type CustomEmbedStyling = {
  embedHeight?: string
  embedWidth?: string
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
  anonymousId?: string
  hash: string
  externalId?: string
}
