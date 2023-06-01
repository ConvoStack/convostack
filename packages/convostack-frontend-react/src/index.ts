import Loadable from "@loadable/component";
export const ConvoStackWrapper = Loadable(() => import("./ConvoStackWrapper"));
export const ConvoStackEmbed = Loadable(() => import("./components/EmbeddableChat/ConvoStackEmbed"));
export const Messages = Loadable(() => import("./components/Message")); 
export type { MessageProps } from "./components/Message";
export type { ConvoStackWrapperProps } from "./ConvoStackWrapper";
export type { ConvoStackEmbedProps } from "./components/EmbeddableChat/ConvoStackEmbed";
export { default as useConvoStack } from "./hooks/useConvoStack";