"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  NavbarAirdropIcon,
  NavbarAllSaleIcon,
  NavbarCreateTokenIcon,
  NavbarDashboardIcon,
  NavbarMessagesIcon,
  NavbarMultiSenderIcon,
  NavbarSettingsIcon,
} from "@/assets/icons";
const Navbar = () => {
  const pathname = usePathname();
  const links = [
    { text: "Dashboard", href: "/dashboard", icon: <NavbarDashboardIcon /> },
    {
      text: "All Sales",
      href: "/all-sales",
      icon: <NavbarAllSaleIcon />,
    },
    {
      text: "Multi Sender",
      href: "/multi-sender",
      icon: <NavbarMultiSenderIcon />,
    },
    {
      text: "Create Token",
      href: "/dashboard/token/create",
      icon: <NavbarCreateTokenIcon />,
      childLinks: [
        {
          text: "Create Dutch Auction",
          href: "/dutch-auction/create",
          // icon: <NavbarCreateTokenIcon/>,
        },
        {
          text: "Create Fairlaunch",
          href: "/fair-launch/create",
          // icon: <NavbarCreateTokenIcon/>,
        },
        {
          text: "Create Presale",
          href: "/create-presale/create",
          // icon: <NavbarCreateTokenIcon/>,
        },
        {
          text: "Create Subscription",
          href: "/subscription-pool/create",
          // icon: <NavbarCreateTokenIcon/>,
        },
      ],
    },

    {
      text: "Airdrop",
      href: "/airdrop/list",
      icon: <NavbarAirdropIcon />,
      childLinks: [
        {
          text: "Create Airdrop",
          href: "/airdrop/create",
          // icon: <NavbarCreateTokenIcon/>,
        },
      ],
    },
    { text: "Message", href: "#", icon: <NavbarMessagesIcon /> },
    {
      text: "Settings",
      href: "/dashboard/settings",
      icon: <NavbarSettingsIcon />,
    },
  ];
  return (
    <>
      <ul className="flex flex-col">
        {links.map((l) => {
          return (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`relative w-full flex gap-4 items-center text-sm py-5  pl-10 ${
                  pathname == l.href
                    ? "text-[#9980FF] font-bold"
                    : "text-[#A9A9A9]"
                }`}
              >
                <div className="w-6">{l.icon}</div>
                <span>{l.text}</span>
                {pathname == l.href && (
                  <span className="h-7 rounded-full w-2 bg-[#9980FF] absolute right-0 top-1/2 -translate-y-1/2"></span>
                )}
              </Link>
              {l.childLinks && pathname == l.href && (
                <ul className="flex flex-col">
                  {l.childLinks?.map((childLink) => {
                    return (
                      <>
                        <li>
                          <Link
                            href={childLink.href}
                            className={`w-full pl-20 ${
                              pathname == childLink.href
                                ? "text-white"
                                : "text-[#A9A9A9]"
                            }`}
                          >
                            <span className="text-xs">{childLink.text}</span>
                          </Link>
                        </li>
                      </>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Navbar;
