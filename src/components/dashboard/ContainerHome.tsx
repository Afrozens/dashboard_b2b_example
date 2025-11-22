'use client';

import ClientService from "@/services/ClientService";
import columnClient from "../columns/Client";
import TemplateDatatable from "./TemplateDatatable";
import usePaginate from "@/hooks/usePaginate";
import FieldInput from "../commons/field/FieldInput";
import ButtonPrimary from "../commons/buttons/ButtonPrimary";
import StructuredModal from "../general/StructureModal";
import useOpen from "@/hooks/useOpen";
import { DesktopOutlined, DollarOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import Widget from "./Widget";

const ContainerHome = () => {
    const clientService = new ClientService();
    const column = columnClient();
    const sortableColumns = ['name', 'email'];
    const { handleFilter, filter, debouncedFilter } = usePaginate();
    const { isOpen, onClose, onOpen } = useOpen();
    
    const widgetServices = [
        {
            service: clientService.getClientStats,
            icon: <UserOutlined />,
            name: "clients-widget"
        },
        {
            service: clientService.getComputerStats,
            icon: <DesktopOutlined />,
            name: "computers-widget"
        },
        {
            service: clientService.getSalesStats,
            icon: <ShoppingCartOutlined />,
            name: "sales-widget"
        },
        {
            service: clientService.getRevenueStats,
            icon: <DollarOutlined />,
            name: "revenue-widget"
        }
    ];

    return (
        <>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
                {widgetServices.map((widget, index) => (
                    <Widget
                        key={index}
                        classService={widget.service}
                        icon={widget.icon}
                        name={widget.name}
                        withCache={true}
                    />
                ))}
            </section>
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
