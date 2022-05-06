import { fireEvent, queryByAttribute, render, screen } from "@testing-library/react";
import { ModalImgProvider, useModalImg } from "./useModalImg";
const AlertTest = () => {
  const { show } = useModalImg();

  const close = () => {
    show({
      src: ""
    });
  }

  return <button onClick={close}>Open</button>
}
const getByClass = queryByAttribute.bind(null, 'class');
describe("ModalImg", () => {
  it("", () => {

    const component = render(<ModalImgProvider>
      <AlertTest />
    </ModalImgProvider>)

    const button = component.getByText("Open");
    fireEvent.click(button)

    const close = getByClass(component.container, "close") as HTMLElement;
    const modal = getByClass(component.container, "modal") as HTMLElement;
    fireEvent.click(close)
    fireEvent.click(modal)
  })
})