"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SimpleModal } from "@/components/simple-modal";
import { useState } from "react";
import { ConfirmAssistance } from "./confirm-assistance";
import axios from "axios";
import { Guest } from "@prisma/client";
import { toast } from "@/components/ui/use-toast";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Flower } from "@/components/flower";

const formSchema = z.object({
  code: z.string().min(2, {
    message: "El código debe contener al menos 4 caracteres",
  }),
});

export const Invitation = () => {
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [confirmAssistance, setConfirmAssistance] = useState(false);
  const [guest, setGuest] = useState<Guest | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  const { setError, setValue } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { data } = await axios.post("/api/check-code", {
        invitationCode: values.code,
      });
      setGuest(data);
      setConfirmAssistance(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverResponse = error.response;
        if (serverResponse && serverResponse.status === 400) {
          const errorMessage = serverResponse.data;
          if (
            typeof errorMessage === "string" &&
            errorMessage.includes("Invitado no encontrado 😑")
          ) {
            setOpenErrorModal(true);
          } else {
            toast({ description: errorMessage });
          }
        } else {
          toast({ description: "Ocurrió un error inesperado" });
        }
      } else {
        console.error(error);
        toast({ description: "Ocurrió un error inesperado" });
      }
    }

    setValue("code", "", { shouldTouch: true });
  }

  const onClose = () => {
    setOpenErrorModal(false);
    setConfirmAssistance(false);
  };

  return (
    <section
      className="min-h-[calc(100vh)] w-full flex items-center justify-center p-2 overflow-hidden bg-primary"
      id="home"
      style={{ position: "relative" }}
    >
      <Card className=" relative max-w-xl w-full bg-secondary border-4 border-white">
        <Flower h={100} w={100} r="-50px" t="-50px" />
        <CardHeader>
          <h2 className="text-center font-bold text-2xl">CONFIRMACIÓN</h2>
          <span className="text-primary block text-center">
            Escribe tu codigo de invitación
          </span>
        </CardHeader>
        <CardContent className="flex justify-center ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-3 items-center justify-center w-full space-y-8"
            >
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-36" type="submit">
                Consultar
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <SimpleModal
        openDefault={openErrorModal}
        title="Lo sentimos"
        large={false}
        btnClass="hidden"
        onClose={onClose}
      >
        <span className="text-xl">
          Hola al parecer el código ingresado no existe
        </span>
      </SimpleModal>

      <div>
        {!!guest && (
          <ConfirmAssistance
            guest={guest}
            confirmAssistance={confirmAssistance}
            onClose={onClose}
          />
        )}
      </div>
    </section>
  );
};
