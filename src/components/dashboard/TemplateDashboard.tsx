'use client';

import { PropsWithChildren, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Header from "./Header";
import { User } from "@/models/user";
import { generateUsers } from "@/stub/data";

interface Props extends PropsWithChildren {
    user: User;
}

const TemplateDashboard = ({ children, user }: Props) => {
  const queryClient = new QueryClient();
  const dataStorage = localStorage.getItem('data-stub');

  useEffect(() => {
    if (!dataStorage) {
      localStorage.setItem('data-stub', JSON.stringify(generateUsers(50)))
    }
  }, [])

  return (
    <>
      <Header user={user} />
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </>
  )
}

export default TemplateDashboard
