import HeaderTitle from "@/Components/HeaderTitle";
import { Card, CardContent, CardFooter, CardHeader } from "@/Components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import AppLayout from "@/Layouts/AppLayout";
import { Ban, Clock, HospitalIcon, LayoutDashboardIcon, LoaderPinwheelIcon, User2Icon } from "lucide-react";

const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

export default function Index(props) {
    return (
        <div className="flex flex-col w-full pb-32">
            <div className="flex felx-col items-start justify-between mb-8 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subtitle={props.page_settings.subtitle}
                    icon={HospitalIcon}
                />
            </div>
            <Card>
                <CardHeader>
                    <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center font-semibold">
                        List Menu Dashboard
                    </div>
                </CardHeader>
                <CardContent className="px-0 py-0 [&-td]:whitespace-nowrap [&_td]:px-6 [&_th]:px-6">
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-1">
                                    Nomor
                                </TableHead>
                                <TableHead className="w-full">
                                    Nama
                                </TableHead>
                                <TableHead className="w-1">
                                    Status
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="w-1 text-center">1</TableCell>
                                <TableCell className="w-full">
                                    <div className="flex items-center gap-2">
                                        <User2Icon className="w-4 h-4" />
                                        Rawat Jalan
                                    </div>
                                </TableCell>
                                <TableCell className="w-1 text-center">
                                    <Clock className="text-orange-500" />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="w-1 text-center">2</TableCell>
                                <TableCell className="w-full">
                                    <div className="flex items-center gap-2">
                                        <User2Icon className="w-4 h-4" />
                                        Instalasi Gawat Darurat
                                    </div>
                                </TableCell>
                                <TableCell className="w-1 text-center">
                                    <Ban className="text-red-500" />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="w-1 text-center">3</TableCell>
                                <TableCell className="w-full">
                                    <div className="flex items-center gap-2">
                                        <User2Icon className="w-4 h-4" />
                                        Rawat Inap
                                    </div>
                                </TableCell>
                                <TableCell className="w-1 text-center">
                                    <Ban className="text-red-500" />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="w-1 text-center">4</TableCell>
                                <TableCell className="w-full">
                                    <div className="flex items-center gap-2">
                                        <User2Icon className="w-4 h-4" />
                                        Penunjang
                                    </div>
                                </TableCell>
                                <TableCell className="w-1 text-center">
                                    <Ban className="text-red-500" />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className="flex flex-col items-center justify-between w-full py-2 border-t lg:flex-row">

                </CardFooter>
            </Card>
        </div>
    )
}

Index.layout = (page) => <AppLayout children={page} title="Rawat Jalan" />
