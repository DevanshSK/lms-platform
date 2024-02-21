"use client"
import { NAV_LINKS } from "../_constants";
import Image from "next/image";
import Link from "next/link";
import Button from "./button";
import UserNav from "@/components/navbar/user-nav";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  return (
    <nav className="flexBetween max-container padding-relative z-30 py-5">
      <Link href="/">
        <Image src="/ADD-vector-logo.png" alt="logo" width={74} height={29} />
      </Link>
      <ul className="hidden h-full gap-12 lg:flex">
      {NAV_LINKS.map((link) =>
          <Link href={link.href} key={link.key} className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold">
            {link.label}
          </Link>
        )}
      </ul>

      <div className="lg:flexCenter hidden">
        
      </div>
      <div>
      <UserNav />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Image
            src="menu.svg"
            alt="menu"
            width={40}
            height={40}
            className="inline-block cursor-poimter lg:hidden border-2 mx-4 p-2 "
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          {NAV_LINKS.map((link) => (
            <DropdownMenuItem>
              <Link
                href={link.href}
                key={link.key}
                className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold"
              >
                {link.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
     
      </div>
    </nav>
  );
};
//20

export default Navbar;
