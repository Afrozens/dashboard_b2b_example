'use client';

import { Button } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import ClientService from "@/services/ClientService";
import useOpen from "@/hooks/useOpen";
import Loader from "@/components/general/Loader";
import Custom404 from "@/components/general/404";
import ButtonPrimary from "@/components/commons/buttons/ButtonPrimary";
import AvatarGenerate from "../AvatarGenerate";
import StructuredModal from "@/components/general/StructureModal";
import ClientForm from "@/components/form/ClientForm";

interface Props {
    id: string;
}

const ContainerClient = ({ id }: Props) => {
    const clientService = new ClientService();
    const { isOpen, onClose, onOpen} = useOpen();
    const { data, status, error } = useQuery({
        queryKey: ['client', id],
        queryFn: async () => await clientService.getClient(id),
        enabled: !!id,
        refetchOnWindowFocus: false,
    });
    const router = useRouter();

    if (status === 'pending') return <Loader />
    if (error) return <Custom404 />

    return (
        <>
            <div className="max-w-4xl mx-auto p-6">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-semibold text-gray-900">Client Details</h1>
                    <div className="flex gap-3">
                        <ButtonPrimary onClick={() => router.back()} type="button">
                            Back
                        </ButtonPrimary>
    
                        <ButtonPrimary onClick={onOpen} type="button"
                        >
                            Edit Client
                        </ButtonPrimary>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-gray-200">
                        <div className="flex items-center gap-6">
                            <AvatarGenerate name={data.name} size={80} />
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-900">{data.name}</h2>
                                <p className="text-gray-600 mt-1">{data.email}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="grid grid-cols-1 gap-8">
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Personal Information</h3>
                                
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                        <span className="text-gray-600 font-medium">Full Name</span>
                                        <span className="text-gray-900 font-semibold">{data.name}</span>
                                    </div>
                                    
                                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                        <span className="text-gray-600 font-medium">Email</span>
                                        <span className="text-gray-900 font-semibold">{data.email}</span>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 text-sm">data ID</span>
                                <span className="text-gray-500 text-sm font-mono">{data.id}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="fixed bottom-6 left-6 right-6 md:hidden">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4">
                        <div className="flex gap-3">
                            <Button 
                                block 
                                size="large"
                                className="border-gray-300 text-gray-700"
                            >
                                Back
                            </Button>
                            <Button 
                                block 
                                type="primary" 
                                size="large"
                                className="bg-[#FF5A5F] hover:bg-[#E14B50] border-none"
                            >
                                Edit
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <StructuredModal classAditional="max-w-none xl:w-96" onClose={onClose} show={isOpen}>
                <ClientForm
                    onClose={onClose}
                    action='edit'
                    record={data}
                />
            </StructuredModal>
        </>
    )
}

export default ContainerClient