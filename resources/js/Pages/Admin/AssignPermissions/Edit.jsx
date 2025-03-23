import HeaderTitle from "@/Components/HeaderTitle";
import InputError from "@/Components/InputError";
import { MultiSelect } from "@/Components/MultiSelect";
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
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function Edit(props) {

    const [selectedPermissions, setSelectedPermissions] = useState(
        Array.from(new Set(props.role.permissions.map((permissions) => permissions.id)))
    )

    const { data, setData, reset, post, processing, errors } = useForm({
        name: props.role.name ?? '',
        permissions: selectedPermissions,
        _method: props.page_settings.method
    })

    const onHandleChange = (e) => setData(e.target.name, e.target.value)
    const handlePermissionsChange = (selected) => {
        setSelectedPermissions(selected)
        setData('permissions', selected)
    }

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
                    <Link href={route('admin.assign-permissions.index')}>
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
                                Role
                            </Label>
                            <Input
                                name="name"
                                id="name"
                                disabled
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
                            <Label htmlFor="permissions">
                                Permissions (pilih minimal satu)
                            </Label>
                            <MultiSelect
                                options={props.permissions}
                                onValueChange={handlePermissionsChange}
                                defaultValue={selectedPermissions}
                                placeholder="Pilih Permissions"
                                variant="inverted"
                            />
                            {errors.permissions && (
                                <InputError message={errors.permissions} />
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
