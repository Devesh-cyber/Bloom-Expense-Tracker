/**
 * A user-facing error. `message` is always safe to show directly in the UI.
 *
 * Kept as a small shared error type after removing the FastAPI client.
 */
export class ApiError extends Error {
  status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}
