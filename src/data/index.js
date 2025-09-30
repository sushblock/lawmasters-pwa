export const SAMPLE_MATTERS = [
  { id:1, caseNo:'W.P.(C) 8234/2024', title:'Rohit Sharma vs. State of Delhi', court:'Delhi High Court', nextHearing:'2024-10-15', status:'Active', priority:'High', client:'Rohit Sharma', stage:'Arguments', judge:'Justice Rajiv Sahai Endlaw', filingDate:'2024-03-15', description:'Constitutional validity of Delhi Excise Policy - Writ Petition' },
  { id:2, caseNo:'CS(OS) 445/2024', title:'Tech Solutions Pvt Ltd vs. Innovation Corp', court:'Delhi High Court', nextHearing:'2024-10-18', status:'Active', priority:'Medium', client:'Tech Solutions Pvt Ltd', stage:'Evidence', judge:'Justice Prathiba M. Singh', filingDate:'2024-02-20', description:'Commercial dispute regarding software licensing agreement' },
  { id:3, caseNo:'CRL.A. 789/2024', title:'State vs. Ramesh Kumar', court:'Delhi High Court', nextHearing:'2024-10-22', status:'Pending', priority:'High', client:'Ramesh Kumar', stage:'Final Arguments', judge:'Justice Dinesh Kumar Sharma', filingDate:'2024-01-10', description:'Criminal Appeal under Section 302 IPC' }
];

export const MATTER_TYPES = [
  { id:'civil', name:'Civil Suit', courts:['District Court','High Court'] },
  { id:'criminal', name:'Criminal Case', courts:['District Court','High Court','Supreme Court'] },
  { id:'writ', name:'Writ Petition', courts:['High Court','Supreme Court'] },
  { id:'commercial', name:'Commercial Dispute', courts:['Commercial Court','High Court'] },
  { id:'family', name:'Family Matter', courts:['Family Court','District Court'] },
  { id:'corporate', name:'Corporate Law', courts:['NCLT','High Court','Supreme Court'] }
];

export const SAMPLE_INVOICES = [
  { id:'INV-2024-089', client:'Tech Solutions Pvt Ltd', amount:125000, status:'Paid', date:'2024-09-20' },
  { id:'INV-2024-088', client:'Rohit Sharma', amount:75000, status:'Pending', date:'2024-09-15' },
  { id:'INV-2024-087', client:'Ramesh Kumar', amount:50000, status:'Overdue', date:'2024-09-01' }
];
