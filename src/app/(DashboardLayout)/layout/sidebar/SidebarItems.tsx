import React from "react";
import Menuitems from "./MenuItems";
import { Box, Typography } from "@mui/material";
import {
  Logo,
  Sidebar as MUI_Sidebar,
  Menu,
  MenuItem,
  Submenu,
} from "react-mui-sidebar";
import { IconPoint } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Upgrade } from "./Updrade";
import Image from "next/image";
import { styled } from "@mui/material/styles";

const renderMenuItems = (items: any, pathDirect: any) => {
  return items.map((item: any) => {
    const Icon = item.icon ? item.icon : IconPoint;

    const itemIcon = <Icon stroke={1.5} size="1.3rem" />;

    if (item.subheader) {
      // Display Subheader
      return <Menu subHeading={item.subheader} key={item.subheader} />;
    }

    //If the item has children (submenu)
    if (item.children) {
      return (
        <Submenu
          key={item.id}
          title={item.title}
          icon={itemIcon}
          borderRadius="7px"
        >
          {renderMenuItems(item.children, pathDirect)}
        </Submenu>
      );
    }

    // If the item has no children, render a MenuItem

    return (
      <Box px={3} key={item.id}>
        <MenuItem
          key={item.id}
          isSelected={pathDirect === item?.href}
          borderRadius="8px"
          icon={itemIcon}
          link={item.href}
          component={Link}
        >
          {item.title}
        </MenuItem>
      </Box>
    );
  });
};

const SidebarItems = () => {
  const pathname = usePathname();
  const pathDirect = pathname;

  return (
    <>
      <MUI_Sidebar
        width={"100%"}
        showProfile={false}
        themeColor={"#5D87FF"}
        themeSecondaryColor={"#49beff"}
      >
        {/* <Logo
          img="/images/logos/dark-logo.jpg"
          component={Link}
          to="/"
          height={20}
        >
          PPRK
        </Logo> */}
        <LogoContainer>
          <Image
            src="/images/logos/dark-logo.jpg"
            alt="Paprika Logo"
            width={220}
            height={110}
            priority
          />
        </LogoContainer>

        {renderMenuItems(Menuitems, pathDirect)}
        <Box px={2}>{/* <Upgrade /> */}</Box>
      </MUI_Sidebar>
    </>
  );
};
export default SidebarItems;

const LogoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  padding: "16px",

  // 데스크톱
  "& img": {
    width: "220px",
    height: "110px",
    objectFit: "contain",
  },

  // 태블릿 (768px 이하)
  [theme.breakpoints.down("md")]: {
    padding: "12px",
    "& img": {
      width: "180px",
      height: "90px",
    },
  },

  // 모바일 (600px 이하)
  [theme.breakpoints.down("sm")]: {
    padding: "8px",
    "& img": {
      width: "140px",
      height: "70px",
    },
  },

  // 작은 모바일 (480px 이하)
  "@media (max-width: 480px)": {
    padding: "6px",
    "& img": {
      width: "120px",
      height: "60px",
    },
  },
}));
