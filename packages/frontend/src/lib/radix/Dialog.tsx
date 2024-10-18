import { Dialog as RadixDialog } from "@radix-ui/themes";
import { Flex } from "./Flex";
import { Button } from "./Button";

export const Dialog = ({
  trigger,
  title,
  confirmText,
  onConfirm,
  description,
  open,
  children
}: {
  children: React.ReactNode;
  confirmText?: string;
  description?: string;
  onConfirm: () => void;
  open?: boolean;
  title: string;
  trigger?: React.ReactNode;
}) => {
  return (
    <RadixDialog.Root open={open}>
      {trigger !== undefined && (
        <RadixDialog.Trigger>{trigger}</RadixDialog.Trigger>
      )}
      <RadixDialog.Content>
        <RadixDialog.Title>{title}</RadixDialog.Title>
        <RadixDialog.Description>{description}</RadixDialog.Description>
        {children}
        <Flex justify="end">
          <Flex gap="2">
            <RadixDialog.Close>
              <Button color="gray" variant="soft">
                Cancel
              </Button>
            </RadixDialog.Close>
            <RadixDialog.Close>
              <Button onClick={onConfirm}>{confirmText ?? "Save"}</Button>
            </RadixDialog.Close>
          </Flex>
        </Flex>
      </RadixDialog.Content>
    </RadixDialog.Root>
  );
};
