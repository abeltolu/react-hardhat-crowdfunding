import { ReactNode } from "react";
import { AppShell, useMantineTheme } from "@mantine/core";
//import { MainHeader } from "@/components/header/header";
import dynamic from "next/dynamic";
const MainHeader = dynamic(() => import("../components/header/header"), { ssr: false });

export const Layout = ({ children }: { children: ReactNode }) => {
  //const theme = useMantineTheme();
  return (
    <AppShell
      styles={
        {
          // main: {
          //   background: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
          // },
        }
      }
      header={<MainHeader />}
      fixed={false}
    >
      {children}
    </AppShell>
  );
};
