import * as React from "react";
import { Badge } from "./ui/badge";

function Header() {
  return (
    <div className="w-full py-1">
      <div className="flex items-center gap-3 border-b border-gray-300 py-4">
        <h1 className="text-xl font-medium tracking-tight">
          What<span className="text-sky-400">To</span>Eat
        </h1>
        <div>
          <Badge variant={"outline"}>v1</Badge>
        </div>
      </div>
    </div>
  );
}

export default Header;
