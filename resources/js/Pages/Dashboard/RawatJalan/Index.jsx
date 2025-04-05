import CardStat from "@/Components/CardStat";
import HeaderTitle from "@/Components/HeaderTitle";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/Components/ui/chart";
import { Input } from "@/Components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import AppLayout from "@/Layouts/AppLayout";
import UseFilter from "@/lib/UseFilter";
import { Ban, BookDashedIcon, Clock, HospitalIcon, LayoutDashboardIcon, LoaderPinwheelIcon, Users, Users2Icon } from "lucide-react";
import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, Label, Pie, PieChart, PolarRadiusAxis, RadialBar, RadialBarChart, XAxis } from "recharts";

const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
export default function Index(props) {
    const [params, setParams] = useState(props.state);
    const [activeChart, setActiveChart] = useState("rumah_sakit")

    const total = useMemo(
        () => ({
            rumah_sakit: props.rujukanChartData.reduce((acc, curr) => acc + curr.rumah_sakit, 0),
            puskesmas: props.rujukanChartData.reduce((acc, curr) => acc + curr.puskesmas, 0),
            klinik: props.rujukanChartData.reduce((acc, curr) => acc + curr.klinik, 0),
            dokter: props.rujukanChartData.reduce((acc, curr) => acc + curr.dokter, 0),
            perawat: props.rujukanChartData.reduce((acc, curr) => acc + curr.perawat, 0),
            bidan: props.rujukanChartData.reduce((acc, curr) => acc + curr.bidan, 0),
        }),
        [
            {
                rumah_sakit: props.rujukanChartData.reduce((acc, curr) => acc + curr.rumah_sakit, 0),
                puskesmas: props.rujukanChartData.reduce((acc, curr) => acc + curr.puskesmas, 0),
                klinik: props.rujukanChartData.reduce((acc, curr) => acc + curr.klinik, 0),
                dokter: props.rujukanChartData.reduce((acc, curr) => acc + curr.dokter, 0),
                perawat: props.rujukanChartData.reduce((acc, curr) => acc + curr.perawat, 0),
                bidan: props.rujukanChartData.reduce((acc, curr) => acc + curr.bidan, 0),
            }
        ]
    )

    UseFilter({
        route: route('admin.rawat-jalans.index'),
        values: params,
        only: []
    })

    const handleFilterRuangan = (e) => {
        setParams({
            ...params,
            ruangan: e.target.value,
        })
    }

    const handleFilterTanggalAwal = (e) => {
        setParams({
            ...params,
            from: e.target.value
        })
    }

    const handleFilterTanggalAkhir = (e) => {
        setParams({
            ...params,
            to: e.target.value
        })
    }

    return (
        <div className="flex flex-col w-full pb-32 space-y-4">
            <div className="flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subtitle={props.page_settings.subtitle}
                    icon={BookDashedIcon}
                />

                <div className="flex flex-col gap-4 lg:flex-row">
                    <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] lg:w-[400px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={params.ruangan} onChange={handleFilterRuangan}>
                        <option value="All">Semua Ruangan</option>
                        <option value={111010401}>Poli Spesialis Penyakit Dalam</option>
                        <option value={111010501}>Poli Spesialis Anak</option>
                        <option value={111010601}>Poli Spesialis Bedah</option>
                        <option value={111010701}>Poli Spesialis Kandungan</option>
                        <option value={113010101}>Poli Umum</option>
                    </select>
                    <Input
                        value={params.from}
                        onChange={handleFilterTanggalAwal}
                        type="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] lg:w-[200px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <Input
                        value={params.to}
                        onChange={handleFilterTanggalAkhir}
                        type="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] lg:w-[200px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
            </div>

            {/* DATA STAT */}
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <CardStat
                    data={{
                        title: 'Harian',
                        icon: Users2Icon,
                        background: 'text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-500',
                        iconClassName: 'text-white',
                    }}
                >
                    <div className="text-2xl font-bold">{props.page_stat.harian}</div>
                </CardStat>
                <CardStat
                    data={{
                        title: 'Mingguan',
                        icon: Users2Icon,
                        background: 'text-white bg-gradient-to-r from-red-400 via-red-500 to-red-500',
                        iconClassName: 'text-white',
                    }}
                >
                    <div className="text-2xl font-bold">{props.page_stat.mingguan}</div>
                </CardStat>
                <CardStat
                    data={{
                        title: 'Bulanan',
                        icon: Users2Icon,
                        background: 'text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-500',
                        iconClassName: 'text-white',
                    }}
                >
                    <div className="text-2xl font-bold">{props.page_stat.bulanan}</div>
                </CardStat>
                <CardStat
                    data={{
                        title: 'Tahunan',
                        icon: Users2Icon,
                        background: 'text-white bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-500',
                        iconClassName: 'text-white',
                    }}
                >
                    <div className="text-2xl font-bold">{props.page_stat.tahunan}</div>
                </CardStat>
                <CardStat
                    data={{
                        title: 'Pasien Baru Minggu Ini',
                        icon: Users2Icon,
                        background: 'text-white bg-gradient-to-r from-violet-400 via-violet-500 to-violet-500',
                        iconClassName: 'text-white',
                    }}
                >
                    <div className="text-2xl font-bold">{props.page_stat.new_weekly}</div>
                </CardStat>
                <CardStat
                    data={{
                        title: 'Pasien Lama Minggu Ini',
                        icon: Users2Icon,
                        background: 'text-white bg-gradient-to-r from-green-400 via-green-500 to-green-500',
                        iconClassName: 'text-white',
                    }}
                >
                    <div className="text-2xl font-bold">{props.page_stat.old_weekly}</div>
                </CardStat><CardStat
                    data={{
                        title: 'Pasien Baru Bulan Ini',
                        icon: Users2Icon,
                        background: 'text-white bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-500',
                        iconClassName: 'text-white',
                    }}
                >
                    <div className="text-2xl font-bold">{props.page_stat.new_monthly}</div>
                </CardStat>
                <CardStat
                    data={{
                        title: 'Pasien Lama Bulan Ini',
                        icon: Users2Icon,
                        background: 'text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-500',
                        iconClassName: 'text-white',
                    }}
                >
                    <div className="text-2xl font-bold">{props.page_stat.old_monthly}</div>
                </CardStat>
            </div>

            <div className="grid gap-4 md:grid-cols-1 md:gap-8">
                <Card>
                    <CardHeader className="flex items-stretch space-y-0 border-b p-0 sm:flex-row">
                        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                            <CardTitle>Data Rujukan</CardTitle>
                            <CardDescription>
                                Menampilkan Data Per Hari Rujukan Pasien (Max 30 Hari)
                            </CardDescription>
                        </div>
                        <div className="lg:flex">
                            {["rumah_sakit", "puskesmas", "klinik", "dokter", "perawat", "bidan"].map((key) => {
                                const chart = props.rujukanChartConfig
                                return (
                                    <button
                                        key={key}
                                        data-active={activeChart === key}
                                        className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                                        onClick={() => setActiveChart(key)}
                                    >
                                        <span className="text-xs text-muted-foreground">
                                            {props.rujukanChartConfig[key].label}
                                        </span>
                                        <span className="text-lg font-bold leading-none sm:text-3xl">
                                            {total[key].toLocaleString()}
                                        </span>
                                    </button>
                                )
                            })}
                        </div>
                    </CardHeader>
                    <CardContent className="px-2 sm:p-6">
                        <ChartContainer
                            config={props.rujukanChartConfig}
                            className="aspect-auto h-[250px] w-full"
                        >
                            <BarChart
                                accessibilityLayer
                                data={props.rujukanChartData}
                                margin={{
                                    left: 12,
                                    right: 12,
                                }}
                            >
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="tanggal"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    minTickGap={32}
                                    tickFormatter={(value) => {
                                        const date = new Date(value)
                                        return date.toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                        })
                                    }}
                                />
                                <ChartTooltip
                                    content={
                                        <ChartTooltipContent
                                            className="w-[150px]"
                                            nameKey="views"
                                            labelFormatter={(value) => {
                                                return new Date(value).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })
                                            }}
                                        />
                                    }
                                />
                                <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-1 md:gap-8 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Jenis Kelamin Pasien</CardTitle>
                        <CardDescription>Data Kunjungan Kunjungan Pasien Berdasarkan Jenis Kelamin </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={props.genderChartConfig}>
                            <BarChart accessibilityLayer data={props.genderChartData}>
                                <XAxis
                                    dataKey="tanggal"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("id-ID", {
                                            month: "long",
                                        })
                                    }}
                                />
                                <Bar
                                    dataKey="women"
                                    stackId="a"
                                    fill="var(--color-women)"
                                    radius={[0, 0, 4, 4]}
                                />
                                <Bar
                                    dataKey="men"
                                    stackId="a"
                                    fill="var(--color-men)"
                                    radius={[4, 4, 0, 0]}
                                />
                                <ChartTooltip
                                    content={
                                        <ChartTooltipContent
                                            labelFormatter={(value) => {
                                                return new Date(value).toLocaleDateString("en-US", {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                })
                                            }}
                                        />
                                    }
                                    cursor={false}
                                    defaultIndex={1}
                                />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Sebarang Umur Pasien</CardTitle>
                        <CardDescription>Data Kunjungan Kunjungan Pasien Berdasarkan Sebaran Umur </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={props.ageChartConfig}>
                            <BarChart accessibilityLayer data={props.ageChartData}>
                                <XAxis
                                    dataKey="tanggal"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("id-ID", {
                                            month: "long",
                                        })
                                    }}
                                />
                                <Bar
                                    dataKey="young"
                                    stackId="a"
                                    fill="var(--color-young)"

                                />
                                <Bar
                                    dataKey="adult"
                                    stackId="a"
                                    fill="var(--color-adult)"

                                />
                                <Bar
                                    dataKey="aged"
                                    stackId="a"
                                    fill="var(--color-aged)"

                                />
                                <ChartTooltip
                                    content={
                                        <ChartTooltipContent
                                            labelFormatter={(value) => {
                                                return new Date(value).toLocaleDateString("en-US", {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                })
                                            }}
                                        />
                                    }
                                    cursor={false}
                                    defaultIndex={1}
                                />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-1 md:gap-8 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Data Diagnosa Pasien</CardTitle>
                        <CardDescription>Data Diagnosa terbanyak </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[200px]">Kode Diagnosa</TableHead>
                                    <TableHead>Nama</TableHead>
                                    <TableHead>Total</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {props.dataDiagnosa.map((diagnosa) => (
                                    <TableRow key={diagnosa.kode_diagnosa}>
                                        <TableCell>{diagnosa.kode_diagnosa}</TableCell>
                                        <TableCell>{diagnosa.nama_diagnosa}</TableCell>
                                        <TableCell>{diagnosa.total}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

        </div>
    )
}

Index.layout = (page) => <AppLayout children={page} title="Rawat Jalan" />
