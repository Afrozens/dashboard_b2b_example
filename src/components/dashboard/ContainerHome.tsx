'use client';

import ClientService from "@/services/ClientService";
import columnClient from "../columns/Client";
import TemplateDatatable from "./TemplateDatatable";
import usePaginate from "@/hooks/usePaginate";
import FieldInput from "../commons/field/FieldInput";
import ButtonPrimary from "../commons/buttons/ButtonPrimary";
import StructuredModal from "../general/StructureModal";
import useOpen from "@/hooks/useOpen";

const ContainerHome = () => {
    const clientService = new ClientService();
    const column = columnClient();
    const sortableColumns = ['name', 'email'];
    const { handleFilter, filter, debouncedFilter } = usePaginate();
    const { isOpen, onClose, onOpen } = useOpen();
    
    return (
        <>
            <header className="w-full flex justify-end gap-5 mt-10 px-10 items-center">
                <FieldInput 
                    label="filter"
                    classAditional="max-w-xs"
                    name="filter"
                    id="filter"
                    onChange={(e) => handleFilter(e.target.value)}
                    value={filter}
                />
                <ButtonPrimary type="button" onClick={onOpen}>
                    Create Client
                </ButtonPrimary>
            </header>
            <TemplateDatatable
                columns={column}
                sortableColumns={sortableColumns}
                classService={clientService.clientPaginate}
                name='Clients'
                filter={debouncedFilter}
                withCache
            />

            <StructuredModal classAditional="max-w-none xl:w-96" onClose={onClose} show={isOpen}>
                {/* form here */}
            </StructuredModal>
        </>
  )
}

export default ContainerHome
