import { render, screen, waitFor } from "@testing-library/react";
import List from "../components/list";
import api from "../utils/api";
import { mockData } from "../utils/constants";
import Card from "../components/list/card";

jest.mock("../utils/api");

jest.mock("../components/list/card");

describe("List bileşen testleri", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("api'den cevap gelmediğinde ekranda Loader vardır.", async () => {
    api.get.mockResolvedValueOnce({ data: [] });
    render(<List />);

    screen.getByTestId("list-loader");

    await waitFor(() => {
      expect(screen.queryByTestId("list-loader")).toBeNull();
    });
  });

  it("api'den error cevabı gelince ekranda Error vardır.", async () => {
    const errMsg = "başlantı sorunu";
    api.get.mockRejectedValueOnce(new Error(errMsg));

    render(<List />);

    await waitFor(() => {
      screen.getByTestId("error");
    });
  });

  it("api'den başarılı cevap gelince ekranda Card lar vardır.", async () => {
    Card.mockImplementation(({ item }) => <div>{item.name}</div>);

    api.get.mockResolvedValueOnce({ data: mockData });

    render(<List />);

    await waitFor(() => {
      mockData.forEach((item) => {
        screen.getByText(item.name);
      });
    });
  });
});
