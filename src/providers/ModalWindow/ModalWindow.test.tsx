import { fireEvent, render } from "@testing-library/react";
import { ModalWindowProvider, useModalWindow } from "./modal";

const AlertTest = () => {
  const { show } = useModalWindow();

  const close = () => {
    show({
      onApply: async (value) => {

      },
      title: "title",
      dialogText: "dialogText",
      buttons: ["Отмена", "Сохранить"]
    });
  }

  return <button onClick={close}>Open</button>
}
describe("ModalImg", () => {
  it("", () => {

    const component = render(<ModalWindowProvider>
      <AlertTest />
    </ModalWindowProvider>)

    const button = component.getByText("Open");
    fireEvent.click(button)


    const save = component.getByText("Сохранить");
    fireEvent.click(save)

  })
})