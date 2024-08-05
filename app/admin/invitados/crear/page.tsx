import { Card } from "@/components/ui/card";
import { db } from "@/lib/db";
import { AddGuestForm } from "../_components/add-guest-form";

const CreateGuestPage = async () => {
  return (
    <Card>
      <AddGuestForm />
    </Card>
  );
};

export default CreateGuestPage;
