import { useForm } from "@inertiajs/react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { profileSchema, profileSchemaType } from "@/utils/zod/profileSchema";
import { UserType } from "@/types/types";
import { Separator } from "../ui/separator";
import InputPassword from "../input-password";
import { useState } from "react";

type FormProfileProps = {
    defaultValues?: UserType;
};

const FormProfile = ({ defaultValues }: FormProfileProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, setError, errors, put, processing } =
        useForm<profileSchemaType>({
            email: defaultValues?.email ?? "",
            name: defaultValues?.name ?? "",
            currentPassword: "",
            newPassword: "",
            passwordConfirmation: "",
        });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = profileSchema.safeParse(data);

        if (!result.success) {
            const zodErrors = result.error.format();
            setError({
                email: zodErrors.email?._errors[0] ?? "",
                name: zodErrors.name?._errors[0] ?? "",
                currentPassword: zodErrors.currentPassword?._errors[0] ?? "",
                newPassword: zodErrors.newPassword?._errors[0] ?? "",
                passwordConfirmation:
                    zodErrors.passwordConfirmation?._errors[0] ?? "",
            });
        } else {
            setError({
                email: "",
                name: "",
                currentPassword: "",
                newPassword: "",
                passwordConfirmation: "",
            });

            put(route("profile.update"), {
                onSuccess() {
                    setData((prev) => ({
                        ...prev,
                        currentPassword: "",
                        newPassword: "",
                        passwordConfirmation: "",
                    }));
                },
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
                <div className="flex flex-col gap-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        id="name"
                        placeholder="Informe seu nome completo"
                        aria-invalid={!!errors.name}
                    />
                    {errors.name && errors.name !== "" && (
                        <p className="text-xs text-destructive">
                            {errors.name}
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        id="email"
                        placeholder="example@example.com"
                        aria-invalid={!!errors.email}
                    />
                    {errors.email && errors.email !== "" && (
                        <p className="text-xs text-destructive">
                            {errors.email}
                        </p>
                    )}
                </div>

                {showPassword && (
                    <>
                        <Separator />

                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="currentPassword">Senha atual</Label>
                            <InputPassword
                                value={data.currentPassword}
                                onChange={(e) =>
                                    setData("currentPassword", e.target.value)
                                }
                                id="currentPassword"
                                placeholder="Digite sua senha atual"
                                aria-invalid={!!errors.currentPassword}
                                maxLength={8}
                            />
                            {errors.currentPassword && (
                                <p className="text-xs text-destructive">
                                    {errors.currentPassword}
                                </p>
                            )}
                        </div>

                        <div className="flex gap-x-4">
                            <div className="flex flex-1 flex-col gap-y-2">
                                <Label htmlFor="newPassword">Nova senha</Label>
                                <InputPassword
                                    value={data.newPassword}
                                    onChange={(e) =>
                                        setData("newPassword", e.target.value)
                                    }
                                    id="newPassword"
                                    placeholder="Nova senha"
                                    aria-invalid={!!errors.newPassword}
                                    maxLength={8}
                                />
                                {errors.newPassword && (
                                    <p className="text-xs text-destructive">
                                        {errors.newPassword}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-1 flex-col gap-y-2">
                                <Label htmlFor="passwordConfirmation">
                                    Confirmar nova senha
                                </Label>
                                <InputPassword
                                    value={data.passwordConfirmation}
                                    onChange={(e) =>
                                        setData(
                                            "passwordConfirmation",
                                            e.target.value,
                                        )
                                    }
                                    id="passwordConfirmation"
                                    placeholder="Confirme a nova senha"
                                    aria-invalid={!!errors.passwordConfirmation}
                                    maxLength={8}
                                />
                                {errors.passwordConfirmation && (
                                    <p className="text-xs text-destructive">
                                        {errors.passwordConfirmation}
                                    </p>
                                )}
                            </div>
                        </div>
                    </>
                )}

                <div className="flex gap-x-3">
                    <Button
                        isLoading={processing}
                        type="submit"
                        className="w-32"
                    >
                        Editar perfil
                    </Button>

                    <Button
                        variant="outline"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        Editar senha
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default FormProfile;
