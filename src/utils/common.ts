export function cleanStringWhitespace(str: string) {
  return str.trim().replace(/\s+/g, ' ')
}

export function getenv(key: string): string | undefined
export function getenv(key: string, defaultValue: string): string
export function getenv(key: string, mustExist: false): string | undefined
export function getenv(key: string, mustExist: true) : string
export function getenv(key: string, mustExist: boolean | string = false) {
  const value = process.env[key]
  if (typeof mustExist === 'string') {
    return value || mustExist
  }
  if (!mustExist) {
    return value
  }
  if (value == null) {
    throw new Error(`Missing value for environment variable ${key}`)
  }
  return value
}
