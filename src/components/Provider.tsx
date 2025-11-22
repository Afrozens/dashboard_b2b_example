import { PropsWithChildren } from "react"
import { Toaster } from "sonner"

const Provider = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Toaster richColors />
      {children}
    </>
  )
}

export default Provider
