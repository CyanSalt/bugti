export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
      secondary: 'cyan',
      accent: 'orange',
      success: 'green',
      info: 'sky',
      warning: 'amber',
      error: 'red',
      planner: 'blue',
      practitioner: 'cyan',
      pioneer: 'orange',
      guardian: 'teal',
      neutral: 'slate',
    },
    button: {
      compoundVariants: [
        {
          color: 'primary',
          variant: 'solid',
          class: 'hover:bg-[var(--ui-primary-hover)] active:bg-[var(--ui-primary-hover)]',
        },
        {
          color: 'primary',
          variant: 'link',
          class: 'hover:text-[var(--ui-primary-hover)] active:text-[var(--ui-primary-hover)]',
        },
      ],
    },
    pageHeader: {
      slots: {
        title: 'text-balance leading-tight',
        description: 'max-w-[65ch] text-base/7 text-pretty',
      },
    },
    pageCard: {
      slots: {
        title: 'text-balance',
        description: 'text-base/7 text-pretty',
      },
    },
    radioGroup: {
      slots: {
        base: 'ring-neutral-500 dark:ring-neutral-400',
      },
    },
  },
})
