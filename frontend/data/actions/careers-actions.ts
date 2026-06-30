'use server'

import { z } from 'zod'
import { submitJobApplication } from '@/data/services/careers-service'
import { ZodFormState } from '@/data/types/careers'

const applicationSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email'),
  phone: z.string().optional(),
  availability: z.string().optional(),
  message: z.string().optional(),
  jobTitle: z.string(),
  jobId: z.string(),
})

export async function submitApplicationAction(
  prevState: ZodFormState,
  formData: FormData
): Promise<ZodFormState> {
  const formDataObject = Object.fromEntries(formData)

  const parseResult = applicationSchema.safeParse(formDataObject)

  if (!parseResult.success) {
    return {
      ...prevState,
      strapiErrors: null,
      zodErrors: parseResult.error.flatten((issue) => issue.message).fieldErrors,
      message: 'Please correct the form errors.',
    }
  }

  const result = await submitJobApplication(parseResult.data)

  if (!result) {
    return {
      ...prevState,
      strapiErrors: null,
      zodErrors: null,
      message: 'Failed to submit. Please try again.',
    }
  }

  if (result.error) {
    return {
      ...prevState,
      strapiErrors: result.error,
      zodErrors: null,
      message: 'Failed to submit. Please try again.',
    }
  }

  return {
    ...prevState,
    success: true,
    message: 'Application submitted!',
  }
}
