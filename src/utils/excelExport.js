import * as XLSX from 'xlsx';

export const exportToExcel = () => {
  const responses = JSON.parse(localStorage.getItem('customerSatisfactionSurvey') || '[]');
  
  if (responses.length === 0) {
    alert('No data to export!');
    return;
  }
  
  // Prepare data for Excel
  const data = responses.map(r => ({
    'Date': new Date(r.date).toLocaleDateString(),
    'First Name': r.firstName,
    'Last Name': r.lastName,
    'Phone': r.phone || '',
    'License Plate': r.licensePlate,
    'Branch': r.branch,
    'Department': r.department,
    'Overall Satisfaction': r.overallSatisfaction || '',
    'Appointment': r.appointment || '',
    'Advisor': r.advisor || '',
    'Workshop Repair': r.workshopRepair || '',
    'Car Wash': r.carWash || '',
    'Comments': r.comments || ''
  }));
  
  // Create workbook
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Survey Responses');
  
  // Generate branch summary sheet
  const branches = ['Lefkoşa', 'Haspolat', 'Girne'];
  const branchSummary = branches.map(branch => {
    const branchResponses = responses.filter(r => r.branch === branch);
    const avgOverall = branchResponses.length > 0 
      ? (branchResponses.reduce((sum, r) => sum + (r.overallSatisfaction || 0), 0) / branchResponses.length).toFixed(2)
      : 0;
    return {
      'Branch': branch,
      'Total Responses': branchResponses.length,
      'Avg Overall Satisfaction': avgOverall
    };
  });
  
  const ws2 = XLSX.utils.json_to_sheet(branchSummary);
  XLSX.utils.book_append_sheet(wb, ws2, 'Branch Summary');
  
  // Download file
  const fileName = `Customer_Survey_${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(wb, fileName);
};
