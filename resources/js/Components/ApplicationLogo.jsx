import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { CircleArrowDownIcon } from 'lucide-react';

export default function ApplicationLogo({ url = '#', size = 'size-9', isTitle = true }) {
    return (
        <Link href={url} className="flex items-center gap-2">
            {/* <CircleArrowDownIcon className={cn('text-orange-500', size)} /> */}
            <img
                    src="/images/logo.png"
                    alt="Login"
                    className={cn(size)}
                />
            {isTitle && (
                <div className="flex flex-col">
                    <span className="font-bold leading-none text-foreground">Klinik Muhammadiyah Kedungadem</span>
                    {/* <span className="text-xs font-medium text-muted-foreground">Sistem Informasi Pemantau Kinerja Rumah Sakit</span> */}
                </div>
            )}
        </Link>
    );
}
