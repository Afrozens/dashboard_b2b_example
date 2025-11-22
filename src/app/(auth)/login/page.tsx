import Image from "next/image"

import Card from "@/components/general/Card"
import LoginForm from "@/components/form/LoginForm"

const LoginPage = () => {
  return (
    <article className="w-full min-h-screen px-6 lg:px-0 grid grid-cols-1 md:grid-cols-6 place-content-center bg-[#E6E6E6]">
			<section className="col-span-1 min-h-screen w-full md:col-span-2 flex justify-center items-center bg-white">
				<Card classAditional="md:shadow-none md:border-none">
					<h1 className="text-balance text-3xl font-extrabold leading-none tracking-tight text-gray-900 text-center mb-2">
						Welcome back! 🤓
					</h1>
					<p className="text-center whitespace-nowrap text-lg mb-5">
						Enter your Credentials to access your account
					</p>
                    <LoginForm />
				</Card>
			</section>
			<section className="w-full md:min-h-screen md:flex justify-center items-center hidden col-start-3 col-end-7">
				<Image
					width={550}
					height={550}
					className="mx-auto"
					alt="svg icon from ilustration"
					src="/images/login-illustrator.svg"
				/>
			</section>
		</article>
  )
}

export default LoginPage