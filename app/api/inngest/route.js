import { serve } from "inngest/next";
import { helloWorld } from "@/lib/inngest/funtion";
import { inngest } from "../../../lib/inngest/client";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    helloWorld,
  ],
});
