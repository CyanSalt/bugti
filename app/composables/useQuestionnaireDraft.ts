import { isQuestionnaireDraft, questions, questionnaireVersion } from '~/data/questionnaire'
import type { QuestionnaireDraft } from '~/data/questionnaire'

const storageKey = `bugti-draft-${questionnaireVersion}`

function emptyDraft(): QuestionnaireDraft {
  return { version: questionnaireVersion, answers: questions.map(() => null), step: 0, started: false }
}

export function useQuestionnaireDraft() {
  const draft = useState<QuestionnaireDraft>(`questionnaire-draft-${questionnaireVersion}`, emptyDraft)
  const ready = ref(false)
  const storageAvailable = ref(true)

  onMounted(() => {
    try {
      const saved = sessionStorage.getItem(storageKey)
      if (saved) {
        const parsed: unknown = JSON.parse(saved)
        if (isQuestionnaireDraft(parsed)) draft.value = parsed
      }
    }
    catch {
      storageAvailable.value = false
    }
    ready.value = true
  })

  watch(draft, (value) => {
    if (!ready.value) return
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(value))
    }
    catch {
      storageAvailable.value = false
    }
  }, { deep: true, flush: 'sync' })

  function reset() {
    draft.value = emptyDraft()
  }

  return { draft, ready, storageAvailable, reset }
}
