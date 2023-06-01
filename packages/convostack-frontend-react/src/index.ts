import Loadable from "@loadable/component";
export { default as ConvoStackWrapper } from "./ConvoStackWrapper";
export const ConvoStackWidget = Loadable(() => import("./ConvoStackWidget"));
export const ConvoStackEmbed = Loadable(() => import("./components/EmbeddableChat/ConvoStackEmbed"));
export const Messages = Loadable(() => import("./components/Message")); 
export type { MessageProps } from "./components/Message";
export type { ConvoStackWidgetProps } from "./ConvoStackWidget";
export type { ConvoStackEmbedProps } from "./components/EmbeddableChat/ConvoStackEmbed";
export { default as useConvoStack } from "./hooks/useConvoStack";