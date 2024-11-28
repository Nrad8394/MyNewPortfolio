"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  const handleToggle = (newTheme: string) => {
    setTheme(newTheme);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {/* Conditionally render the Sun or Moon based on the current theme */}
          <Sun
            className={`h-[1.2rem] w-[1.2rem] transition-all ${theme === "dark" ? "rotate-0 scale-0" : "rotate-0 scale-100"}`}
          />
          <Moon
            className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${theme === "light" ? "rotate-90 scale-0" : "rotate-0 scale-100"}`}
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleToggle("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleToggle("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleToggle("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
