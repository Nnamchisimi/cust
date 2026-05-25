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
    'Maintenance': r.maintenance || '',
    'Bodywork': r.bodywork || '',
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
    const avgMaintenance = branchResponses.length > 0 
      ? (branchResponses.reduce((sum, r) => sum + (r.maintenance || 0), 0) / branchResponses.filter(r => r.maintenance).length || 1).toFixed(2)
      : 0;
    const avgBodywork = branchResponses.length > 0 
      ? (branchResponses.reduce((sum, r) => sum + (r.bodywork || 0), 0) / branchResponses.filter(r => r.bodywork).length || 1).toFixed(2)
      : 0;
    const avgAppointment = branchResponses.length > 0 
      ? (branchResponses.reduce((sum, r) => sum + (r.appointment || 0), 0) / branchResponses.filter(r => r.appointment).length || 1).toFixed(2)
      : 0;
    const avgAdvisor = branchResponses.length > 0 
      ? (branchResponses.reduce((sum, r) => sum + (r.advisor || 0), 0) / branchResponses.filter(r => r.advisor).length || 1).toFixed(2)
      : 0;
    const avgWorkshopRepair = branchResponses.length > 0 
      ? (branchResponses.reduce((sum, r) => sum + (r.workshopRepair || 0), 0) / branchResponses.filter(r => r.workshopRepair).length || 1).toFixed(2)
      : 0;
    const avgCarWash = branchResponses.length > 0 
      ? (branchResponses.reduce((sum, r) => sum + (r.carWash || 0), 0) / branchResponses.filter(r => r.carWash).length || 1).toFixed(2)
      : 0;
    return {
      'Branch': branch,
      'Total Responses': branchResponses.length,
      'Avg Overall Satisfaction': avgOverall,
      'Avg Maintenance': branch === 'Haspolat' ? avgMaintenance : 'N/A',
      'Avg Bodywork': branch === 'Haspolat' ? avgBodywork : 'N/A',
      'Avg Appointment': avgAppointment,
      'Avg Advisor': avgAdvisor,
      'Avg Workshop Repair': avgWorkshopRepair,
      'Avg Car Wash': avgCarWash
    };
  });
  
  const ws2 = XLSX.utils.json_to_sheet(branchSummary);
  XLSX.utils.book_append_sheet(wb, ws2, 'Branch Summary');
  
  // Download file
  const fileName = `Customer_Survey_${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(wb, fileName);
};
