export type VerificationId = string

export interface Verification {
    uid: VerificationId,
    accountId: number,
    phone: string,
    code: string,
    date: Date
}