'use client';

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";

import ButtonPrimary from "../commons/buttons/ButtonPrimary";
import FieldInput from "../commons/field/FieldInput";
import { Schema, schema } from "@/models/schemas/client";
import useSubmit from "@/hooks/useSubmit";
import { Client } from "@/models/client";
import ClientService from "@/services/ClientService";
import FieldError from "../commons/field/FieldError";

interface Props {
    onClose: () => void;
    action: 'create' | 'edit'
    record?: Client
}

const ClientForm = ({ action, onClose, record }: Props) => {
    const clientService = new ClientService();
    const form = useForm<Schema>({
        mode: 'onChange',
        resolver: zodResolver(schema),
    });
    
    const { handleSubmit, reset, clearErrors, formState: { errors, isValid }, register } = form;
    
    const queryClient = useQueryClient();
    const { isLoading, doSubmit, error } = useSubmit<Partial<Client>, void>();
    const saveService = action === 'create' ? clientService.createClient : clientService.editClient;


    useEffect(() => {
        if (record) {
            const formData = {
                ...record,
            };
            reset(formData);
        }
    }, [record]);

    const onSubmit: SubmitHandler<Schema> = async data => {
        clearErrors();
        await doSubmit({ data, callback: saveService, id: record?.id });
        await queryClient.invalidateQueries({ queryKey: ['paginate-clients'] });
        if (action === 'edit') {
            await queryClient.invalidateQueries({ queryKey: ['client', record?.id] });
        }
        toast.success(`client ${action === 'create' ? 'created' : 'edited'} successfully`);
        reset();
        onClose();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form-initial mt-5 w-full max-w-xl">
            <FieldInput 
                name="name"
                label="Full Name"
                register={register}
                error={errors.name?.message as string}
                isRequired
                placeholder="John Doe"
                id="name"
            />
            <div className="w-full flex-col gap-4">
                <FieldInput
                    label={'email'}
                    type="email"
                    id="email"
                    name="email"
                    error={errors.email?.message as string}
                    register={register}
                    rules={{
                        required: {
                            value: true,
                            message: 'Email is required',
                        },
                    }}
                    isRequired
                    placeholder="correo@empresa.com"
                />
            </div>

            <div className="w-full flex justify-center items-center">
                <ButtonPrimary disabled={!isValid} type="submit" loading={isLoading}>
                    <span className="capitalize">
                        {action} client
                    </span>
                </ButtonPrimary>
                <FieldError error={error} />
            </div>
        </form>
    );
};

export default ClientForm;