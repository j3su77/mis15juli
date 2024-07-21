import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import axios from "axios";
import { Guest } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";
import { SimpleModal } from "@/components/simple-modal";
import { toast } from "@/components/ui/use-toast";
import confetti from "canvas-confetti";

const MAX_MESSAGE_LENGTH = 200;

const formSchema = z.object({
  message: z.string().max(MAX_MESSAGE_LENGTH).optional(),
  confirmed: z.boolean().nullable(),
});

export const ConfirmAssistance = ({
  guest,
  confirmAssistance,
  onClose,
}: {
  guest: Guest;
  confirmAssistance: boolean;
  onClose: () => void;
}) => {
  const [openModal, setOpenModal] = useState(confirmAssistance);

  useEffect(() => {
    setOpenModal(confirmAssistance);
  }, [confirmAssistance]);
  useEffect(() => {
    guest.confirmed && startConffeti()
  }, [guest]);

  const [messageLength, setMessageLength] = useState(
    guest.message?.length || 0
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      confirmed: guest.confirmed || null,
      message: guest.message || "",
    },
  });
  const { watch, setValue } = form;
  const confirmed = watch("confirmed");

  const handleToggle = (value: boolean) => {
    setValue("confirmed", value);
  };

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_MESSAGE_LENGTH) {
      setValue("message", value);
      setMessageLength(value.length);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.post("/api/confirm", {
        guestId: guest.id,
        confirmed: values.confirmed,
        message: values.message,
      });
      toast({
        description: "Gracias por responder",
      });
      startConffeti()
    } catch (error) {
      console.error("Error confirming attendance:", error);
      toast({
        description: "Ocurrió un error, por favor intentelo nuevamente",
      });
    } finally {
      onClose();
    }
  }

  const startConffeti = () => {
    const defaults = {
      spread: 200,
      ticks: 500,
      gravity: 0.9,
      decay: 0.94,
      startVelocity: 30,
      origin: { y: 0.6 },
    };

    confetti({
      ...defaults,
      particleCount: 100,
    });

    confetti({
      ...defaults,
      particleCount: 75,
    });

    confetti({
      ...defaults,
      particleCount: 30,
    });
  };

  return (
    <SimpleModal
      openDefault={openModal}
      title={guest.hasResponded ?  guest.confirmed ? "¡Que genial 😁!" : "¡Hola!" : ""}
      large={!guest.hasResponded}
      btnClass="hidden"
      notClose={!guest.hasResponded}
      onClose={onClose}
    >
      <div>
        {guest.hasResponded ? (
          <div>
            <h2 className="text-xl font-bold">
             {
              guest.confirmed ? (
                <div>
                    Hola {guest.relationship} {guest?.firstName} {guest?.lastName}, gracias por confirmar
              tu asistencia a mi fiesta de 15, te espero.
                </div>
              ) : (
                <div>
                   Hola {guest.relationship} {guest?.firstName} {guest?.lastName}, aunque no puedas asistir a mi fiesta, sabes que te quiero mucho 😘
                </div>
              )
             }
              <span className="mt-5 block"> con mucho cariño</span>
              <span className="mt-2 block font-bold"> Julianis❤️</span>
            </h2>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-bold">
              Hola, {guest?.firstName} {guest?.lastName} queremos invitarte a mi
              fiesta de 15 años
            </h2>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-3 items-center justify-center w-full space-y-8"
              >
                <FormField
                  control={form.control}
                  name="confirmed"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center">
                      <FormLabel className="block text-center text-lg">
                        Confirmar asistencia:
                      </FormLabel>
                      <div className="flex justify-center w-full gap-4">
                        <Toggle
                          aria-label="Confirmar asistencia"
                          pressed={confirmed === true}
                          onPressedChange={() => handleToggle(true)}
                          className="font-bold"
                          size="lg"
                        >
                          Sí
                        </Toggle>
                        <Toggle
                          aria-label="Rechazar asistencia"
                          pressed={confirmed === false}
                          onPressedChange={() => handleToggle(false)}
                          size="lg"
                        >
                          No
                        </Toggle>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem
                      className={`flex flex-col items-center ${
                        confirmed !== null ? "flex" : "hidden"
                      }`}
                    >
                      <FormLabel className="block text-center text-lg font-semibold">
                        {confirmed
                          ? "Deja tu mensaje:"
                          : "¿Por qué no puedes asistir?"}
                        <span className="font-normal">(Opcional):</span>
                      </FormLabel>
                      <FormControl className="flex justify-center w-full">
                        <Textarea
                          {...field}
                          onChange={(e) => handleMessageChange(e)}
                          placeholder=""
                          className=" text-base"
                        />
                      </FormControl>
                      <div className="text-right w-full text-sm text-gray-500">
                        {messageLength}/{MAX_MESSAGE_LENGTH}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={confirmed === null}
                  className=""
                  type="submit"
                >
                  Enviar
                </Button>
              </form>
            </Form>
          </div>
        )}
      </div>
    </SimpleModal>
  );
};
