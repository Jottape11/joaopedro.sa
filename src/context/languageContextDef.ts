import { createContext } from 'react'

export type Language = 'pt' | 'en'

export interface Translations {
  nav: {
    home: string
    projects: string
    about: string
    contact: string
    dashboard: string
    searchPlaceholder: string
    switchProfile: string
    signOut: string
    signIn: string
    studioAccount: string
  }
  auth: {
    signInTab: string
    signUpTab: string
    whosWatchingTab: string
    signInTitle: string
    signInSubtitle: string
    signUpTitle: string
    signUpSubtitle: string
    nameLabel: string
    emailLabel: string
    passwordLabel: string
    confirmPasswordLabel: string
    rememberMe: string
    signInButton: string
    signUpButton: string
    authenticating: string
    creatingAccount: string
    demoButton: string
    guestButton: string
    alreadyHaveAccount: string
    dontHaveAccount: string
    signUpNow: string
    signInNow: string
    baasProvider: string
    supabaseCloud: string
    demoMode: string
    backToHome: string
    passwordMismatch: string
    accountCreatedSuccess: string
  }
  profiles: {
    title: string
    subtitle: string
    manageButton: string
    doneButton: string
    clickToEnter: string
    list: {
      recruiter: {
        title: string
        subtitle: string
        badge: string
      }
      engineer: {
        title: string
        subtitle: string
        badge: string
      }
      fiap: {
        title: string
        subtitle: string
        badge: string
      }
      admin: {
        title: string
        subtitle: string
        badge: string
      }
      guest: {
        title: string
        subtitle: string
        badge: string
      }
    }
  }
  hero: {
    originalBadge: string
    match: string
    exploreButton: string
    moreInfoButton: string
    soundOn: string
    soundOff: string
    loading: string
    liveProduction: string
  }
  rails: {
    top10Title: string
    top10Subtitle: string
    popularTitle: string
    popularSubtitle: string
    backendTitle: string
    backendSubtitle: string
    frontendTitle: string
    frontendSubtitle: string
    viewAll: string
  }
  modal: {
    architecture: string
    specs: string
    openGithub: string
    fullPage: string
    stars: string
    forks: string
    license: string
    mainLanguage: string
    lastUpdate: string
    close: string
    originalProject: string
  }
  footer: {
    questions: string
    serviceCode: string
    copyright: string
    columns: {
      col1Title: string
      col2Title: string
      col3Title: string
      col4Title: string
    }
  }
  theme: {
    toggle: string
    light: string
    dark: string
  }
  lang: {
    label: string
    pt: string
    en: string
  }
  contact: {
    badge: string
    title: string
    subtitle: string
    nameLabel: string
    namePlaceholder: string
    emailLabel: string
    emailPlaceholder: string
    subjectLabel: string
    subjectPlaceholder: string
    messageLabel: string
    messagePlaceholder: string
    minChars: string
    sendButton: string
    sendingButton: string
    successMessage: string
    directChannelsTitle: string
    directChannelsSubtitle: string
    githubCard: string
    linkedinCard: string
    emailCard: string
    locationCard: string
    securityNote: string
  }
  dashboard: {
    studioBadge: string
    title: string
    subtitle: string
    cloudStatus: string
    localStatus: string
    signOut: string
    statsTotalRepos: string
    statsFeatured: string
    statsTotalMessages: string
    statsPending: string
    tabMessages: string
    tabFeatured: string
    filterAll: string
    filterUnread: string
    filterReplied: string
    emptyMessagesTitle: string
    emptyMessagesDesc: string
    markReplied: string
    markUnread: string
    deleteMsg: string
    statusPending: string
    statusReplied: string
    curationTitle: string
    curationSubtitle: string
    searchRepoPlaceholder: string
    maxLimitReached: string
    viewOnGithub: string
    featuredBadge: string
    addToFeatured: string
    removeFromFeatured: string
  }
  about: {
    badge: string
    title: string
    subtitle: string
    role: string
    university: string
    continueToCatalog: string
    greetingFor: string
    skillsTitle: string
    bioParagraph1: string
    bioParagraph2: string
    profileNotes: {
      recruiter: string
      engineer: string
      fiap: string
      admin: string
      guest: string
    }
  }
}

export interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
  t: Translations
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

