import { useRouter } from "next/navigation";
import { Button, ButtonProps } from "../radix/Button";
import { useState } from "react";

export interface NavigationButtonProps extends ButtonProps {
  href: string;
}

export const NavigationButton = ({ href, ...props }: NavigationButtonProps) => {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const navigate = () => {
    setIsNavigating(true);
    router.push(href);
  };

  return <Button {...props} loading={isNavigating} onClick={navigate} />;
};
