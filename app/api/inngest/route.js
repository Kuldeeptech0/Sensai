import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";
import { helloWorld } from "@/lib/inngest/function";
//Create ab Api that serves zero function

export const { GET, POST , PUT } =serve({
    client: inngest,
    functions: [
        helloWorld,
        ],
});