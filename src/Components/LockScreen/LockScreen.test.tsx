import { configure, mount } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { LockScreen } from "./LockScreen";

configure({ adapter: new Adapter() });

describe("LockScreen", () => {
  let component: any;

  it("", () => {
    component = mount(<LockScreen />);
  });
});