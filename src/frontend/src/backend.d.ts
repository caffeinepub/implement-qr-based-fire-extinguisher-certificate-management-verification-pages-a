import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactInquiryDto {
    name: string;
    email: string;
    company?: string;
    message: string;
    timestamp: Time;
    phone: string;
    serviceNeeded: string;
}
export type Time = bigint;
export interface UserProfile {
    name: string;
}
export interface FireExtinguisherCertificateDto {
    certifiedBy: string;
    nextDueDate: string;
    clientName: string;
    createdAt: Time;
    cylinderManufDate: string;
    uniqueToken: string;
    testedBy: string;
    clientAddress?: string;
    updatedAt?: Time;
    extinguisherType: string;
    refillingCompany: string;
    refillingDoneBy: string;
    capacity: string;
    refillingDate: string;
    certificateNumber?: bigint;
    remarks?: string;
    installationDate: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createCertificate(clientName: string, clientAddress: string | null, extinguisherType: string, capacity: string, cylinderManufDate: string, installationDate: string, refillingDate: string, nextDueDate: string, refillingDoneBy: string, testedBy: string, certifiedBy: string, refillingCompany: string, remarks: string | null): Promise<bigint>;
    getAllCertificates(): Promise<Array<FireExtinguisherCertificateDto>>;
    getAllInquiries(): Promise<Array<ContactInquiryDto>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCertificateByNumber(certificateNumber: bigint): Promise<FireExtinguisherCertificateDto | null>;
    getCertificateByToken(token: string): Promise<FireExtinguisherCertificateDto | null>;
    getCertificatesByClientName(clientName: string): Promise<Array<FireExtinguisherCertificateDto>>;
    getInquiriesByName(name: string): Promise<Array<ContactInquiryDto>>;
    getInquiriesByService(service: string): Promise<Array<ContactInquiryDto>>;
    getInquiryByTimestamp(timestamp: Time): Promise<ContactInquiryDto>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateCertificate(certificateNumber: bigint, clientName: string, clientAddress: string | null, extinguisherType: string, capacity: string, cylinderManufDate: string, installationDate: string, refillingDate: string, nextDueDate: string, refillingDoneBy: string, testedBy: string, certifiedBy: string, refillingCompany: string, remarks: string | null): Promise<void>;
    upsertInquiry(name: string, company: string | null, phone: string, email: string, serviceNeeded: string, message: string): Promise<void>;
}
