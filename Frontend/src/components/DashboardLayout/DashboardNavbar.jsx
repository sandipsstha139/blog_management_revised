import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import {
  GlobeLock,
  Handshake,
  LogOut,
  Mail,
  NotepadText,
  Star,
} from "lucide-react";
import Link from "next/link";

const DashboardNavbar = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex h-14 lg:h-[55px] items-center gap-4 border-b px-3 relative">
        <Dialog>
          <SheetTrigger className="min-[1024px]:hidden p-2 transition">
            <HamburgerMenuIcon />
            <Link href="/dashboard">
              <span className="sr-only">Home</span>
            </Link>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <Link href="/">
                <SheetTitle>Dashboard</SheetTitle>
              </Link>
            </SheetHeader>
            <div className="flex flex-col space-y-3 mt-[1rem]">
              <DialogClose asChild>
                <Link href="/dashboard/blog">
                  <Button variant="outline" className="w-full">
                    <NotepadText className="mr-2 h-4 w-4" />
                    Blog
                  </Button>
                </Link>
              </DialogClose>
              <DialogClose asChild>
                <Link href="/dashboard/privacy-policy">
                  <Button variant="outline" className="w-full">
                    <GlobeLock className="mr-2 h-4 w-4" />
                    Privacy Policy
                  </Button>
                </Link>
              </DialogClose>
              <Separator className="my-3" />
              <DialogClose asChild>
                <Link href="/dashboard/terms-and-conditions">
                  <Button variant="outline" className="w-full">
                    <Handshake className="mr-2 h-4 w-4" />
                    Terms and Conditions
                  </Button>
                </Link>
              </DialogClose>
              <DialogClose asChild>
                <Link href="/dashboard/reviews">
                  <Button variant="outline" className="w-full">
                    <Star className="mr-2 h-4 w-4" />
                    Reviews
                  </Button>
                </Link>
              </DialogClose>
              <DialogClose asChild>
                <Link href="/dashboard/mail">
                  <Button variant="outline" className="w-full">
                    <Mail className="mr-2 h-4 w-4" />
                    Mail
                  </Button>
                </Link>
              </DialogClose>
              <Separator className="my-3" />
              <DialogClose asChild>
                <Link href="/dashboard/logout">
                  <Button variant="outline" className="w-full">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </Link>
              </DialogClose>
            </div>
          </SheetContent>
        </Dialog>
        <div className="flex-grow"></div>
        <div className="relative">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Welcome Back, User</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Add your sidebar content here if needed */}

      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default DashboardNavbar;
