import HeaderTitle from "@/Components/HeaderTitle"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/Components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { Badge } from "@/Components/ui/badge"
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/Components/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table"
import UseFilter from "@/Hooks/useFilter"
import AppLayout from "@/Layouts/AppLayout"
import { flashMessage } from "@/lib/utils"
import { Link, router } from "@inertiajs/react"
import { ArrowUpDown, Building2Icon, LockKeyhole, Pencil, PlusCircle, SquareMenuIcon, Trash, User2Icon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export default function Index(props) {
    const { data: users, meta } = props.users;
    const [params, setParams] = useState(props.state);

    const handleSelect = (e) => {
        setParams({
            ...params,
            load: e.target.value,
            page: 1
        })
    }

    UseFilter({
        route: route('admin.assign-users.index'),
        values: params,
        only: ['users']
    })

    const onSortable = (field) => {
        setParams({
            ...params,
            field: field,
            direction: params.direction === 'asc' ? 'desc' : 'asc'
        })
    }

    return (
        <div className="flex flex-col w-full pb-32">
            <div className="flex felx-col items-start justify-between mb-8 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subtitle={props.page_settings.subtitle}
                    icon={LockKeyhole}
                />

                {/* <Button
                    variant="orange"
                    size="lg"
                    asChild
                >
                    <Link
                        href={route('admin.assign-users.create')}
                    >
                        <PlusCircle size="4" /> Tambah
                    </Link>
                </Button> */}
            </div>
            <Card>
                <CardHeader className="">
                    <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center">
                        <Input className="w-full sm:w-1/4"
                            placeholder="Cari"
                            value={params.search ?? ''}
                            onChange={(e) => setParams((prev) => ({ ...prev, search: e.target.value, page: 1 }))}
                        />
                        <select value={params.load} onChange={handleSelect}>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                            <option value={20}>20</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>

                        </select>
                        <Button
                            variant="red"
                            size="lg"
                            onClick={() => setParams('')}
                        >Hapus Filter</Button>
                    </div>
                </CardHeader>
                <CardContent className="px-0 py-0 [&-td]:whitespace-nowrap [&_td]:px-6 [&_th]:px-6">
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    <Button variant="ghost" className="grup inline-flex" onClick={() => onSortable('id')}>
                                        #
                                        <span className="ml-2 flex-none rounded text-muted-foreground">
                                            <ArrowUpDown className="size-4 text-muted-foreground" />
                                        </span>
                                    </Button>
                                </TableHead>
                                {/* <TableHead>Cover</TableHead> */}
                                <TableHead>
                                    <Button variant="ghost" className="grup inline-flex" onClick={() => onSortable('name')}>
                                        Nama
                                        <span className="ml-2 flex-none rounded text-muted-foreground">
                                            <ArrowUpDown className="size-4 text-muted-foreground" />
                                        </span>
                                    </Button>
                                </TableHead>
                                <TableHead>
                                    <Button variant="ghost" className="grup inline-flex" onClick={() => onSortable('email')}>
                                        Email
                                        <span className="ml-2 flex-none rounded text-muted-foreground">
                                            <ArrowUpDown className="size-4 text-muted-foreground" />
                                        </span>
                                    </Button>
                                </TableHead>
                                <TableHead>
                                    Permission
                                    {/* <Button variant="ghost" className="grup inline-flex" onClick={() => onSortable('username')}>
                                        Permissions
                                        <span className="ml-2 flex-none rounded text-muted-foreground">
                                            <ArrowUpDown className="size-4 text-muted-foreground" />
                                        </span>
                                    </Button> */}
                                </TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user, index) => (
                                <TableRow key={user.id}>
                                    <TableCell>{index + 1 + (meta.current_page - 1) * meta.per_page}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        {user.roles.map((role, index) => (
                                            <span className="w-auto text-wrap">
                                                <Badge variant="outline" className="my-0.5 mr-2">
                                                    {role}
                                                </Badge>
                                            </span>
                                        ))}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-x-1">
                                            <Button variant="orange" size="sm" asChild>
                                                <Link href={route('admin.assign-users.edit', [user])}>
                                                    <Pencil size="4"></Pencil>
                                                </Link>
                                            </Button>
                                            {/* <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="red" size="sm">
                                                        <Trash size="4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>
                                                            Apakah anda benar-benar yakin?
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Tindakan ini tidak dapat dibatalkan, tindakan ini akan menghapus secara permanen dan menghapus data anda dari server kami!
                                                        </AlertDialogDescription>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>
                                                                Cancel
                                                            </AlertDialogCancel>
                                                            <AlertDialogAction className="bg-red-600" onClick={
                                                                () => {
                                                                    router.delete(
                                                                        route('admin.assign-users.destroy', [user]), {
                                                                        preserveScroll: true,
                                                                        preserveState: true,
                                                                        onSuccess: (success) => {
                                                                            const flash = flashMessage(success)
                                                                            if (flash) toast[flash.type](flash.message)
                                                                        }
                                                                    }
                                                                    )
                                                                }
                                                            }>
                                                                Continue
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogHeader>
                                                </AlertDialogContent>
                                            </AlertDialog> */}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className="flex flex-col items-center justify-between w-full py-2 border-t lg:flex-row">
                    <p>
                        Menampilkan <span className="font-medium text-orange-500">{meta.from} - {meta.to}</span> dari {meta.total} Users
                    </p>
                    <div className="overflow-x-auto">
                        {meta.has_pages && (
                            <Pagination>
                                <PaginationContent className="flex flex-wrap justify-center lg:justify-end">
                                    {meta.links.map((link, index) => (
                                        <PaginationItem className="mx-1 mb-1 lb:mb-0" key={index}>
                                            <PaginationLink
                                                href={link.url}
                                                isActive={link.active}
                                            >
                                                {link.label}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                </PaginationContent>
                            </Pagination>
                        )}
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

Index.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />
