import { Select as RadixComponent } from "@radix-ui/themes";

export interface SelectProps<ItemValue extends string> {
  defaultValue?: string;
  items: Array<{ label: string; value: ItemValue }>;
  onChange: (value: ItemValue) => void;
  value: ItemValue | undefined;
}

export const Select = <ItemValue extends string>({
  defaultValue,
  onChange,
  items,
  value
}: SelectProps<ItemValue>) => {
  return (
    <RadixComponent.Root
      defaultValue={defaultValue}
      onValueChange={onChange}
      value={value}
    >
      <RadixComponent.Trigger
        style={{ flex: 1, paddingBottom: "3px", paddingTop: "3px" }}
      />
      <RadixComponent.Content>
        {items.map((item) => (
          <RadixComponent.Item key={item.value} value={item.value}>
            {item.label}
          </RadixComponent.Item>
        ))}
      </RadixComponent.Content>
    </RadixComponent.Root>
  );
};
