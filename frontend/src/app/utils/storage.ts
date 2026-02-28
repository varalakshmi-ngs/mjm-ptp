// Storage utilities for candidate registrations

export interface Candidate {
  id: string;
  fullName: string;
  fatherName: string;
  dateOfBirth: string;
  gender: string;
  mobile: string;
  email: string;
  aadhaar?: string;
  qualification: string;
  specialization: string;
  yearOfPassing: string;
  percentage: string;
  applyingFor: string;
  experience: string;
  skills: string;
  preferredLocation: string;
  resumeData?: string;
  photoData?: string;
  createdAt: string;
}

const STORAGE_KEY = 'sdvvl_candidates';
const ADMIN_KEY = 'sdvvl_admin';

// Initialize admin credentials (username: admin, password: admin123)
export const initializeAdmin = () => {
  if (!localStorage.getItem(ADMIN_KEY)) {
    localStorage.setItem(ADMIN_KEY, JSON.stringify({
      username: 'admin',
      password: 'admin123' // In production, this should be hashed
    }));
  }
};

export const validateAdmin = (username: string, password: string): boolean => {
  const adminData = localStorage.getItem(ADMIN_KEY);
  if (!adminData) return false;
  
  const admin = JSON.parse(adminData);
  return admin.username === username && admin.password === password;
};

export const saveCandidateRegistration = (candidate: Omit<Candidate, 'id' | 'createdAt'>): boolean => {
  try {
    const existingData = localStorage.getItem(STORAGE_KEY);
    const candidates: Candidate[] = existingData ? JSON.parse(existingData) : [];
    
    // Check for duplicate email or mobile
    const isDuplicate = candidates.some(
      c => c.email === candidate.email || c.mobile === candidate.mobile
    );
    
    if (isDuplicate) {
      return false;
    }
    
    const newCandidate: Candidate = {
      id: Date.now().toString(),
      ...candidate,
      createdAt: new Date().toISOString(),
    };
    
    candidates.push(newCandidate);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(candidates));
    return true;
  } catch (error) {
    console.error('Error saving candidate:', error);
    return false;
  }
};

export const getAllCandidates = (): Candidate[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error fetching candidates:', error);
    return [];
  }
};

export const getCandidateById = (id: string): Candidate | null => {
  const candidates = getAllCandidates();
  return candidates.find(c => c.id === id) || null;
};

export const searchCandidates = (query: string): Candidate[] => {
  const candidates = getAllCandidates();
  const lowerQuery = query.toLowerCase();
  
  return candidates.filter(c => 
    c.fullName.toLowerCase().includes(lowerQuery) ||
    c.email.toLowerCase().includes(lowerQuery) ||
    c.mobile.includes(query) ||
    c.qualification.toLowerCase().includes(lowerQuery)
  );
};

export const exportToCSV = (): string => {
  const candidates = getAllCandidates();
  
  const headers = [
    'ID', 'Full Name', 'Father Name', 'Date of Birth', 'Gender',
    'Mobile', 'Email', 'Aadhaar', 'Qualification', 'Specialization',
    'Year of Passing', 'Percentage', 'Applying For', 'Experience',
    'Skills', 'Preferred Location', 'Created At'
  ];
  
  const rows = candidates.map(c => [
    c.id,
    c.fullName,
    c.fatherName,
    c.dateOfBirth,
    c.gender,
    c.mobile,
    c.email,
    c.aadhaar || '',
    c.qualification,
    c.specialization,
    c.yearOfPassing,
    c.percentage,
    c.applyingFor,
    c.experience,
    c.skills,
    c.preferredLocation,
    c.createdAt
  ]);
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');
  
  return csvContent;
};

export const getStatistics = () => {
  const candidates = getAllCandidates();
  
  return {
    total: candidates.length,
    byJobType: {
      IT: candidates.filter(c => c.applyingFor === 'IT').length,
      NonIT: candidates.filter(c => c.applyingFor === 'Non-IT').length,
      Technical: candidates.filter(c => c.applyingFor === 'Technical').length,
      Support: candidates.filter(c => c.applyingFor === 'Support').length,
    },
    byExperience: {
      Fresher: candidates.filter(c => c.experience === 'Fresher').length,
      Experienced: candidates.filter(c => c.experience === 'Experienced').length,
    }
  };
};
