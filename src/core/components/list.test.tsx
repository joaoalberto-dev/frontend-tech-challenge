import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";
import { List } from "./list";

describe("List", () => {
  test("renders items using the provided renderItem function", () => {
    const testItems = ["Item 1", "Item 2", "Item 3"];
    const renderItem = (item: string) => <div key={item}>{item}</div>;
    const screen = render(<List items={testItems} renderItem={renderItem} />);

    testItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  test("renders empty grid when no items provided", () => {
    const renderItem = (item: string) => <div key={item}>{item}</div>;
    const { container } = render(<List items={[]} renderItem={renderItem} />);

    expect(container.firstChild?.childNodes.length).toBe(0);
  });

  test("works with complex item types", () => {
    interface TestItem {
      id: number;
      name: string;
    }

    const testItems: TestItem[] = [
      { id: 1, name: "First" },
      { id: 2, name: "Second" },
    ];

    const renderItem = (item: TestItem) => (
      <div key={item.id} data-testid={`item-${item.id}`}>
        {item.name}
      </div>
    );

    const screen = render(
      <List<TestItem> items={testItems} renderItem={renderItem} />
    );

    testItems.forEach((item) => {
      expect(screen.getByTestId(`item-${item.id}`)).toHaveTextContent(
        item.name
      );
    });
  });
});
