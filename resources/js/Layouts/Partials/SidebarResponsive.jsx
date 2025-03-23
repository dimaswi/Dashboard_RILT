import ApplicationLogo from "@/Components/ApplicationLogo";
import NavLinkResponsive from "@/Components/NavLinkResponsive";
import { AlertCircle, AlertCircleIcon, BookAIcon, Building2, CreditCardIcon, CurrencyIcon, DotSquare, FileStackIcon, History, HomeIcon, HospitalIcon, KanbanIcon, KeyIcon, KeySquare, LayoutDashboardIcon, LockKeyhole, LogOutIcon, RouteIcon, Settings2Icon, SquareMenu, TicketSlashIcon, User, User2 } from "lucide-react";

export default function SidebarResponsive({ url, auth }) {
    return (
        <nav className="grid gap-6 text-lg font-medium">
            <ApplicationLogo />
            <nav className="grid items-start text-sm font-semibold lg:px-4">
                <div className="px-3 py-2 text-sm font-semibold text-foreground">Dashboard</div>
                <NavLinkResponsive url={route('dashboard')} active={url.startsWith('/dashboard')} title="Dashboard" icon={LayoutDashboardIcon} />
                <NavLinkResponsive url={route('admin.rawat-jalans.index')} active={url.startsWith('/admin/rawat-jalans')} title="Rawat Jalan" icon={HospitalIcon} />

                <div className="px-3 py-2 text-sm font-semibold text-foreground">Master</div>
                <NavLinkResponsive url={route('admin.users.index')} active={url.startsWith('/admin/users')} title="Pengguna" icon={User2} />
                <NavLinkResponsive url={route('admin.roles.index')} active={url.startsWith('/admin/roles')} title="Role" icon={LockKeyhole} />
                <NavLinkResponsive url={route('admin.permissions.index')} active={url.startsWith('/admin/permissions')} title="Permission" icon={KeyIcon} />
                <NavLinkResponsive url={route('admin.assign-permissions.index')} active={url.startsWith('/admin/assign-permissions')} title="Assign Permission" icon={KeyIcon} />
                <NavLinkResponsive url={route('admin.assign-users.index')} active={url.startsWith('/admin/assign-users')} title="Assign Role" icon={LockKeyhole} />
            </nav>
        </nav>
    )
}
