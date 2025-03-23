import NavLink from "@/Components/NavLink";
import { AlertCircle, AlertCircleIcon, BookAIcon, Building2, CreditCardIcon, CurrencyIcon, DotSquare, FileStackIcon, History, HomeIcon, Hospital, KanbanIcon, KeyIcon, KeySquare, LockKeyhole, LogOutIcon, RouteIcon, Settings2Icon, SquareMenu, TicketSlashIcon, User, User2 } from "lucide-react";


export default function Sidebar({url, auth}) {
    return (
        <nav className="grid items-start px-2 text-sm font-semibold lg:px-4">
            <div className="px-3 py-2 text-sm font-semibold text-foreground">Dashboard</div>
            <NavLink url={route('dashboard')} active={url.startsWith('/dashboard')} title="Dashboard" icon={HomeIcon} />
            <NavLink url={route('admin.rawat-jalans.index')} active={url.startsWith('/admin/rawat-jalans')} title="Rawat Jalan" icon={Hospital} />

            <div className="px-3 py-2 text-sm font-semibold text-foreground">Master</div>
            <NavLink url={route('admin.users.index')} active={url.startsWith('/admin/users')} title="Pengguna" icon={User2} />
            <NavLink url={route('admin.roles.index')} active={url.startsWith('/admin/roles')} title="Role" icon={LockKeyhole} />
            <NavLink url={route('admin.permissions.index')} active={url.startsWith('/admin/permissions')} title="Permission" icon={KeyIcon} />
            <NavLink url={route('admin.assign-permissions.index')} active={url.startsWith('/admin/assign-permissions')} title="Assign Permission" icon={KeyIcon} />
            <NavLink url={route('admin.assign-users.index')} active={url.startsWith('/admin/assign-users')} title="Assign Role" icon={LockKeyhole} />
        </nav>
    )
}
