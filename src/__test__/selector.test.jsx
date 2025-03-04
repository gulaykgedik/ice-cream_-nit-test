import { render, screen } from "@testing-library/react";
import Selector from "../components/list/selector";
import userEvent from "@testing-library/user-event";

const mockFn = jest.fn();

describe("Selector bileşeni", () => {
  it("Cornet seçilince butonun arkaplanı değişir", () => {
    render(<Selector selectedType="cornet" handleType={() => {}} />);

    const cornetBtn = screen.getByRole("button", { name: /Külahta/i });

    expect(cornetBtn).toHaveClass("bg-white text-black");

    const cupBtn = screen.getByRole("button", { name: /Bardakta/i });

    expect(cupBtn).not.toHaveClass("bg-white text-black");
  });

  it("Cup seçilince butonun arkaplanı değişir", () => {
    render(<Selector selectedType="cup" handleType={() => {}} />);

    const cornetBtn = screen.getByRole("button", { name: /Külahta/i });

    expect(cornetBtn).not.toHaveClass("bg-white text-black");

    const cupBtn = screen.getByRole("button", { name: /Bardakta/i });

    expect(cupBtn).toHaveClass("bg-white text-black");
  });

  it("Butona tıklanınca fonksiyon doğru parametrelerle çalışır", async () => {
    //userEvent i kur
    const user = userEvent.setup();

    render(<Selector Selector selectedType={null} handleType={mockFn} />);

    const cupBtn = screen.getByRole("button", { name: /Bardakta/i });

    const cornetBtn = screen.getByRole("button", { name: /Külahta/i });

    // bardakta butonuna tıkla
    await user.click(cupBtn);

    expect(mockFn).toHaveBeenCalledWith("cup");

    await user.click(cornetBtn);

    expect(mockFn).toHaveBeenCalledWith("cornet");
  });
});
