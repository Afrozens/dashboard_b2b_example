import ContainerClient from "@/components/dashboard/client/ContainerClient";

interface Props {
  params: { id: string };
}

const ClientPage = async ({ params: { id } }: Props) => {
  return (
    <section className="w-full min-h-screen p-4">
        <ContainerClient id={id} />
    </section>
  )
}

export default ClientPage
