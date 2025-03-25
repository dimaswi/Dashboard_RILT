import HeaderTitle from "@/Components/HeaderTitle"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/Components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/Components/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table"
import UseFilter from "@/lib/UseFilter";
import AppLayout from "@/Layouts/AppLayout"
import { flashMessage } from "@/lib/utils"
import { Link, router } from "@inertiajs/react"
import { ArrowUpDown, BookAIcon, Building2Icon, LockKeyhole, Pencil, PlusCircle, SquareMenuIcon, Trash, User2Icon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export default function Index(props) {
    const { data: permissions, meta } = props.permissions;
    const [params, setParams] = useState(props.state);

    const handleSelect = (e) => {
        setParams({
            ...params,
            load: e.target.value,
            page: 1
        })
    }

    UseFilter({
        route: route('admin.permissions.index'),
        values: params,
        only: ['permissions']
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

                <Button
                    variant="orange"
                    size="lg"
                    asChild
                >
                    <Link
                        href={route('admin.permissions.create')}
                    >
                        <PlusCircle size="4" /> Tambah
                    </Link>
                </Button>
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
                                <TableHead>Cover</TableHead>
                                <TableHead>
                                    <Button variant="ghost" className="grup inline-flex" onClick={() => onSortable('name')}>
                                        Nama
                                        <span className="ml-2 flex-none rounded text-muted-foreground">
                                            <ArrowUpDown className="size-4 text-muted-foreground" />
                                        </span>
                                    </Button>
                                </TableHead>
                                <TableHead>
                                    <Button variant="ghost" className="grup inline-flex" onClick={() => onSortable('username')}>
                                        Guard Name
                                        <span className="ml-2 flex-none rounded text-muted-foreground">
                                            <ArrowUpDown className="size-4 text-muted-foreground" />
                                        </span>
                                    </Button>
                                </TableHead>
                                <TableHead>
                                    <Button variant="ghost" className="grup inline-flex" onClick={() => onSortable('created_at')}>
                                        Dibuat Pada
                                        <span className="ml-2 flex-none rounded text-muted-foreground">
                                            <ArrowUpDown className="size-4 text-muted-foreground" />
                                        </span>
                                    </Button>
                                </TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {permissions.map((book, index) => (
                                <TableRow key={book.id}>
                                    <TableCell>{index + 1 + (meta.current_page - 1) * meta.per_page}</TableCell>
                                    <TableCell>
                                        <Avatar>
                                            <AvatarImage src={book.avatar} />
                                            <AvatarFallback>
                                                {book.name.substring(0, 1)}
                                            </AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell>{book.name}</TableCell>
                                    <TableCell>{book.guard_name}</TableCell>
                                    <TableCell>{book.created_at}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-x-1">
                                            <Button variant="orange" size="sm" asChild>
                                                <Link href={route('admin.permissions.edit', [book])}>
                                                    <Pencil size="4"></Pencil>
                                                </Link>
                                            </Button>
                                            <AlertDialog>
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
                                                                        route('admin.permissions.destroy', [book]), {
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
                                            </AlertDialog>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className="flex flex-col items-center justify-between w-full py-2 border-t lg:flex-row">
                    <p>
                        Menampilkan <span className="font-medium text-orange-500">{meta.from} - {meta.to}</span> dari {meta.total} Permission
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
