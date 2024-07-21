

import { LoginForm } from "./_components/login-form";

const LoginPage = () => {
  return (
    <div className="bg-slate-5 h-screen">
      <div className="relative p-1 border-b h-[55px] max-h-[70px] w-full bg-primary text-white shadow-sm flex items-center">
        <div className="mx-auto w-full max-w-[1500px] mt-1">
          <div className="mx-3 flex items-center justify-center">
            <h1 className="p-2 flex gap-1 text-xl font-bold">
              Julianis Andrea Vergara Urieta
            </h1>
          </div>
        </div>
      </div>
      <div className="container w-full flex flex-col items-center justify-start pt-14 h-fit">
        <div className="mb-4">{/* <TitleApp /> */}</div>

        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
