"use client";
import React, { useEffect } from "react";
import { ModeToggle } from "./ColorMode";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowDownNarrowWide, ChevronDown, LogIn } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { parseAsString, useQueryState } from "nuqs";
import { useProductFilters } from "@/store/product";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useIsMobile } from "@/hooks/use-mobile";
const Header = () => {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useQueryState(
    "search",
    parseAsString.withDefault("")
  );
  const { search, setSerach } = useProductFilters();
  const debouncedQuery = useDebounce(searchQuery, 500); // waits 500ms

  useEffect(() => {
    if (debouncedQuery != null && debouncedQuery !== undefined) {
      setSerach(debouncedQuery);
    }
  }, [debouncedQuery]);
  return (
    <div className="py-3 border-b">
      <div className="flex items-center xl:justify-between  gap-x-3 justify-evenly mx-4 sm:mx-8 lg:mx-24">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Logo"
            width={120}
            height={40}
            className="w-24 h-auto sm:w-28 md:w-32 lg:w-36"
            priority
          />
        </div>

        <div className="flex-1 flex items-center xl:justify-center">
          <Button className="hidden md:block" variant="outline" size="default">
            <div className="flex items-center gap-x-2">
              <span> Products</span> <ChevronDown />
            </div>
          </Button>
          <div className="flex-1 xl:flex-[0.5]">
            <Input
              type="text"
              value={searchQuery}
              className="w-full"
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for Product"
            />
          </div>
        </div>
        <div className="flex items-center gap-x-3">
          {isMobile ? (
            <RegisterloginMobile>
              <div className="flex flex-col gap-y-3">
                <Button>Register</Button>
                <Button variant="outline">login</Button>
              </div>
            </RegisterloginMobile>
          ) : (
            <>
              <Button>Register</Button>
              <Button variant="outline">login</Button>
            </>
          )}

          {/* Mode Toggle */}
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Header;

export function RegisterloginMobile({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">
          <LogIn />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-32">{children}</PopoverContent>
    </Popover>
  );
}
