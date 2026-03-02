export type ActiveFeaturesResponse = {
  isAIEnabled: boolean;
  isGcsEnabled: boolean;
  isPistonEnabled: boolean;
  paymentsEnabled: boolean;
  stripeMode: "PROD" | "DEV_UNLIMITED" | "FREE_ONLY";
  authMode: "FIREBASE" | "DEMO"
  isAdminEnabled: boolean;
};

export type FeatureMeta = {
  env: string;
  title: string;
  description: string;
  docsUrl?: string;
  icon?: React.ReactNode;
};

export const FEATURE_META: Record<keyof ActiveFeaturesResponse, FeatureMeta> = {
  isAIEnabled: {
    env: "AI_ENABLED",
    title: "AI Assistant",
    description: "Without the AI feature enabled, the chatbot is unavailable",
  },
  isGcsEnabled: {
    env: "GCS_ENABLED",
    title: "Google Cloud Storage",
    description: "The Projects pages requires a Google Cloud Storage set up.",
  },
  isPistonEnabled: {
    env: "PISTON_ENABLED",
    title: "Coding Playground",
    description: "Running Code requires the Piston API enabled.",
  },
  authMode: {
    env: "",
    title: "",
    description: ""
  },
  isAdminEnabled: {
    env: "SPRING_PROFILES_ACTIVE=admin",
    title: "Enable Admin to use misc.",
    description: "",
  },
  paymentsEnabled: {
    env: "STRIPE_ENABLED=true",
    title: "Enable tripe to use payments",
    description: "",
  },
  stripeMode: {
    env: "",
    title: "",
    description: "",
  },
};
