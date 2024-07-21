"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";


const formSchema = z.object({
  name: z.string().min(1, {
    message: "Correo electrónico es requerido",
  }),
  password: z.string().min(5, {
    message: "digite al menos 5 caracteres",
  }),
});

export const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isEditing, setIsEditing] = useState(false);
  const [viewPass, setViewPass] = useState(false);
  const {toast} = useToast()

  const redirect = searchParams.get("redirect");

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", password: "" },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsEditing(true);
    setViewPass(false);
    try {
      const signInResponse = await signIn("credentials", {
        name: values.name,
        password: values.password,
        redirect: false,
      });

      if (!signInResponse || signInResponse.ok !== true) {
        toast({
          variant: "destructive",
          description: "Usuario y/o Contraseña incorrectos",
          className: "text-xl"
        });
        router.push("/auth");
        return
      }

      if (redirect) {
        router.push(redirect.toString());
      } else {
        router.push("/"); // Si no hay redirección específica, ir a la página principal
      }

      router.refresh();
      toast({ description: "Bienvenido" });
      toggleEdit();
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Error al consultar los datos, intentelo nuevamente",
      });

      console.log("errorr", error);
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm flex ">
      <div className="p-4 sm:p-7 min-w-[400px] min-h-[400px] flex flex-col justify-center">
        <div className="text-center">
          <h1 className="block text-2xl font-bold text-gray-800 ">
            Iniciar sesión
          </h1>
        </div>

        <div className="mt-5">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-y-4 space-y-3"
            >
              <div>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={isSubmitting}
                          placeholder="Usuario"
                          className="h-14"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormControl>
                        <Input
                          type={viewPass ? "text" : "password"}
                          className="relative h-14"
                          disabled={isSubmitting}
                          placeholder="•••••••••"
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                      {field.value && (
                        <div
                          onClick={() => setViewPass(!viewPass)}
                          className="absolute top-2.5 right-2 "
                        >
                          {!viewPass ? (
                            <Eye className="w-5 h-5" />
                          ) : (
                            <EyeOff className="w-5 h-5" />
                          )}
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button disabled={!isValid || isSubmitting} className="w-full">
                {isEditing && <Loader2 className="w-4 h-4 animate-spin" />}
                Entrar
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
