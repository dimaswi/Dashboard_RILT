import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import AppLayout from '@/Layouts/AppLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { Label } from 'recharts';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const onHandleSubmit = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Konfirmasi Password
                </CardTitle>
                <CardDescription>
                    This is a secure area of the application. Please confirm your password before continuing.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={onHandleSubmit}>
                    <div className="mt-4">
                        <Label htmlFor="password">Password</Label>

                        <Input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            placeholder="*********"
                            onChange={(e) => setData('password', e.target.value)}
                        />

                        {errors.password && (
                            <InputError message={errors.password}/>
                        )}
                    </div>

                    <div className="mt-4 flex items-center justify-end">
                        <Button
                            type="submit"
                            variant="orange"
                            size="xl"
                            className="ms-4"
                            disabled={processing}
                        >
                            Confirm
                        </Button>
                    </div>
                </form>
            </CardContent>

        </Card>
    );
}

ConfirmPassword.layout = (page) => <AppLayout children={page} title="Konfirmasi Password" />
