"use client";

import React, { useMemo } from "react";
import SiteTitle from "./SiteTitle";
import { FiLayout } from "react-icons/fi";
import { FaUserFriends } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import classNames from "classnames";
import Link from "next/link";

function SideBar() {
  const menuItems = [
    { id: 1, label: "Home", icon: FiLayout, link: "/" },
    { id: 2, label: "Friends", icon: FaUserFriends, link: "/friends" },
  ];
  const router = useRouter();
  const activeMenu = useMemo(
    () => menuItems.find((menu) => menu.link === usePathname()),
    [usePathname()]
  );

  const getNavItemClasses = (menu: any) => {
    return classNames(
      "flex items-center cursor-pointer hover:bg-filter-grey rounded w-full overflow-hidden whitespace-nowrap sideRow",
      {
        ["bg-filter-grey"]: activeMenu?.id === menu.id,
      }
    );
  };

  return (
    <div>
      <SiteTitle />
      <div className="flex flex-col items-start px-[15px] py-[10px]">
        {menuItems.map(({ icon: Icon, ...menu }) => {
          const classes = getNavItemClasses(menu);
          return (
            <div className={classes}>
              <Icon className="h-[20px] w-[20px]" />
              <Link href={menu.link}>
                <p className="font-medium">{menu.label}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SideBar;
