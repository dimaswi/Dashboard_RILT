import HeaderTitle from "@/Components/HeaderTitle";
import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Textarea } from "@/Components/ui/textarea";
import AppLayout from "@/Layouts/AppLayout";
import { flashMessage } from "@/lib/utils";
import { Link, useForm } from "@inertiajs/react";
import { ArrowLeft, CirclePlus, LockKeyhole, PencilIcon, PlusCircleIcon } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";

export default function Edit(props) {

    const fileInputCover = useRef(null);

    const { data, setData, reset, post, processing, errors } = useForm({
        name: props.permission.name ?? '',
        guard_name: props.permission.guard_name ?? '',
        _method: props.page_settings.method
    })

    const onHandleChange = (e) => setData(e.target.name, e.target.value)

    const onHandleSubmit = (e) => {
        e.preventDefault();

        post(props.page_settings.action, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (success) => {
                const flash = flashMessage(success)
                if (flash) toast[flash.type](flash.message)
            }
        })
    }

    const onHandleReset = () => {
        reset();

        fileInputCover.current.value = null;
    }

    return (
        <div className="flex flex-col w-full pb-32">
            <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subtitle={props.page_settings.subtitle}
                    icon={LockKeyhole}
                />
                <Button variant='orange' size="lg" asChild>
                    <Link href={route('admin.permissions.index')}>
                        <ArrowLeft size={4} />
                        Kembali
                    </Link>
                </Button>
            </div>

            <Card>
                <CardContent className="p-6">
                    <form className="space-y-6" onSubmit={onHandleSubmit}>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="name">
                                Nama
                            </Label>
                            <Input
                                name="name"
                                id="name"
                                type="text"
                                placeholder="Masukan Nama"
                                value={data.name}
                                onChange={onHandleChange}
                            />
                            {errors.name && (
                                <InputError message={errors.name} />
                            )}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="guard_name">
                                Guard Name
                            </Label>
                            <Select
                                defaultValue={data.guard_name}
                                onValueChange={(value) => setData('guard_name', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue>
                                        {['web', 'api'].find((guard) => guard === data.guard_name) ?? 'Pilih Guard Name'}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {['web', 'api'].map((guard, index) => (
                                        <SelectItem key={index} value={guard}>
                                            {guard.charAt(0).toUpperCase() + guard.slice(1)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.guard_name && (
                                <InputError message={errors.guard_name} />
                            )}
                        </div>
                        <div className="flex justify-end gap-x-2">
                            <Button type="button" variant="ghost" size="lg" onClick={onHandleReset}>Reset</Button>
                            <Button type="submit" variant="orange" size="lg" disable={processing}>Simpan</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );

}

Edit.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />
