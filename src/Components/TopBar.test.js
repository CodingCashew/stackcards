import { screen, render, getByTestId } from "@testing-library/react";
import "@testing-library/jest-dom";
import TopBar from "./TopBar";
import "@testing-library/jest-dom/extend-expect";

test("renders the TopBar", () => {
  render(<TopBar />);
  screen.debug();
});

test("renders TopBar with correct styling", () => {
  render(<TopBar />);
  expect(getByTestId("topbar")).toHaveStyle(`bgColor="pink1"`);
});
