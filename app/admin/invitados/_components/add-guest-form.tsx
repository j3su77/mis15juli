"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Guest } from "@prisma/client";
import { toast } from "@/components/ui/use-toast";
import { InputForm } from "@/components/input-form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface AddGuestFormProps {
  guest?: Guest | null;
}

const formSchema = z.object({
  firstName: z.string().min(1, {
    message: "Nombres son requeridos",
  }),
  lastName: z.string().min(1, {
    message: "Apellidos son requeridos",
  }),
  invitationCode: z.string().min(1, {
    message: "Código es requerido",
  }),
  relationship: z.string().min(1, {
    message: "Parentesco es requerido",
  }),
  message: z.string().optional(),
});

const generateInvitationCode = () => {
  return Math.floor(10000 + Math.random() * 90000).toString();
};

export const AddGuestForm = ({ guest }: AddGuestFormProps) => {
  const router = useRouter();

  const isEdit = useMemo(() => !!guest, [guest]);

  if (isEdit && !guest) {
    toast({
      variant: "destructive",
      description: "Invitado no encontrado, redirigiendo...",
    });
    router.replace("/admin/invitados/");
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: guest?.firstName || "",
      lastName: guest?.lastName || "",
      invitationCode: guest?.invitationCode || generateInvitationCode(),
      relationship: guest?.relationship || "",
      message: guest?.message || undefined,
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const { setValue, setError } = form;

  const onGenerateNewCode = () => {
    const newCode = generateInvitationCode();
    setValue("invitationCode", newCode);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (isEdit) {
        await axios.patch(`/api/guest/${guest?.id}`, values);
        toast({
          variant: "default",
          description: "Invitado actualizado correctamente",
        });
      } else {
        const { data } = await axios.post(`/api/guest/`, values);
        router.push(`/admin/invitados/`);
        toast({
          variant: "default",
          description: "Invitado agregado correctamente",
        });
      }
      // router.push(`/admin/colaboradores`);
      router.refresh();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverResponse = error.response;
        if (serverResponse && serverResponse.status === 400) {
          const errorMessage = serverResponse.data;
          if (
            typeof errorMessage === "string" &&
            errorMessage.includes("Código de invitación ya registrado")
          ) {
            setError("invitationCode", {
              type: "manual",
              message: "Código de invitación ya registrado",
            });
          } else {
            toast({
              variant: "destructive",
              description: errorMessage,
            });
          }
        } else {
          toast({
            variant: "destructive",
            description: "Ocurrió un error inesperado",
          });
        }
      } else {
        console.error(error);
        toast({
          variant: "destructive",
          description: "Ocurrió un error inesperado",
        });
      }
    }
  };

  return (
    <div className="max-w-[1500px] w-[50%] h-full mx-auto bg-white  overflow-y-hidden p-3">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center mt-8 p-2 w-full gap-4"
        >
          <InputForm
            control={form.control}
            label="nombres"
            name="firstName"
            className="w-full"
          />
          <InputForm
            control={form.control}
            label="Apellidos"
            name="lastName"
            className="w-full"
          />
          <InputForm
            control={form.control}
            label="Parentesco"
            name="relationship"
            className="w-full"
          />

          <FormField
            control={form.control}
            name="invitationCode"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center">
                <FormLabel className="block text-center text-lg">
                  Código:
                </FormLabel>
                <div className="flex items-center">
                  <Input {...field} />
                  <Button
                    type="button"
                    onClick={onGenerateNewCode}
                    className="ml-2"
                  >
                    Generar Nuevo Código
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center">
                <FormLabel className="block text-center text-lg">
                  Mensaje del invitado:
                </FormLabel>
                <Textarea {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={isSubmitting || !isValid}
            className="w-full max-w-[500px] gap-3"
          >
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {isEdit ? "Actualizar" : "Agregar"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
