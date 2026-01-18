import { Button } from "@/components/ui/button";
import { MdOutlineLocalPostOffice } from "react-icons/md";


type Props = {
  onNewClick: () => void;
};

export default function InvitationHeader({ onNewClick }: Props) {
  return (
    <div className="flex items-center justify-between  p-3 bg-grey-50 rounded-md shadow">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <MdOutlineLocalPostOffice className="text-2xl mt-1" />
        Invitations
      </h1>

      <Button onClick={onNewClick}>
        + New Invitation
      </Button>
    </div>
  );
}