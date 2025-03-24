import CardStat from "@/Components/CardStat";
import HeaderTitle from "@/Components/HeaderTitle";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/Components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import UseFilter from "@/Hooks/UseFilter";
import AppLayout from "@/Layouts/AppLayout";
import { Ban, BookDashedIcon, Clock, HospitalIcon, LayoutDashboardIcon, LoaderPinwheelIcon, Users, Users2Icon } from "lucide-react";
import { useState } from "react";
import { Bar, BarChart, Cell, Label, Pie, PieChart, PolarRadiusAxis, RadialBar, RadialBarChart, XAxis } from "recharts";

const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
export default function Index(props) {
    const [params, setParams] = useState(props.state);

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
    return (
        <div className="flex flex-col w-full pb-32 space-y-4">
            <div className="flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subtitle={props.page_settings.subtitle}
                    icon={BookDashedIcon}
                />

                <select value={params.ruangan} onChange={handleFilterRuangan}>
                    <option value="All">Semua Ruangan</option>
                    <option value={111010401}>Poli Spesialis Penyakit Dalam</option>
                    <option value={111010501}>Poli Spesialis Anak</option>
                    <option value={111010601}>Poli Spesialis Bedah</option>
                    <option value={111010701}>Poli Spesialis Kandungan</option>
                    <option value={113010101}>Poli Umum</option>

                </select>
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

        </div>
    )
}

Index.layout = (page) => <AppLayout children={page} title="Rawat Jalan" />
