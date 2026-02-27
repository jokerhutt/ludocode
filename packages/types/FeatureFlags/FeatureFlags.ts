export type ActiveFeaturesResponse = {
  isAIEnabled: boolean;
  isGcsEnabled: boolean;
  isPistonEnabled: boolean;
  isDemoEnabled: boolean;
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
  isDemoEnabled: {
    env: "DEMO_ENABLED",
    title: "Demo Login",
    description: "The Demo login process requires that the demo flag be enabled.",
  },
  isAdminEnabled: {
    env: "SPRING_PROFILES_ACTIVE=admin",
    title: "Enable Admin to use misc.",
    description: ""
  }
};