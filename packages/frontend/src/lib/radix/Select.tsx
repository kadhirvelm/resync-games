import { Select as RadixComponent } from "@radix-ui/themes";

export interface SelectProps {
  defaultValue?: string;
  items: Array<{ label: string; value: string }>;
  onChange: (value: string) => void;
  value: string;
}

export const Select = ({
  defaultValue,
  onChange,
  items,
  value
}: SelectProps) => {
  return (
    <RadixComponent.Root
      defaultValue={defaultValue}
      onValueChange={onChange}
      value={value}
    >
      <RadixComponent.Trigger style={{ flex: 1 }} />
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
