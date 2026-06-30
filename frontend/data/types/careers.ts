export interface JobApplication {
  firstName: string
  lastName: string
  email: string
  phone?: string
  availability?: string
  message?: string
  jobTitle: string
  jobId: string
}

export interface ZodFormState {
  data: unknown
  success: boolean
  message: string
  zodErrors?: Record<string, string[] | undefined>
  strapiErrors?: unknown
}

export const ZOD_FORM_INITIAL_STATE: ZodFormState = {
  data: null,
  success: false,
  message: '',
  zodErrors: {},
}
