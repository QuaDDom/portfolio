import { HTMLMotionProps, AnimatePresenceProps } from "framer-motion";

declare module "framer-motion" {
  interface MotionProps extends HTMLMotionProps<"div"> {}
  export interface AnimatePresence extends React.FC<AnimatePresenceProps> {
    (
      props: AnimatePresenceProps & {
        children?: React.ReactNode;
        mode?: "sync" | "popLayout" | "wait";
      }
    ): JSX.Element | null;
  }
}
