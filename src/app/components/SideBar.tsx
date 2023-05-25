"use client";

import React, { useMemo } from "react";
import SiteTitle from "./SiteTitle";
import { useRouter, usePathname } from "next/navigation";
import classNames from "classnames";
import Link from "next/link";
import Image from "next/image"

function SideBar() {
  const menuItems = [
    { id: 1, label: "Home", icon: "home.svg", link: "/" },
    { id: 2, label: "Friends", icon: "friends.svg", link: "/friends" },
  ];
  const router = useRouter();
  const path = usePathname();
  const activeMenu = useMemo(
    () => menuItems.find((menu) => menu.link === path),
    [usePathname()]
  );

  const getNavItemClasses = (menu: any) => {
    return classNames(
      "flex items-center cursor-pointer hover:bg-filter-grey rounded w-full overflow-hidden whitespace-nowrap sideRow mb-1",
      {
        ["bg-filter-grey"]: activeMenu?.id === menu.id,
      }
    );
  };

  return (
    <div>
      <SiteTitle />
      <div className="flex flex-col justify-start items-center px-[10px] py-[8px]">
        {menuItems.map(({ icon: Icon, ...menu }) => {
          const classes = getNavItemClasses(menu);
          return (
            <div key={menu.id} className={classes}>
              <Image
                  src={Icon}
                  alt={menu.label}
                  height={24}
                  width={24}
              />
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
