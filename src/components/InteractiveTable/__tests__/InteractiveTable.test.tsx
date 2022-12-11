import { clickElement, render, screen } from "setupTests";

import { InteractiveTable } from "../";

const columns = [
  {
    id: 0,
    label: "First Column",
    path: "name",
  },
];

const firstRowData = {
  id: 0,
  name: "Test Name",
};

const data = [firstRowData];

describe("InteractiveTable", () => {
  it("should render InteractiveTable component by path", () => {
    const { asFragment } = render(
      <InteractiveTable columns={columns} data={data} onRowClick={jest.fn()} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render InteractiveTable component by content", () => {
    const columns = [
      {
        id: 0,
        label: "First Column",
        content: (item: any) => "name - " + item.name,
      },
    ];
    const { asFragment } = render(
      <InteractiveTable columns={columns} data={data} onRowClick={jest.fn()} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render InteractiveTable with active row", () => {
    const secondRowData = {
      id: 1,
      name: "Other Name",
    };
    const twoRowsData = [...data, secondRowData];
    const isActive = (item: any) => item === secondRowData;

    const { asFragment } = render(
      <InteractiveTable
        columns={columns}
        data={twoRowsData}
        isActive={isActive}
        onRowClick={jest.fn()}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  describe("When table row is clicked", () => {
    it("should call given onRowClick", async () => {
      const onRowClick = jest.fn();
      const { user } = render(
        <InteractiveTable
          columns={columns}
          data={data}
          onRowClick={onRowClick}
        />
      );

      const tableRow = screen.getAllByRole("row")[1];
      await clickElement(user, tableRow);
      expect(onRowClick).toBeCalledWith(firstRowData);
    });
  });
});
