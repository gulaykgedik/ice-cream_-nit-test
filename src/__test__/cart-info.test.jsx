import { render, screen } from "@testing-library/react";
import CartInfo from "../components/modal/cart-info";
import { useDispatch } from "react-redux";
import userEvent, { userEvent } from "@testing-library/user-event";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

describe("CartInfo component", () => {
  const dispatchMock = jest.fn();
  beforeEach(() => {
    useDispatch.mockReturnValue(dispatchMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Ara Toplam,kargo,toplam değerleri doğru şekilde renderlanır", () => {
    const cart = [
      { id: 1, name: "Vanilya", price: 25, amount: 2 },
      { id: 2, name: "Çikolata", price: 30, amount: 1 },
    ];

    const close = jest.fn();

    render(<CartInfo cart={cart} close={close} />);

    expect(screen.getByTestId("subtotal")).toHaveTextContent("80$");

    expect(screen.getByTestId("shipping")).toHaveTextContent("20$");

    expect(screen.getByTestId("total")).toHaveTextContent("100$");
  });

  test("sipariş ver butonuna tıklandığında aksiyon tetiklenir", async () => {
    const user = userEvent.setup();

    const close = jest.fn();

    const cart = [
      { id: 1, name: "Vanilya", price: 25, amount: 2 },
      { id: 2, name: "Çikolata", price: 30, amount: 1 },
    ];

    render(<CartInfo cart={cart} close={close} />);

    const button = screen.getByRole("button");

    await user.click(button);

    expect(dispatchMock).toHaveBeenCalled();

    expect(close).toHaveBeenCalled();
  });

  test("hiç ürün yoksa sipariş butonu inaktiftir", () => {
    const cart = [];

    const close = jest.fn();

    render(<CartInfo cart={cart} close={close} />);

    const button = screen.getByRole("button");

    expect(button).toBeDisabled();
  });

  test("toplam 100$ üzerinde kargo ücretsiz olur", () => {
    const cart = [
      { id: 1, name: "Vanilya", price: 25, amount: 4 },
      { id: 2, name: "Çikolata", price: 30, amount: 1 },
    ];

    const close = jest.fn();

    render(<CartInfo cart={cart} close={close} />);

    expect(screen.getByTestId("shipping")).toHaveTextContent("Ücretsiz");
  });
});
