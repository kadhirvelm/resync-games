import { getAvailableServiceCallers } from "./getServices";

export const ServiceCallers = getAvailableServiceCallers(
  process.env.NEXT_PUBLIC_API_URL ?? ""
);
export const ClientServiceCallers = getAvailableServiceCallers(
  process.env.NEXT_PUBLIC_API_CLIENT_URL ?? ""
);
