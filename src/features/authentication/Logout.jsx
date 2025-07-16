import { useLogout } from "./useLogout";

import ButtonIcon from "@/ui/ButtonIcon";
import SpinnerMini from "@/ui/SpinnerMini";

import { HiArrowRightOnRectangle } from "react-icons/hi2";

function Logout() {
  const { isPending, logout } = useLogout();
  return (
    <ButtonIcon onClick={logout} disabled={isPending}>
      {!isPending ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
