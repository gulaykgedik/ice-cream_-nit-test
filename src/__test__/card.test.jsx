import { render, screen } from "@testing-library/react";
import Card from "../components/list/card";
import { useDispatch } from "react-redux";
import { mockData } from "../utils/constants";
import userEvent from "@testing-library/user-event";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

describe("Card", () => {
  const dispatchMock = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(dispatchMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it("İtem propuna göre detaylar doğru şekilde ekrana basılır", () => {
    render(<Card item={mockData[0]} />);

    screen.getByRole("heading", { name: "Bal Badem" });
    screen.getByText("$ 25 / top");

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "/ice-1.png");
  });
  it("Tipin seçili olma durumuna göre buton görünürlüğü değişir", async () => {
    render(<Card item={mockData[0]} />);

    const basketBtn = screen.getByRole("button", { name: /sepete/i });

    expect(basketBtn).toHaveClass("invisible");

    const cornetBtn = screen.getByRole("button", { name: /külahta/i });

    await userEvent.click(cornetBtn);

    expect(basketBtn).not.toHaveClass("invisible");

    await userEvent.click(cornetBtn);

    expect(basketBtn).toHaveClass("invisible");
  });
  it("Sepete Ekle butonuna tıklanınca aksiyon dispatch edilir", () => {});
});
