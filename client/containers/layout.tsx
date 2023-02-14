import { ReactNode, useState } from "react";
import { AppShell, Navbar, Header, Footer, Aside, Text, MediaQuery, Burger, useMantineTheme } from "@mantine/core";
import { MainHeader } from "@/components/header/header";

export const Layout = ({ children }: { children: ReactNode }) => {
  const theme = useMantineTheme();
  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      header={<MainHeader />}
      fixed={false}
    >
      {children}
    </AppShell>
  );
};
