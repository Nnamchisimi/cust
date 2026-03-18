// LocalStorage-based storage (original version)
// Data is stored in browser's localStorage

const STORAGE_KEY = 'customerSatisfactionSurvey';

export const getResponses = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveResponse = (response) => {
  const responses = getResponses();
  responses.push(response);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(responses));
};

export const clearAllData = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const getBranchStats = () => {
  const responses = getResponses();
  const branches = ['Lefkoşa', 'Haspolat', 'Girne'];
  
  const stats = {};
  branches.forEach(branch => {
    stats[branch] = {
      count: 0,
      totalRating: 0,
      avgRating: 0
    };
  });
  
  responses.forEach(r => {
    if (stats[r.branch]) {
      stats[r.branch].count++;
      if (r.overallSatisfaction) {
        stats[r.branch].totalRating += r.overallSatisfaction;
      }
    }
  });
  
  branches.forEach(branch => {
    if (stats[branch].count > 0) {
      stats[branch].avgRating = (stats[branch].totalRating / stats[branch].count).toFixed(1);
    }
  });
  
  return stats;
};
