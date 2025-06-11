import {
  IconLayoutDashboard,
  IconLogin,
  IconFilePencil,
  IconUserPlus,
  IconList,
  IconShieldExclamation,
  IconQuestionMark,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "HOME",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    navlabel: true,
    subheader: "🏋️体操場管理",
  },
  {
    id: uniqueId(),
    title: "体操場登録",
    icon: IconFilePencil,
    href: "/taiso/taisowrite",
  },
  {
    id: uniqueId(),
    title: "体操場一覧",
    icon: IconList,
    href: "/taiso/taisolist",
  },

  {
    navlabel: true,
    subheader: "📢 お知らせ・サポート",
  },
  {
    id: uniqueId(),
    title: "お知らせ",
    icon: IconShieldExclamation,
    href: "/support/notices",
  },

  {
    id: uniqueId(),
    title: "お問合せ",
    icon: IconQuestionMark,
    href: "/support/inquiry",
  },

  {
    navlabel: true,
    subheader: "AUTH",
  },
  {
    id: uniqueId(),
    title: "Admin Register",
    icon: IconUserPlus,
    href: "/authentication/register",
  },
  // {
  //   navlabel: true,
  //   subheader: " EXTRA",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Icons",
  //   icon: IconMoodHappy,
  //   href: "/icons",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Sample Page",
  //   icon: IconAperture,
  //   href: "/sample-page",
  // },
];

export default Menuitems;
