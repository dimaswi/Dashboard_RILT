import ApplicationLogo from "@/Components/ApplicationLogo";
import NavLink from "@/Components/NavLink";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/Components/ui/sheet";
import { Toaster } from "@/Components/ui/sonner";
import { Head, Link, usePage } from "@inertiajs/react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import NavLinkResponsive from "@/Components/NavLinkResponsive";
import Sidebar from "./Partials/Sidebar";
import SidebarResponsive from "./Partials/SidebarResponsive";
import { PanelRightClose } from "lucide-react";

export default function AppLayout({ title, children }) {

    const auth = usePage().props.auth.user;
    const {url} = usePage();

    return (
        <>

            <Head title={title} />
            <Toaster position="top-center" richColors />
            <div className="flex flex-row w-full min-h-screen">
                <div className="hidden w-1/6 border-r lg:block">
                    <div className="flex flex-col h-full min-h-screen gap-2">
                        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                            <ApplicationLogo />
                        </div>

                        <div className="flex-1">
                            {/* sidebar */}
                            <Sidebar url={url} auth={auth}/>

                        </div>
                    </div>
                </div>

                <div className="flex flex-col w-full lg:w-5/6">
                    <header className="flex h-12 items-center justify-between gap-4 border-b px-4 lg:h-[60px] lg:justify-end lg:px-6">
                        {/* sidebar mobile */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                                    <PanelRightClose className="size-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="flex flex-col max-h-screen overflow-y-auto">
                                <SheetHeader>
                                    <SheetTitle>
                                        <VisuallyHidden.Root>
                                            Sidebar Responsive
                                        </VisuallyHidden.Root>
                                    </SheetTitle>
                                    <SheetDescription>
                                        <VisuallyHidden.Root>
                                            Sidebar Responsive
                                        </VisuallyHidden.Root>
                                    </SheetDescription>
                                </SheetHeader>
                                {/* Menu Sidebar Responsive */}
                                    <SidebarResponsive  url={url} auth={auth}/>
                            </SheetContent>
                        </Sheet>
                        {/* dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="flex gap-x-2">
                                    <span>Hi, {auth.name}</span>
                                    <Avatar>
                                        <AvatarImage src={auth.avatar}/>
                                        <AvatarFallback>
                                            {auth.name.substring(0,1)}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>
                                    Akun Saya
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {/* <DropdownMenuItem>Profile</DropdownMenuItem> */}
                                <DropdownMenuItem asChild>
                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        className="w-full"
                                    >
                                        Logout
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </header>

                    <main className="w-full">
                        <div className="relative">
                            <div
                                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                                aria-hidden="true"
                            >
                                <div
                                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-orange-100 to-orange-200 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                                    style={{
                                        clipPath:
                                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                                    }}
                                />
                            </div>

                        </div>
                        <div className="gap-4 p-4 lg:gap-6">{children}</div>
                    </main>
                </div>
            </div>

        </>
    )
}
