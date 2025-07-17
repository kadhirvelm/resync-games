import { Dialog as RadixDialog } from "@radix-ui/themes";
import { Flex } from "./Flex";
import { Button } from "./Button";

export const Dialog = ({
  trigger,
  defaultOpen,
  canExit = true,
  title,
  confirmText,
  onConfirm,
  description,
  open,
  isLoading,
  children,
  onOpenChange
}: {
  canExit?: boolean;
  children: React.ReactNode;
  confirmText?: string;
  defaultOpen?: boolean;
  description?: string;
  isLoading?: boolean;
  onConfirm?: () => void;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  title: string;
  trigger?: React.ReactNode;
}) => {
  return (
    <RadixDialog.Root
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      open={canExit ? open : true}
    >
      {trigger !== undefined && (
        <RadixDialog.Trigger>{trigger}</RadixDialog.Trigger>
      )}
      <RadixDialog.Content>
        <RadixDialog.Title>{title}</RadixDialog.Title>
        <RadixDialog.Description>{description}</RadixDialog.Description>
        {children}
        <Flex justify="end">
          <Flex gap="2">
            {canExit && (
              <RadixDialog.Close>
                <Button color="gray" variant="soft">
                  Cancel
                </Button>
              </RadixDialog.Close>
            )}
            <RadixDialog.Close>
              <Button loading={isLoading} onClick={onConfirm}>
                {confirmText ?? "Save"}
              </Button>
            </RadixDialog.Close>
          </Flex>
        </Flex>
      </RadixDialog.Content>
    </RadixDialog.Root>
  );
};
