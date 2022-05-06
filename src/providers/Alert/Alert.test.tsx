import { fireEvent, queryByAttribute, render, screen } from "@testing-library/react";
import { ModalAlertProvider, useModalAlert } from "./modal";

const AlertTest = () => {
  const { show } = useModalAlert();

  const close = () => {
    show({
      title: "",
      variant: "",
      dialogText: ``
    });
  }

  return <button onClick={close}>Open</button>
}
const getByClass = queryByAttribute.bind(null, 'class');
describe("Alert", () => {
  it("refresh Success", () => {

    const component = render(<ModalAlertProvider>
      <AlertTest />
    </ModalAlertProvider>)

    const button = component.getByText("Open");
    fireEvent.click(button)

    const close = getByClass(component.container, "btn-close") as HTMLElement;

    fireEvent.click(close)
  })
})