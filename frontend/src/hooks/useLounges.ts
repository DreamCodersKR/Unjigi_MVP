import { useQuery } from "@tanstack/react-query";
import { getLounges } from "@/api/lounges";

export function useLounges() {
  return useQuery({
    queryKey: ["lounges"],
    queryFn: getLounges,
    enabled: false,
  });
}