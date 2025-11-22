'use client';

import { DashOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import Link from "next/link";

import { Client } from "@/models/client";
import StructuredModal from "../general/StructureModal";
import useOpen from "@/hooks/useOpen";
import ClientForm from "../form/ClientForm";

interface Props {
    record: Client
}

const Actionclient = ({ record }: Props) => {
  const { isOpen, onClose, onOpen } = useOpen();

  const baseItems = [
    {
      label: (
        <Link href={`/dashboard/clients/${record.id}`} className="text-lg font-semibold lg:text-sm lg:font-light">
          <EyeOutlined className="text-lg mr-4" />
          See
        </Link>
      ),
      key: '1',
    },
    {
      label: (
        <button
          onClick={onOpen}
          className="hover:opacity-80 transition-opacity text-lg font-semibold lg:text-sm lg:font-light"
          type="button"
        >
          <EditOutlined className="text-lg mr-4" />
          Edit
        </button>
      ),
      key: '2',
    },
  ];

  return (
    <>
      <div className={`w-fit flex gap-2 items-center`}>
          <Dropdown menu={{ items: baseItems }} trigger={['click']} placement="bottomRight">
            <button
              type="button"
              className="px-2 transition-all hover:opacity-90"
            >
              <div className="flex hover:bg-gray-200 rounded-xl hover:opacity-90 items-center gap-4 px-2 py-1">
                  <DashOutlined className="text-lg text-black" />
              </div>
            </button>
          </Dropdown>
      </div>

      <StructuredModal classAditional="max-w-none xl:w-96" onClose={onClose} show={isOpen}>
          <ClientForm 
            onClose={onClose}
            action='edit'
            record={record}
          />
      </StructuredModal>
    </>
  )
}

export default Actionclient
