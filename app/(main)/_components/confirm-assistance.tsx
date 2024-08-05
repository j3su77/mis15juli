import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import confetti from "canvas-confetti";
import { Guest } from "@prisma/client";
import { toast } from "@/components/ui/use-toast";
import { SimpleModal } from "@/components/simple-modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Toggle } from "@/components/ui/toggle";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const MAX_MESSAGE_LENGTH = 200;

const formSchema = z.object({
  // message: z.string().max(MAX_MESSAGE_LENGTH).optional(),
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
  const [guestData, setGuestData] = useState<Guest>(guest);

  useEffect(() => {
    setOpenModal(confirmAssistance);
  }, [confirmAssistance]);

  useEffect(() => {
    if (guestData.hasResponded && guestData.confirmed) startConffeti();
  }, [guestData]);

  // const [messageLength, setMessageLength] = useState(
  //   guestData.message?.length || 0
  // );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      confirmed: guestData.confirmed || null,
      // message: guestData.message || "",
    },
  });

  const { watch, setValue } = form;
  const confirmed = watch("confirmed");

  const handleToggle = (value: boolean) => {
    setValue("confirmed", value);
  };

  // const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
  //   const value = e.target.value;
  //   if (value.length <= MAX_MESSAGE_LENGTH) {
  //     setValue("message", value);
  //     // setMessageLength(value.length);
  //   }
  // };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { data } = await axios.post("/api/confirm", {
        guestId: guestData.id,
        confirmed: values.confirmed,
        // message: values.message,
      });
      toast({
        description: "Gracias por responder",
      });
      setGuestData(data);
      if (data.hasResponded) {
        setOpenModal(true);
        startConffeti();
      }
    } catch (error) {
      console.error("Error confirming attendance:", error);
      toast({
        description: "Ocurrió un error, por favor inténtelo nuevamente",
      });
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

    confetti({ ...defaults, particleCount: 100 });
    confetti({ ...defaults, particleCount: 75 });
    confetti({ ...defaults, particleCount: 30 });
  };

  return (
    <SimpleModal
      openDefault={openModal}
      title={
        !!guestData.hasResponded
          ? guestData.confirmed
            ? "¡Que genial 😁!"
            : "¡Hola!"
          : ""
      }
      large={!guestData.hasResponded}
      btnClass="hidden"
      notClose={!guestData.hasResponded}
      onClose={onClose}
    >
      <div>
        {!!guestData.hasResponded ? (
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-3 items-center justify-center w-full space-y-8"
              >
                <h2 className="text-xl font-bold">
                  {!guestData.confirmed && (
                    <div>
                      Hola {guestData.firstName}{" "}
                      {guestData.lastName}, aunque no puedas asistir a mi
                      fiesta, sabes que te quiero mucho 😘
                      <span className="mt-5 block">con mucho cariño</span>
                      <span className="mt-2 block font-bold">Julianis❤️</span>
                    </div>
                  )}
                </h2>

                {guestData.confirmed && (
                  <>
                  <div>
                    Hola {guestData.firstName}{" "}
                    {guestData.lastName}, gracias por confirmar tu asistencia a
                    mi fiesta de 15, te espero.
                  </div>
                   
             
                  </>
                )}
              </form>
            </Form>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-center">
              Hola {guestData.firstName}{" "}
              {guestData.lastName}, queremos invitarte a mi fiesta de 15 años
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
