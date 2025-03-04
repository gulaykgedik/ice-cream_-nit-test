import { render, screen } from "@testing-library/react";
import Modal from "../components/modal";
import { useSelector } from "react-redux";
import CartInfo from "../components/modal/cart-info";
import CartItem from "../components/modal/cart-item";
import userEvent from "@testing-library/user-event";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

jest.mock("../components/modal/cart-item", () => () => <h1>Cart Item</h1>);

jest.mock("../components/modal/cart-info", () => () => <h1>Cart Info</h1>);

describe("Modal companent", () => {
  const closeMock = jest.fn();

  it("isOpen propuna göre modal ekrana basılır", () => {
    useSelector.mockReturnValue({ cart: [] });

    const { rerender } = render(<Modal isOpen={false} close={closeMock} />);

    expect(screen.queryByTestId("modal")).toBeNull();

    rerender(<Modal isOpen={true} close={closeMock} />);

    screen.getByTestId("modal");
  });

  it("X butonuna tıklanınca close fonksiyonu çalışır", async () => {
    useSelector.mockReturnValue({ cart: [] });

    const user = userEvent.setup();

    render(<Modal isOpen={true} close={closeMock} />);

    const closeBtn = screen.getByTestId("close");

    await user.click(closeBtn);

    expect(closeMock).toHaveBeenCalled();
  });

  it("Sepetin doluluk durumuna göre ekrana uyarı basılır", () => {
    useSelector.mockReturnValue({ cart: [] });

    const { rerender } = render(<Modal isOpen={true} close={closeMock} />);

    screen.getByText(/henüz/i);

    useSelector.mockReturnValue({ cart: [1, 2, 3, 4] });

    rerender(<Modal isOpen={true} close={closeMock} />);

    expect(screen.queryByText(/henüz/i)).toBeNull();
  });

  it("Sepet dolu ise her bir eleman için ekrana kart basılır", () => {
    useSelector.mockReturnValue({ cart: [1, 2, 3, 4] });

    render(<Modal isOpen={true} close={closeMock} />);

    const items = screen.getAllByRole("heading", { name: "Cart Item" });

    expect(items.length).toBe(4);
  });
});
