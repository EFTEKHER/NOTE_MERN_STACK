import { PlusIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <header className="bg-base-300 border-p border-base-content/10 ">
      <div className="mx-auto max-w-7xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold  font-mono tracking-tighter text-primary">
            ThinkBoard
          </h1>
          <div>
            <div className="flex items-center gap-4">
              <Link
                to="/create"
                className="text-lg font-semibold text-secular btn btn-primary hover:text-secondary-focus"
              >
                <PlusIcon className="size-5" />
                <span className="ml-2">New Note</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
