import ApplicationLogo from '@/Components/ApplicationLogo';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Button } from '@/Components/ui/button';
import { Label } from '@/Components/ui/label';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const onHandleChange = (e) => setData(e.target.name, e.target.value)

    const onHandleSubmit = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <div className='w-full lg:grid lg:min-h-screen lg:grid-cols-2'>
                <div className='flex flex-col px-6 py-4'>
                    <ApplicationLogo size='size-12' />
                    <div className='flex flex-col items-center justify-center py-12 lg:py-48'>
                        <div className='mx-auto flex w-full flex-col gap-6 lg:w-1/2'>
                            <div className='grid gap-2 text-center'>
                                <h1 className='text-3xl font-bold'>
                                    Reset Password
                                </h1>
                                <p className='text-balance text-muted-foreground'>
                                    Masukan password yang mudah anda ingat
                                </p>
                            </div>
                            <form onSubmit={onHandleSubmit}>
                                <div className='grid gap-2'>
                                    <div className='grid gap-2'>
                                        <Label htmlFor="email">Email</Label>

                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="mt-1 block w-full"
                                            autoComplete="username"
                                            onChange={onHandleChange}
                                        />

                                        {errors.email && (
                                            <InputError message={errors.email} />
                                        )}
                                    </div>

                                    <div className='grid gap-2'>
                                        <Label htmlFor="password">Password</Label>

                                        <TextInput
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="mt-1 block w-full"
                                            autoComplete="new-password"
                                            onChange={onHandleChange}
                                        />

                                        {errors.password && (
                                            <InputError message={errors.password} />
                                        )}
                                    </div>

                                    <div className='grid gap-2'>
                                        <Label htmlFor="password_confirmation">Konfirmasi Password</Label>

                                        <TextInput
                                            type="password"
                                            id="password_confirmation"
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            className="mt-1 block w-full"
                                            autoComplete="new-password"
                                            onChange={onHandleChange}
                                        />

                                        {errors.password_confirmation && (
                                            <InputError message={errors.password_confirmation} />
                                        )}
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    variant="orange"
                                    size="xl"
                                    className="w-full mt-4"
                                    disabled={processing}
                                >
                                    Simpan
                                </Button>
                            </form>
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
        </>
    );
}

ResetPassword.layout = (page) => <GuestLayout children={page} title="Reset Password" />
