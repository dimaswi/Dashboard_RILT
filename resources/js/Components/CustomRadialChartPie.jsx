import { useState } from "react"

const chartConfig = {
    views : {
        label: 'Total Pengunjung'
    },
    women : {
        label: 'Perempuan',
        color: 'hsl(var--chart-1)'
    },
    men : {
        label: 'Laki-laki',
        color: 'hsl(var--chart-2)'
    }
}

export default function CustomRadialChartPie({chartData}) {
    const [activeChart, setActiveChart] = useState('men')
}
