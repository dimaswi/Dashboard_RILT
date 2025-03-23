import { Head, Link, useForm } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { Button } from '@/Components/ui/button';
import { Checkbox } from '@/Components/ui/checkbox';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const onHandleChange = (e) => setData(e.target.name, e.target.value)

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className='w-full lg:grid lg:min-h-screen lg:grid-cols-2'>

            <div className='flex flex-col px-6 py-4'>
                <ApplicationLogo size='size-12' />
                <div className='flex flex-col items-center justify-center py-12 lg:py-48'>
                    <div className='mx-auto flex w-full flex-col gap-6 lg:w-1/2'>
                        <div className='grid gap-2 text-center'>
                            <h1 className='text-3xl font-bold'>
                                Daftar
                            </h1>
                            <p className='text-balance text-muted-foreground'>
                                Masukan informasi anda untuk membuat akun
                            </p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className='grid gap-4'>
                                <div className='grid gap-2'>
                                    <Label htmlFor="name">Name</Label>

                                    <Input
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        autoComplete="name"
                                        placeholder="Masukan Nama"
                                        onChange={onHandleChange}
                                        required
                                    />

                                    {errors.name && (
                                        <InputError message={errors.name} />
                                    )}

                                    <div className='grid gap-2'>
                                        <Label htmlFor="email">Email</Label>

                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            autoComplete="username"
                                            placeholder="Masukan Email"
                                            onChange={onHandleChange}
                                            required
                                        />

                                        {errors.name && (
                                            <InputError message={errors.email} />
                                        )}
                                    </div>

                                    <div className='grid gap-2'>
                                        <Label htmlFor="password">Password</Label>

                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            autoComplete="new-password"
                                            placeholder="*************"
                                            onChange={onHandleChange}
                                            required
                                        />

                                        {errors.name && (
                                            <InputError message={errors.password} />
                                        )}
                                    </div>

                                    <div className='grid gap-2'>
                                        <Label htmlFor="password_confirmation">Password Confirmation</Label>

                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            autoComplete="new-password"
                                            placeholder="*************"
                                            onChange={onHandleChange}
                                            required
                                        />

                                        {errors.name && (
                                            <InputError message={errors.password_confirmation} />
                                        )}
                                    </div>
                                </div>
                                <Button
                                    type="submit"
                                    variant="orange"
                                    size="xl"
                                    className="w-full"
                                    disabled={processing}
                                >
                                    Daftar
                                </Button>
                            </div>

                        </form>

                        <div className='mt-4 text-center text-sm'>
                            Sudah punya akun?
                            <Link
                                href={route('login')}
                                className='underline'
                            >
                                Masuk
                            </Link>
                        </div>

                    </div>
                </div>
            </div>

            <div className='hidden bg-muted lg:block'>
                <img
                    src="/images/login.webp"
                    alt="Login"
                    className='h-full w-full object-cover dark:brightness-[0.4] dark:grayscale'
                />
            </div>

        </div>
    );
}

Register.layout = (page) => <GuestLayout children={page} title="Register" />
