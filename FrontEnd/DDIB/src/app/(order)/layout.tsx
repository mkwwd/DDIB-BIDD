import { ReactNode } from "react";
import NavMenu from "@/app/components/NavMenu";
import styles from "./layout.module.scss";
import RQProvider from "../components/RQProvider";

type Props = { children: ReactNode };

export default function Layout({ children }: Props) {
  return (
    <>
      <RQProvider>
        <div>
          <NavMenu></NavMenu>
        </div>
        <div>{children}</div>
      </RQProvider>
    </>
  );
}
