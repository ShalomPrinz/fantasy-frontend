interface TableColumn {
  id: number;
  label: string;
  labelComponent?: JSX.Element;
  path?: string;
  content?: Function;
}

export { TableColumn };
