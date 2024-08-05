import { Card } from "@/components/ui/card";
import { db } from "@/lib/db";
import { AddGuestForm } from "../../_components/add-guest-form";

const EditCityPage = async ({ params }: { params: { guestId: string } }) => {
  const guest = await db.guest.findUnique({
    where: {
      id: params.guestId,
      active: true,
    },
  });

  if (!guest) {
    return <div>Invitado no encontrada</div>;
  }

  return (
    <Card>
      {guest ? (
        <AddGuestForm guest={guest} />
      ) : (
        <div>Invitado no encontrada</div>
      )}
    </Card>
  );
};

export default EditCityPage;
