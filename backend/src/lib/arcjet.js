import arcjet, {
  shield,
  detectBot,
  slidingWindow,
} from "@arcjet/node";

import { ENV } from "./env.js";

const aj = arcjet({
  key: ENV.ARCJET_KEY,

  rules: [
    shield({
      mode: "LIVE",
    }),

    detectBot({
      mode: "DRY_RUN",
      allow: [
        "CATEGORY:SEARCH_ENGINE",
      ],
    }),

    slidingWindow({
      mode: "LIVE",
      max: 100,
      interval: "60s",
    }),
  ],
});

export default aj;