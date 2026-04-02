/**
 * Single source of truth for all `data-testid` values.
 * Import from both React components and Playwright tests
 * to keep IDs in sync and prevent divergence.
 */

export const testIds = {
    // ── Auth ──────────────────────────────────────────────
    auth: {
        registerTos: "register-tos",
    },

    // ── Onboarding ────────────────────────────────────────
    onboarding: {
        usernameInput: "username-input",
        career: (choice: string) => `onb-career-${choice}`,
        course: (id: string) => `onb-course-${id}`,
        experience: (value: boolean) => `onb-exp-${value}`,
    },

    // ── Navigation ────────────────────────────────────────
    nav: {
        button: (prefix: string, name: string) => `nav-button-${prefix}-${name}`,
    },

    // ── Module path ───────────────────────────────────────
    path: {
        button: (lessonId: string) => `path-button-${lessonId}`,
        popoverButton: (lessonId: string) => `path-popover-button-${lessonId}`,
    },

    // ── Lesson ────────────────────────────────────────────
    lesson: {
        submitButton: "lesson-submit-button",
        submitText: "lesson-submit-text",
        backButton: "lesson-back-button",
        audioToggleButton: "lesson-audio-toggle-button",
        aiButton: "lesson-ai-button",
        feedbackButton: "exercise-feedback-button",
        discussionButton: "exercise-discussion-button",
    },

    // ── Guided lesson ─────────────────────────────────────
    guided: {
        runCodeButton: "guided-run-code-button",
        asideLeft: "guided-project-aside-left",
    },

    // ── Exercise options ──────────────────────────────────
    exercise: {
        option: (content: string) => `exercise-option-${content}`,
        optionWide: (content: string) => `exercise-option-wide-${content}`,
    },

    // ── Completion ────────────────────────────────────────
    completion: {
        button: "completion-button",
        coins: "completion-coins",
        accuracy: "completion-accuracy",
        streakText: "streak-complete-text",
        courseCompleteHeader: "course-complete-header",
        courseCompleteCongratulation: "course-complete-congratulation",
        courseCompleteBadgeText: "course-complete-badge-text",
    },

    // ── Project hub ───────────────────────────────────────
    projectHub: {
        card: "project-hub-card",
        limits: "project-limits",
        createTemplate: (key: string) => `create-project-template-${key}`,
        upgradeLimitButton: "upgrade-project-limit-button",
    },

    // ── Project workbench ─────────────────────────────────
    project: {
        asideLeft: "project-aside-left",
        runner: "project-runner",
        clearOutput: "clear-output-icon",
        livePreview: "live-preview-frame",
        stdinInput: "runner-stdin-input",
        runCodeButton: "run-code-button",
        openFilePopover: "open-file-popover-icon",
        newFileButton: "new-file-button",
        newFileButtonLang: (lang: string) => `new-file-button-${lang}`,
        treeFile: (path: string) => `tree-file-${path}`,
        cloudIcon: (status: string) => `project-cloud-icon-${status}`,
    },

    // ── Subscription ──────────────────────────────────────
    subscription: {
        compare: (tier: string) => `sub-compare-${tier}`,
    },

    // ── Design system primitives ──────────────────────────
    select: {
        trigger: "select-trigger",
    },
} as const;
