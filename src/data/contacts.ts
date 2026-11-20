export interface ContactDossierData {
  fullName: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  resumeFileName: string;
  portfolio: string;
}

/**
 * Verified Contact Dossier (Part 11).
 * Email, phone, and resume are intentionally left blank until supplied;
 * unavailable buttons are hidden automatically in the UI.
 */
export const CONTACTS_DATA: ContactDossierData = {
  fullName: 'P. Baby Shanmukha Syamala',
  email: '',
  phone: '',
  github: 'https://github.com/shanmukhasyamala-hub',
  linkedin: 'https://linkedin.com/in/shanmukha-syamala-9b9566382/',
  resumeUrl: '',
  resumeFileName: 'Shanmukha_Resume.pdf',
  portfolio: 'https://shanmukhapersonal.vercel.app',
};
