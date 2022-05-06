import { useMemo } from "react";
import { useModalImg } from "../../providers/ModalImg/useModalImg";
import Create from "./Create";

export const CreateContainer = () => {
  const { show } = useModalImg();
  return useMemo(() => <Create show={show} />, [])// eslint-disable-line react-hooks/exhaustive-deps
}