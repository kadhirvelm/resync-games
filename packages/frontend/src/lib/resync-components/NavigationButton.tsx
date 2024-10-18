import { useRouter } from "next/navigation";
import { Button, ButtonProps } from "../radix/Button";
import { useState } from "react";

export interface NavigationButtonProps extends ButtonProps {
  href: string;
  onNavigation?: () => Promise<void>;
}

export const NavigationButton = ({
  href,
  onNavigation,
  ...props
}: NavigationButtonProps) => {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const navigate = async () => {
    setIsNavigating(true);

    try {
      await onNavigation?.();
      router.push(href);
    } catch (error) {
      console.error(`Failed to navigate to ${href}`, error);
      setIsNavigating(false);
    }
  };

  return <Button {...props} loading={isNavigating} onClick={navigate} />;
};
