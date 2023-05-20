import Link from "next/link";
import React from "react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

function SiteTitle() {
  return (
    <div className="sideRow py-[29px]">
      <IoChatbubbleEllipsesOutline className="h-[20px] w-[20px] text-icon-blue" />
      <p className="font-semibold">Clerkie Challenge</p>
    </div>
  );
}

export default SiteTitle;
