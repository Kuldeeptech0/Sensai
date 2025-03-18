import { serve } from "inngest/next";
import { generateIndustryInsights, helloWorld } from "@/lib/inngest/funtion";
import { inngest } from "../../../lib/inngest/client";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    // Your functions will be automatically loaded here
    generateIndustryInsights,
  ],
});
