import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { FileSpreadsheet, Trash2, Menu, X, Building2, Users, ChevronRight, ChevronLeft, Send, LogOut } from 'lucide-react';
import * as XLSX from 'xlsx';
import merclogo from './merclogo.png';
import SignInScreen from './components/SignInScreen';
import SignUpScreen from './components/SignUpScreen';

// Custom hook for responsive design
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

// Mercedes Professional Color Palette
const PRIMARY_BLACK = '#000000';
const PRIMARY_WHITE = '#FFFFFF';
const METALLIC_SILVER = '#C0C0C0';
const LIGHT_GREY = '#f5f5f5';
const MERCEDES_BLUE = '#00A0B0';
const TEXT_DARK = '#1a1a1a';
const TEXT_LIGHT = '#666666';
const SUCCESS_GREEN = '#00C45E';
const DANGER_RED = '#D11124';
const BORDER_COLOR = '#e0e0e0';
const CARD_SHADOW = '0 2px 8px rgba(0,0,0,0.08)';

// Translations
const translations = {
  en: {
    // Header
    headerTitle: 'Serhan Kombos Otomotıv',
    headerSubtitle: 'Customer Experience Survey',
    // Form - Page 1
    yourInfo: 'Your Information',
    firstName: 'First Name',
    firstNamePlaceholder: 'Enter first name',
    lastName: 'Last Name',
    lastNamePlaceholder: 'Enter last name',
    phone: 'Phone Number',
    phonePlaceholder: '+90 5XX XXX XXXX',
    licensePlate: 'License Plate',
    licensePlatePlaceholder: 'e.g., VV001',
    serviceInfo: 'Service Information',
    selectBranch: 'Select Branch',
    selectDepartment: 'Select Department',
    continueToRating: 'Continue to Rating',
    // Form - Page 2
    rateExperience: 'Rate Your Experience',
    ratingHint: '5 = Excellent | 3 = Average | 1 = Poor',
    surveyIntro: 'We kindly ask you to evaluate your most recent visit to our service by rating each question below on a scale of 1 to 5, by selecting the corresponding star. A rating of 5 represents the highest, 3 represents average and 1 represents the lowest. Thank you for choosing Kombos Automotive for your satisfaction and valuable feedback. Kombos Automotive After-Sales Services Directorate',
    ratingGuide: '1 = Not Satisfied | 2 = Fair | 3 = Average | 4 = Good | 5 = Excellent',
    overallSatisfaction: 'General Satisfaction',
    appointment: 'Appointment',
    advisor: 'Advisor',
    workshopRepair: 'Workshop Repair',
    carWash: 'Car Wash',
    maintenance: 'Maintenance – Mechanical – Electrical',
    bodywork: 'Bodywork – Paint',
    additionalComments: 'Additional Comments',
    commentsPlaceholder: 'Share your feedback with us (optional)',
    submitFeedback: 'Submit Feedback',
    backToInfo: 'Back to Information',
    // Admin
    adminPanel: 'Admin Panel',
    surveyDashboard: 'Survey Management Dashboard',
    overview: 'Overview',
    totalResponses: 'Total Responses',
    exportExcel: 'Export to Excel',
    clearData: 'Clear Data',
    scanToAccess: 'Scan to Access Survey',
    surveyResponses: 'Survey Responses',
    noResponses: 'No responses yet',
    // Success
    thankYou: 'Thank you for your feedback!',
    // Validation
    fillRequired: 'Please fill in all required fields and select at least one department!',
    rateOverall: 'Please rate your overall satisfaction!',
    noDataExport: 'No data to export!',
    confirmClear: 'Are you sure you want to delete all survey responses?',
    // Menu
    menu: 'Menu',
    takeSurvey: 'Take Survey',
    // Login
    login: 'Login',
    signup: 'Sign Up',
    username: 'Username',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    loginButton: 'Sign In',
    signupButton: 'Sign Up',
    loginError: 'Invalid username or password',
    signupError: 'Username already exists',
    signupSuccess: 'Account created successfully! Please login.',
    logout: 'Logout',
    adminAccess: 'Admin Access Required',
    unauthorized: 'You do not have permission to access this page',
    goBack: 'Go Back',
  },
  tr: {
    // Header
    headerTitle: 'Serhan Kombos Otomotiv',
    headerSubtitle: 'Müşteri Deneyimi Anketi',
    // Form - Page 1
    yourInfo: 'Bilgileriniz',
    firstName: 'Ad',
    firstNamePlaceholder: 'Adınızı girin',
    lastName: 'Soyad',
    lastNamePlaceholder: 'Soyadınızı girin',
    phone: 'Telefon Numarası',
    phonePlaceholder: '+90 5XX XXX XXXX',
    licensePlate: 'Plaka',
    licensePlatePlaceholder: 'örn: 01-A-001',
    serviceInfo: 'Servis Bilgileri',
    selectBranch: 'Şube Seçin',
    selectDepartment: 'Departman Seçin',
    continueToRating: 'Derecelendirmeye Geç',
    // Form - Page 2
    rateExperience: 'Deneyiminizi Puanlayın',
    ratingHint: '5 = Mükemmel | 3 = Orta | 1 = Kötü',
    surveyIntro: 'Hizmetimize en son yaptığınız ziyareti aşağıdaki soruları 1 ila 5 arasında puanlayarak değerlendirmenizi saygıyla rica ederiz. 5 en yüksek puanı, 3 ortalama puanı ve 1 en düşük puanı temsil eder. Memnuniyetiniz ve değerli geri bildirimleriniz için Kombos Otomotİv\'i seçtiğiniz için teşekkür ederiz. Kombos Otomotİv Satış Sonrası Hizmetler Müdürlüğü',
    ratingGuide: '1 = Memnun Değil | 2 = Kötü | 3 = Orta | 4 = İyi | 5 = Mükemmel',
    overallSatisfaction: 'Genel Memnuniyet',
    appointment: 'Randevu',
    advisor: 'Danışman',
    workshopRepair: 'Atölye Tamiri',
    carWash: 'Yıkama',
    maintenance: 'Bakım – Mekanik – Elektrik',
    bodywork: 'Karoser – Boya',
    additionalComments: 'Ek Yorumlar',
    commentsPlaceholder: 'Görüşlerinizi bizimle paylaşın (isteğe bağlı)',
    submitFeedback: 'Geri Bildirim Gönder',
    backToInfo: 'Bilgilere Geri Dön',
    // Admin
    adminPanel: 'Yönetici Paneli',
    surveyDashboard: 'Anket Yönetim Dashboard',
    overview: 'Genel Bakış',
    totalResponses: 'Toplam Yanıtlar',
    exportExcel: 'Excel İndir',
    clearData: 'Verileri Sil',
    scanToAccess: 'Ankete Erişmek için Tarayın',
    surveyResponses: 'Anket Yanıtları',
    noResponses: 'Henüz yanıt yok',
    // Success
    thankYou: 'Geri bildiriminiz için teşekkür ederiz!',
    // Validation
    fillRequired: 'Lütfen tüm zorunlu alanları doldurun ve en az bir departman seçin!',
    rateOverall: 'Lütfen genel memnuniyetinizi puanlayın!',
    noDataExport: 'İndirilecek veri yok!',
    confirmClear: 'Tüm anket yanıtlarını silmek istediğinizden emin misiniz?',
    // Menu
    menu: 'Menü',
    takeSurvey: 'Ankete Katıl',
    // Login
    login: 'Giriş',
    signup: 'Kayıt Ol',
    username: 'Kullanıcı Adı',
    password: 'Şifre',
    confirmPassword: 'Şifreyi Onayla',
    loginButton: 'Giriş Yap',
    signupButton: 'Kayıt Ol',
    loginError: 'Kullanıcı adı veya şifre hatalı',
    signupError: 'Kullanıcı adı zaten mevcut',
    signupSuccess: 'Hesap başarıyla oluşturuldu! Lütfen giriş yapın.',
    logout: 'Çıkış Yap',
    adminAccess: 'Yönetici Erişimi Gerekli',
    unauthorized: 'Bu sayfaya erişim izniniz yok',
    goBack: 'Geri Dön',
  }
};

// Mercedes Benz Star Logo Component
const MercedesStar = ({ size = 40, color = PRIMARY_WHITE }) => {
  return (
    <img src={merclogo} alt="Mercedes Logo" style={{ width: size, height: 'auto' }} />
  );
};

// Storage functions
const STORAGE_KEY = 'customerSatisfactionSurvey';

const getResponses = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const saveResponse = (response) => {
  const responses = getResponses();
  responses.push(response);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(responses));
};

const clearAllData = () => {
  localStorage.removeItem(STORAGE_KEY);
};

const exportToExcel = () => {
  const responses = getResponses();
  if (responses.length === 0) {
    alert('No data to export!');
    return;
  }
  
  const data = responses.map(r => ({
    'Date': new Date(r.date).toLocaleDateString(),
    'First Name': r.firstName,
    'Last Name': r.lastName,
    'Phone': r.phone || '',
    'License Plate': r.licensePlate,
    'Branch': r.branch,
    'Department': Array.isArray(r.department) ? r.department.join(', ') : r.department,
    'Overall Satisfaction': r.overallSatisfaction || '',
    'Maintenance': r.maintenance || '',
    'Bodywork': r.bodywork || '',
    'Appointment': r.appointment || '',
    'Advisor': r.advisor || '',
    'Workshop Repair': r.workshopRepair || '',
    'Car Wash': r.carWash || '',
    'Comments': r.comments || ''
  }));
  
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Survey Responses');
  
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
  
  const fileName = `Customer_Survey_${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(wb, fileName);
};

// Rating Component using Mercedes Logo
const RatingGroup = ({ label, value, onSelect }) => {
  return (
    <div style={styles.ratingGroup}>
      <span style={styles.ratingLabel}>{label}</span>
      <div style={styles.logoRatingContainer}>
        {[1, 2, 3, 4, 5].map((num) => (
          <div key={num} style={styles.ratingButtonWrapper}>
            <button
              style={{
                ...styles.logoRatingButton,
                ...(value && value >= num ? styles.logoRatingButtonSelected : {})
              }}
              onClick={() => onSelect(value === num ? null : num)}
              type="button"
            >
              <MercedesStar size={36} color={value && value >= num ? PRIMARY_WHITE : PRIMARY_BLACK} />
            </button>
            <span style={styles.ratingNumber}>{num}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Customer Info Form Component
const CustomerInfoForm = ({ formData, setFormData, onNext, t }) => {
  // Departments available based on selected branch
  const getAvailableDepartments = () => {
    const { branch } = formData;
    if (branch === 'Haspolat') {
      return [
        { id: 'maintenance', name: t.maintenance },
        { id: 'bodywork', name: t.bodywork }
      ];
    } else {
      // Lefkoşa and Girne only have Maintenance
      return [
        { id: 'maintenance', name: t.maintenance }
      ];
    }
  };

  const availableDepartments = getAvailableDepartments();

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleDepartment = (deptId) => {
    const currentDepts = formData.department || [];
    if (currentDepts.includes(deptId)) {
      updateField('department', currentDepts.filter(d => d !== deptId));
    } else {
      updateField('department', [...currentDepts, deptId]);
    }
  };

  const handleNext = () => {
    if (!formData.firstName || !formData.lastName || !formData.licensePlate || 
        !formData.branch || !formData.department || formData.department.length === 0) {
      alert(t.fillRequired);
      return;
    }
    onNext();
  };

  return (
    <div style={styles.formSection}>
      <h2 style={styles.sectionTitle}>{t.yourInfo}</h2>
      <div style={styles.inputRow}>
        <div style={styles.inputContainer}>
          <span style={styles.inputLabel}>{t.firstName} <span style={styles.required}>*</span></span>
          <input
            style={styles.input}
            value={formData.firstName}
            onChange={(e) => updateField('firstName', e.target.value)}
            placeholder={t.firstNamePlaceholder}
          />
        </div>
        <div style={styles.inputContainer}>
          <span style={styles.inputLabel}>{t.lastName} <span style={styles.required}>*</span></span>
          <input
            style={styles.input}
            value={formData.lastName}
            onChange={(e) => updateField('lastName', e.target.value)}
            placeholder={t.lastNamePlaceholder}
          />
        </div>
      </div>
      <div style={styles.inputRow}>
        <div style={styles.inputContainer}>
          <span style={styles.inputLabel}>{t.phone}</span>
          <input
            style={styles.input}
            value={formData.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            placeholder={t.phonePlaceholder}
          />
        </div>
        <div style={styles.inputContainer}>
          <span style={styles.inputLabel}>{t.licensePlate} <span style={styles.required}>*</span></span>
          <input
            style={styles.input}
            value={formData.licensePlate}
            onChange={(e) => updateField('licensePlate', e.target.value)}
            placeholder={t.licensePlatePlaceholder}
          />
        </div>
      </div>

      <h2 style={{...styles.sectionTitle, marginTop: 32}}>{t.serviceInfo}</h2>
      <div style={styles.inputRow}>
        <div style={styles.inputContainer}>
          <span style={styles.inputLabel}>{t.selectBranch} <span style={styles.required}>*</span></span>
          <select
            style={styles.select}
            value={formData.branch}
            onChange={(e) => { updateField('branch', e.target.value); updateField('department', []); }}
          >
            <option value="">{t.selectBranch}</option>
            {['Lefkoşa', 'Haspolat', 'Girne'].map((branch) => (
              <option key={branch} value={branch}>{branch}</option>
            ))}
          </select>
        </div>
        
        {/* Show department section only when branch is selected */}
        {formData.branch && (
          <div style={styles.inputContainer}>
            <span style={styles.inputLabel}>{t.selectDepartment} <span style={styles.required}>*</span></span>
            <div style={styles.checkboxGroup}>
              {availableDepartments.map((dept) => (
                <label key={dept.id} style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={(formData.department || []).includes(dept.id)}
                    onChange={() => toggleDepartment(dept.id)}
                    style={styles.checkbox}
                  />
                  <span style={styles.checkboxText}>{dept.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      <button style={styles.nextButton} onClick={handleNext} type="button">
        {t.continueToRating}
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

// Rating Form Component
const RatingForm = ({ formData, setFormData, onBack, onSubmit, t }) => {
  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Get selected departments from first page
  const selectedDepartments = formData.department || [];
  
  // Map department IDs to display names and rating field names
  const departmentInfo = {
    'maintenance': { label: t.maintenance, field: 'maintenance' },
    'bodywork': { label: t.bodywork, field: 'bodywork' }
  };
  
  // Get rating fields based on selected departments
  const getRatingFields = () => {
    const fields = [];
    
    // For Haspolat branch: only show bodywork, never maintenance
    // For all other branches: don't propagate any department
    if (formData.branch === 'Haspolat') {
      // Only show bodywork (paint job) for Haspolat
      if (selectedDepartments.includes('bodywork')) {
        fields.push(departmentInfo['bodywork']);
      }
    }
    // For other branches, don't propagate any department ratings
    
    return fields;
  };
  
  const ratingFields = getRatingFields();

  const handleSubmit = () => {
    if (!formData.overallSatisfaction) {
      alert(t.rateOverall);
      return;
    }

    saveResponse({
      id: Date.now(),
      date: new Date().toISOString(),
      ...formData
    });

    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      licensePlate: '',
      branch: '',
      department: [],
      overallSatisfaction: null,
      maintenance: null,
      bodywork: null,
      appointment: null,
      advisor: null,
      workshopRepair: null,
      carWash: null,
      comments: ''
    });

    onSubmit();
  };

  return (
    <div style={styles.formSection}>
      <button style={styles.backButton} onClick={onBack} type="button">
        <ChevronLeft size={18} />
        {t.backToInfo}
      </button>

      <h2 style={styles.sectionTitle}>{t.rateExperience}</h2>
      
      <p style={styles.surveyIntro}>{t.surveyIntro}</p>
      <p style={styles.ratingGuide}>{t.ratingGuide}</p>
      
      <RatingGroup 
        label={t.overallSatisfaction + ' *'} 
        value={formData.overallSatisfaction}
        onSelect={(val) => updateField('overallSatisfaction', val)}
      />
      
      {/* Fixed rating categories - always shown */}
      <RatingGroup 
        label={t.appointment} 
        value={formData.appointment}
        onSelect={(val) => updateField('appointment', val)}
      />
      <RatingGroup 
        label={t.advisor}
        value={formData.advisor}
        onSelect={(val) => updateField('advisor', val)}
      />
      <RatingGroup 
        label={t.workshopRepair}
        value={formData.workshopRepair}
        onSelect={(val) => updateField('workshopRepair', val)}
      />
      <RatingGroup 
        label={t.carWash}
        value={formData.carWash}
        onSelect={(val) => updateField('carWash', val)}
      />
      
      {/* Dynamic rating groups based on selected departments */}
      {ratingFields.map((item) => (
        <RatingGroup 
          key={item.field}
          label={item.label} 
          value={formData[item.field]}
          onSelect={(val) => updateField(item.field, val)}
        />
      ))}

      <h2 style={{...styles.sectionTitle, marginTop: 32}}>{t.additionalComments}</h2>
      <textarea
        style={{...styles.input, ...styles.textArea}}
        value={formData.comments}
        onChange={(e) => updateField('comments', e.target.value)}
        placeholder={t.commentsPlaceholder}
        rows={4}
      />

      <button style={styles.submitButton} onClick={handleSubmit} type="button">
        {t.submitFeedback}
        <Send size={18} />
      </button>
    </div>
  );
};

// Survey Form Component (Wrapper)
const SurveyForm = ({ onSubmitSuccess, t }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    licensePlate: '',
    branch: '',
    department: [],
    overallSatisfaction: null,
    maintenance: null,
    bodywork: null,
    appointment: null,
    advisor: null,
    workshopRepair: null,
    carWash: null,
    comments: ''
  });

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);
  
  const handleSubmit = () => {
    onSubmitSuccess();
    setStep(1);
  };

  return (
    <div style={styles.formWrapper}>
      {/* Progress Indicator */}
      <div style={styles.progressContainer}>
        <div style={{...styles.progressStep, ...(step >= 1 ? styles.progressStepActive : {})}}>
          <div style={{...styles.progressCircle, ...(step >= 1 ? styles.progressCircleActive : {})}}>1</div>
          <span style={{...styles.progressLabel, ...(step >= 1 ? styles.progressLabelActive : {})}}>{t.yourInfo}</span>
        </div>
        <div style={styles.progressLine}>
          <div style={{...styles.progressLineFill, width: step >= 2 ? '100%' : '0%'}} />
        </div>
        <div style={{...styles.progressStep, ...(step >= 2 ? styles.progressStepActive : {})}}>
          <div style={{...styles.progressCircle, ...(step >= 2 ? styles.progressCircleActive : {})}}>2</div>
          <span style={{...styles.progressLabel, ...(step >= 2 ? styles.progressLabelActive : {})}}>{t.rateExperience}</span>
        </div>
      </div>

      {step === 1 ? (
        <CustomerInfoForm 
          formData={formData} 
          setFormData={setFormData} 
          onNext={handleNext} 
          t={t}
        />
      ) : (
        <RatingForm 
          formData={formData} 
          setFormData={setFormData} 
          onBack={handleBack}
          onSubmit={handleSubmit}
          t={t}
        />
      )}
    </div>
  );
};

// Unauthorized Access Component
const Unauthorized = ({ onGoBack, t }) => {
  const { width } = useWindowSize();
  const isMobile = width < 768;

  return (
    <div style={styles.adminContainer}>
      <div style={isMobile ? styles.headerMobile : styles.header}>
        <div style={styles.headerContent}>
          <MercedesStar size={isMobile ? 28 : 36} />
          <h1 style={isMobile ? styles.headerTitleMobile : styles.headerTitle}>{t.adminAccess}</h1>
        </div>
      </div>
      
      <div style={isMobile ? styles.mainContentMobile : styles.mainContent}>
        <div style={styles.unauthorizedCard}>
          <div style={styles.unauthorizedIcon}>
            <MercedesStar size={64} color={DANGER_RED} />
          </div>
          <h2 style={styles.unauthorizedTitle}>{t.unauthorized}</h2>
          <button style={styles.actionButton} onClick={onGoBack}>
            {t.goBack}
          </button>
        </div>
      </div>
    </div>
  );
};

// Admin Panel Component
const AdminPanel = ({ responses, onRefresh, isMobile = false, t, user, onLogout }) => {

  const handleClearData = () => {
    const confirmed = window.confirm('Are you sure you want to delete all survey responses?');
    if (confirmed) {
      clearAllData();
      onRefresh();
    }
  };

  const totalResponses = responses.length;
  const branches = ['Lefkoşa', 'Haspolat', 'Girne'];
  
  const getBranchData = (branch) => {
    const branchResponses = responses.filter(r => r.branch === branch);
    const totalRating = branchResponses.reduce((sum, r) => sum + (r.overallSatisfaction || 0), 0);
    return {
      count: branchResponses.length,
      avgRating: branchResponses.length > 0 ? (totalRating / branchResponses.length).toFixed(1) : 0
    };
  };

  const surveyUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div style={styles.adminContainer}>
      {/* Header */}
      <div style={isMobile ? styles.headerMobile : styles.header}>
        <div style={styles.headerContent}>
          <MercedesStar size={isMobile ? 28 : 36} />
          <h1 style={isMobile ? styles.headerTitleMobile : styles.headerTitle}>Admin Panel</h1>
        </div>
        <div style={styles.headerRight}>
          {user && (
            <span style={styles.userName}>{user.username}</span>
          )}
          <button style={styles.logoutButton} onClick={onLogout}>
            <LogOut size={16} color={PRIMARY_WHITE} />
            <span style={{marginLeft: 6}}>{t.logout}</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={isMobile ? styles.mainContentMobile : styles.mainContent}>
        <span style={styles.welcomeText}>Survey Management Dashboard</span>

        <span style={styles.subTitle}>Overview</span>
        
        {/* Stats Cards - Mercedes Style */}
        <div style={isMobile ? styles.statsContainerMobile : styles.statsContainer}>
          <div style={{...styles.statCard, ...styles.statCardPrimary, ...(isMobile ? styles.statCardPrimaryMobile : {})}}>
            <Users size={isMobile ? 22 : 28} color={PRIMARY_WHITE} style={{marginBottom: isMobile ? 0 : 8}} />
            <div style={isMobile ? {} : {}}>
              <span style={styles.statTitleLight}>Total Responses</span>
              <span style={styles.statValueLight}>{totalResponses}</span>
            </div>
          </div>
          <div style={styles.statsGrid}>
            {branches.map((branch, index) => {
              const data = getBranchData(branch);
              return (
                <div key={index} style={styles.statCard}>
                  <Building2 size={isMobile ? 22 : 28} color={PRIMARY_BLACK} style={{marginBottom: 8}} />
                  <span style={styles.statTitle}>{branch}</span>
                  <span style={styles.statValue}>{data.count}</span>
                  <span style={styles.statSubValue}>Avg: {data.avgRating}/5</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={isMobile ? styles.actionButtonsMobile : styles.actionButtons}>
          <button style={isMobile ? {...styles.actionButton, ...styles.actionButtonMobile} : styles.actionButton} onClick={exportToExcel}>
            <FileSpreadsheet size={20} color={PRIMARY_WHITE} />
            <span style={styles.actionButtonText}>Export to Excel</span>
          </button>
          <button style={{...styles.actionButton, ...styles.dangerButton, ...(isMobile ? styles.actionButtonMobile : {})}} onClick={handleClearData}>
            <Trash2 size={20} color={PRIMARY_WHITE} />
            <span style={styles.actionButtonText}>Clear Data</span>
          </button>
        </div>

        {/* QR Code Section */}
        <div style={styles.qrSection}>
          <h2 style={styles.sectionTitleDark}>Scan to Access Survey</h2>
          <div style={styles.qrContainer}>
            <QRCodeSVG value={surveyUrl} size={160} />
          </div>
          <span style={styles.linkText}>{surveyUrl}</span>
        </div>

        {/* Responses Table */}
        <div style={styles.sectionContainer}>
          <h2 style={styles.sectionTitleDark}>Survey Responses</h2>
          {responses.length === 0 ? (
            <div style={styles.emptyCard}>
              <span style={styles.emptyText}>No responses yet</span>
            </div>
          ) : (
            responses.slice().reverse().map((r, index) => (
              <div key={index} style={styles.responseCard}>
                <div style={styles.responseHeader}>
                  <span style={styles.responseName}>{r.firstName} {r.lastName}</span>
                  <span style={styles.responseDate}>{new Date(r.date).toLocaleDateString()}</span>
                </div>
                <div style={styles.divider} />
                <span style={styles.responseText}>{r.branch} • {(Array.isArray(r.department) ? r.department.join(', ') : r.department)}</span>
                <span style={styles.responseText}>License: {r.licensePlate}</span>
                <div style={styles.ratingsRow}>
                  <span style={styles.ratingBadge}>{r.overallSatisfaction}/5</span>
                  {r.maintenance && <span style={styles.ratingBadge}>{r.maintenance}</span>}
                  {r.bodywork && <span style={styles.ratingBadge}>{r.bodywork}</span>}
                  {r.appointment && <span style={styles.ratingBadge}>{r.appointment}</span>}
                  {r.advisor && <span style={styles.ratingBadge}>{r.advisor}</span>}
                  {r.workshopRepair && <span style={styles.ratingBadge}>{r.workshopRepair}</span>}
                  {r.carWash && <span style={styles.ratingBadge}>{r.carWash}</span>}
                </div>
                {r.comments && <span style={styles.commentText}>{r.comments}</span>}
              </div>
            ))
          )}
        </div>

        <div style={{height: 50}} />
      </div>

    </div>
  );
};

// API Base URL - uses build-time env var for production deployment
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:30090';

// Main App Component
function App() {
  const [activeTab, setActiveTab] = useState('survey');
  const [responses, setResponses] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  // Authentication state
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [signupError, setSignupError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState('');
  
  const { width } = useWindowSize();
  const isMobile = width < 768;
  
  const t = translations[language];
  
  // Check for stored session on mount
  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await fetch(`${API_URL}/api/verify`, {
          method: 'GET',
          credentials: 'include' // Important: include cookies
        });
        
        if (response.ok) {
          const userData = await response.json();
          if (userData.authenticated && userData.role === 'admin') {
            setUser(userData);
            setIsAuthenticated(true);
            setActiveTab('admin'); // Redirect to admin page if already logged in
            // Store in localStorage for persistence
            localStorage.setItem('survey_user', JSON.stringify(userData));
          }
        } else {
          // Token invalid or expired, clear localStorage
          localStorage.removeItem('survey_user');
        }
      } catch (error) {
        console.error('Session verification failed:', error);
        localStorage.removeItem('survey_user');
      }
    };
    
    verifySession();
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important: include cookies
        body: JSON.stringify({ username, password }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        setLoginError(errorData.error || t.loginError);
        return;
      }
      
      const userData = await response.json();
      
      if (userData.role !== 'admin') {
        setLoginError(t.unauthorized);
        return;
      }
      
      setUser(userData);
      setIsAuthenticated(true);
      setLoginError('');
      setShowLogin(false);
      setActiveTab('admin'); // Redirect to admin page after login
      localStorage.setItem('survey_user', JSON.stringify(userData));
    } catch (error) {
      console.error('Login error:', error);
      setLoginError(t.loginError);
    }
  };

  const handleSignup = async (username, password) => {
    try {
      const response = await fetch(`${API_URL}/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        setSignupError(errorData.error || t.signupError);
        setSignupSuccess('');
        return;
      }
      
      // eslint-disable-next-line no-unused-vars
      const data = await response.json();
      setSignupSuccess(t.signupSuccess);
      setSignupError('');
      // Switch to login after successful signup
      setTimeout(() => {
        setShowSignup(false);
        setShowLogin(true);
        setSignupSuccess('');
      }, 2000);
    } catch (error) {
      console.error('Signup error:', error);
      setSignupError(t.signupError);
      setSignupSuccess('');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/api/logout`, {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
    setUser(null);
    setIsAuthenticated(false);
    setActiveTab('survey');
    localStorage.removeItem('survey_user');
  };

  const handleAccessAdmin = () => {
    if (isAuthenticated && user?.role === 'admin') {
      setActiveTab('admin');
    } else {
      setShowLogin(true);
    }
  };
  
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'tr' : 'en');
  };

  useEffect(() => {
    setResponses(getResponses());
  }, []);

  const handleRefresh = () => {
    setResponses(getResponses());
  };

  const handleSubmitSuccess = () => {
    setShowSuccess(true);
    handleRefresh();
    setTimeout(() => setShowSuccess(false), 4000);
  };

  // Determine what to render
  const renderContent = () => {
    // Show login modal
    if (showLogin) {
      return (
        <div style={styles.surveyContainer}>
          <div style={isMobile ? styles.headerMainMobile : styles.headerMain}>
            <div style={styles.brandRow}>
              <MercedesStar size={isMobile ? 32 : 40} />
              {!isMobile && <h1 style={styles.headerTitleMain}>{t.headerTitle}</h1>}
              {isMobile && <h1 style={styles.headerTitleMainMobile}>{t.headerTitle}</h1>}
            </div>
          </div>
          <div style={isMobile ? styles.formContentMobile : styles.formContent}>
            <SignInScreen 
              onLogin={handleLogin} 
              onSwitchToSignup={() => { setShowLogin(false); setShowSignup(true); }}
              t={t} 
              error={loginError}
            />
          </div>
        </div>
      );
    }
    
    if (showSignup) {
      return (
        <div style={styles.surveyContainer}>
          <div style={isMobile ? styles.headerMainMobile : styles.headerMain}>
            <div style={styles.brandRow}>
              <MercedesStar size={isMobile ? 32 : 40} />
              {!isMobile && <h1 style={styles.headerTitleMain}>{t.headerTitle}</h1>}
              {isMobile && <h1 style={styles.headerTitleMainMobile}>{t.headerTitle}</h1>}
            </div>
          </div>
          <div style={isMobile ? styles.formContentMobile : styles.formContent}>
            <SignUpScreen 
              onSignup={handleSignup}
              onSwitchToLogin={() => { setShowSignup(false); setShowLogin(true); }}
              t={t}
              error={signupError}
              success={signupSuccess}
            />
          </div>
        </div>
      );
    }
    
    // Show admin panel or unauthorized
    if (activeTab === 'admin') {
      if (!isAuthenticated || user?.role !== 'admin') {
        return (
          <Unauthorized 
            onGoBack={() => setActiveTab('survey')} 
            t={t}
          />
        );
      }
      return (
        <AdminPanel 
          responses={responses} 
          onRefresh={handleRefresh} 
          isMobile={isMobile} 
          t={t}
          user={user}
          onLogout={handleLogout}
        />
      );
    }
    
    // Survey tab
    return (
      <div style={styles.surveyContainer}>
        {/* Header */}
        <div style={isMobile ? styles.headerMainMobile : styles.headerMain}>
          <div style={styles.brandRow}>
            <MercedesStar size={isMobile ? 32 : 40} />
            {!isMobile && <h1 style={styles.headerTitleMain}>{t.headerTitle}</h1>}
            {isMobile && <h1 style={styles.headerTitleMainMobile}>{t.headerTitle}</h1>}
            {!isMobile && <h1 style={styles.headerTitleMain2}>{t.headerSubtitle}</h1>}
            {isMobile && <h1 style={styles.headerTitleMain2Mobile}>{t.headerSubtitle}</h1>}
          </div>
          <div style={styles.headerRight}>
            <button style={styles.languageButton} onClick={toggleLanguage}>
              {language === 'en' ? 'TR' : 'EN'}
            </button>
            <button style={styles.menuButton} onClick={() => setMobileOpen(true)}>
              <Menu size={28} color={PRIMARY_WHITE} />
            </button>
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div style={styles.successBanner}>
            <span style={styles.successText}>Thank you for your feedback!</span>
          </div>
        )}

        {/* Drawer Overlay */}
        {mobileOpen && (
          <div style={styles.drawerOverlay} onClick={() => setMobileOpen(false)} />
        )}

        {/* Drawer */}
        {mobileOpen && (
          <div style={styles.mobileDrawer}>
            <div style={styles.drawerContainer}>
              <div style={styles.drawerLogo}>
                <MercedesStar size={48} />
              </div>
              <h2 style={styles.drawerTitle}>Menu</h2>
              <button style={styles.drawerItem} onClick={() => { setMobileOpen(false); handleAccessAdmin(); }}>
                <span style={styles.drawerItemText}>Admin Panel</span>
              </button>
            </div>
            <button style={styles.drawerCloseButton} onClick={() => setMobileOpen(false)}>
              <X size={28} color={PRIMARY_WHITE} />
            </button>
          </div>
        )}

        {/* Survey Form */}
        <div style={{flex: 1, overflowY: 'auto'}}>
          <div style={isMobile ? styles.formContentMobile : styles.formContent}>
            <SurveyForm onSubmitSuccess={handleSubmitSuccess} t={t} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.appContainer}>
      {renderContent()}
    </div>
  );
};

// Mercedes Professional Styles
const styles = {
  // Main
  appContainer: {
    flex: 1,
    backgroundColor: LIGHT_GREY,
    minHeight: '100vh',
    fontFamily: "'Mercedes-Benz', 'Arial', sans-serif",
  },
  surveyContainer: {
    flex: 1,
    backgroundColor: LIGHT_GREY,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  adminContainer: {
    flex: 1,
    backgroundColor: LIGHT_GREY,
    minHeight: '100vh',
    position: 'relative',
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    paddingTop: '50px',
    backgroundColor: PRIMARY_BLACK,
    display: 'flex',
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  headerMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    paddingTop: '50px',
    backgroundColor: PRIMARY_BLACK,
    display: 'flex',
  },
  brandRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: PRIMARY_WHITE,
    margin: 0,
    letterSpacing: 0.5,
  },
  headerTitleMain: {
    fontSize: 20,
    fontWeight: '600',
    color: PRIMARY_WHITE,
    margin: 0,
    letterSpacing: 0.5,
    marginRight: 550,
  },
  headerTitleMainMobile: {
    fontSize: 16,
    fontWeight: '600',
    color: PRIMARY_WHITE,
    margin: 0,
    letterSpacing: 0.5,
  },
    headerTitleMain2: {
    fontSize: 20,
    fontWeight: '600',
    color: PRIMARY_WHITE,
    margin: 0,
     left: '50%',
    
    letterSpacing: 0.5,
  },
  headerTitleMain2Mobile: {
    fontSize: 14,
    fontWeight: '400',
    color: PRIMARY_WHITE,
    margin: 0,
    letterSpacing: 0.5,
  },
  menuButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'default',
    padding: 5,
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  languageButton: {
    backgroundColor: PRIMARY_WHITE,
    color: PRIMARY_BLACK,
    border: 'none',
    borderRadius: 4,
    padding: '6px 12px',
    fontWeight: 'bold',
    fontSize: 14,
    cursor: 'default',
  },

  // Header Mobile
  headerMainMobile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    paddingTop: '50px',
    backgroundColor: PRIMARY_BLACK,
    display: 'flex',
  },
  headerMobile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    paddingTop: '50px',
    backgroundColor: PRIMARY_BLACK,
    display: 'flex',
  },
  headerTitleMobile: {
    fontSize: 16,
    fontWeight: '600',
    color: PRIMARY_WHITE,
    margin: 0,
    letterSpacing: 0.5,
  },

  // Main Content
  mainContent: {
    flex: 1,
    padding: 24,
    overflowY: 'auto',
  },
  mainContentMobile: {
    flex: 1,
    padding: 16,
    overflowY: 'auto',
  },
  formContent: {
    padding: 24,
    paddingBottom: 40,
    maxWidth: 2000,
    margin: '0 auto',
  },
  formContentMobile: {
    padding: 16,
    paddingBottom: 40,
    margin: '0 auto',
  },
  formWrapper: {
    width: '100%',
  },

  // Progress
  progressContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    gap: 8,
  },
  progressStep: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  progressStepActive: {},
  progressCircle: {
    width: 36,
    height: 36,
    borderRadius: '50%',
    backgroundColor: METALLIC_SILVER,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    color: PRIMARY_WHITE,
    fontSize: 14,
  },
  progressCircleActive: {
    backgroundColor: PRIMARY_BLACK,
  },
  progressLabel: {
    fontSize: 12,
    color: TEXT_LIGHT,
  },
  progressLabelActive: {
    color: PRIMARY_BLACK,
    fontWeight: '600',
  },
  progressLine: {
    flex: 1,
    height: 3,
    backgroundColor: METALLIC_SILVER,
    borderRadius: 2,
    maxWidth: 80,
  },
  progressLineFill: {
    height: '100%',
    backgroundColor: PRIMARY_BLACK,
    borderRadius: 2,
    transition: 'width 0.3s ease',
  },

  // User Info
  welcomeText: {
    color: TEXT_LIGHT,
    fontSize: 14,
    display: 'block',
    marginBottom: 4,
  },
  subTitle: {
    color: TEXT_DARK,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    display: 'block',
  },

  // Stats
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
    display: 'flex',
    gap: 12,
  },
  statsContainerMobile: {
    flexDirection: 'column',
    marginBottom: 24,
    display: 'flex',
    gap: 12,
  },
  statsGrid: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: PRIMARY_WHITE,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    boxShadow: CARD_SHADOW,
    border: '1px solid ' + BORDER_COLOR,
  },
  statCardPrimary: {
    backgroundColor: PRIMARY_BLACK,
    minWidth: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
  },
  statCardPrimaryMobile: {
    backgroundColor: PRIMARY_BLACK,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '16px',
    gap: 16,
  },
  statTitle: {
    fontSize: 13,
    color: TEXT_LIGHT,
    textAlign: 'center',
    display: 'block',
  },
  statTitleLight: {
    fontSize: 14,
    color: METALLIC_SILVER,
    textAlign: 'left',
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: PRIMARY_BLACK,
    marginTop: 4,
  },
  statValueLight: {
    fontSize: 36,
    fontWeight: 'bold',
    color: PRIMARY_WHITE,
    textAlign: 'right',
  },
  statSubValue: {
    fontSize: 12,
    color: MERCEDES_BLUE,
    marginTop: 2,
    fontWeight: '500',
  },

  // Action Buttons
  actionButtons: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
    display: 'flex',
  },
  actionButtonsMobile: {
    flexDirection: 'column',
    marginBottom: 24,
    gap: 12,
    display: 'flex',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: PRIMARY_BLACK,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    border: 'none',
    cursor: 'default',
  },
  actionButtonMobile: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: PRIMARY_BLACK,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    border: 'none',
    cursor: 'default',
  },
  dangerButton: {
    backgroundColor: DANGER_RED,
  },
  actionButtonText: {
    color: PRIMARY_WHITE,
    fontWeight: '600',
    fontSize: 14,
  },

  // QR Section
  qrSection: {
    backgroundColor: PRIMARY_WHITE,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    boxShadow: CARD_SHADOW,
    border: '1px solid ' + BORDER_COLOR,
  },
  qrContainer: {
    backgroundColor: PRIMARY_WHITE,
    padding: 16,
    borderRadius: 12,
    marginVertical: 16,
    border: '1px solid ' + BORDER_COLOR,
  },
  linkText: {
    color: TEXT_LIGHT,
    fontSize: 12,
    textAlign: 'center',
    wordBreak: 'break-all',
  },

  // Sections
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: PRIMARY_BLACK,
    marginBottom: 20,
    margin: 0,
    letterSpacing: 0.3,
  },
  sectionTitleDark: {
    fontSize: 18,
    fontWeight: '600',
    color: PRIMARY_BLACK,
    marginBottom: 16,
    margin: 0,
  },

  // Form
  formSection: {
    backgroundColor: PRIMARY_WHITE,
    borderRadius: 16,
    padding: 28,
    boxShadow: CARD_SHADOW,
    border: '1px solid ' + BORDER_COLOR,
    maxWidth: 1000,
    margin: '0 auto',
    width: '100%',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
    display: 'flex',
    flexWrap: 'wrap',
  },
  inputContainer: {
    flex: 1,
    marginBottom: 8,
    minWidth: '80%',
  },
  inputLabel: {
    color: TEXT_DARK,
    fontSize: 13,
    marginBottom: 8,
    fontWeight: '500',
    display: 'block',
  },
  required: {
    color: DANGER_RED,
  },
  input: {
    backgroundColor: LIGHT_GREY,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 8,
    padding: '14px 16px',
    color: TEXT_DARK,
    fontSize: 15,
    width: '100%',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s',
    caretColor: 'auto',
  },
  textArea: {
    minHeight: 100,
    resize: 'vertical',
  },
  select: {
    backgroundColor: LIGHT_GREY,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 8,
    padding: '14px 16px',
    color: TEXT_DARK,
    fontSize: 15,
    width: '100%',
    fontFamily: 'inherit',
  },

  // Checkbox styles
  checkboxGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    marginTop: 4,
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'default',
    padding: '10px 12px',
    backgroundColor: LIGHT_GREY,
    borderRadius: 8,
    border: '1px solid ' + BORDER_COLOR,
    transition: 'all 0.2s',
  },
  checkbox: {
    width: 18,
    height: 18,
    marginRight: 12,
    cursor: 'default',
    accentColor: PRIMARY_BLACK,
  },
  checkboxText: {
    color: TEXT_DARK,
    fontSize: 14,
  },

  // Buttons
  nextButton: {
    backgroundColor: PRIMARY_BLACK,
    color: PRIMARY_WHITE,
    padding: 18,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    border: 'none',
    cursor: 'default',
    width: '100%',
    fontSize: 15,
    fontWeight: '600',
    display: 'flex',
    gap: 8,
  },
  backButton: {
    backgroundColor: 'transparent',
    color: TEXT_LIGHT,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    border: '1px solid ' + BORDER_COLOR,
    cursor: 'default',
    width: '100%',
    fontSize: 14,
    display: 'flex',
    gap: 8,
  },
  submitButton: {
    backgroundColor: SUCCESS_GREEN,
    color: PRIMARY_WHITE,
    padding: 18,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    border: 'none',
    cursor: 'default',
    width: '100%',
    fontSize: 15,
    fontWeight: '600',
    display: 'flex',
    gap: 8,
  },

  // Rating
  ratingGroup: {
    backgroundColor: LIGHT_GREY,
    borderRadius: 12,
    padding: 18,
    marginBottom: 12,
  },
  ratingLabel: {
    color: TEXT_DARK,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 14,
    display: 'block',
  },
  ratingHint: {
    color: TEXT_LIGHT,
    fontSize: 13,
    marginBottom: 24,
    marginTop: -12,
    textAlign: 'center',
  },
  surveyIntro: {
    color: TEXT_DARK,
    fontSize: 14,
    lineHeight: 1.6,
    marginBottom: 16,
    padding: '12px 16px',
    backgroundColor: LIGHT_GREY,
    borderRadius: 8,
    textAlign: 'center',
  },
  ratingGuide: {
    color: TEXT_LIGHT,
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 24,
    textAlign: 'center',
    padding: '8px 12px',
    backgroundColor: PRIMARY_WHITE,
    borderRadius: 6,
    border: '1px dashed ' + BORDER_COLOR,
  },
  ratingButtonWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  ratingNumber: {
    color: TEXT_DARK,
    fontSize: 14,
    fontWeight: '600',
  },
  ratingOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    display: 'flex',
  },
  logoRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    display: 'flex',
    width: '100%',
    maxWidth: 700,
    margin: '0 auto',
  },
  logoRatingButton: {
    width: 80,
    height: 56,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: BORDER_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PRIMARY_WHITE,
    cursor: 'default',
    transition: 'all 0.2s',
  },
  logoRatingButtonSelected: {
    backgroundColor: PRIMARY_BLACK,
    borderColor: PRIMARY_BLACK,
  },
  ratingButton: {
    width: 52,
    height: 52,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: BORDER_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PRIMARY_WHITE,
    cursor: 'default',
    transition: 'all 0.2s',
    flex: 1,
    maxWidth: 60,
  },
  ratingButtonSelected: {
    backgroundColor: PRIMARY_BLACK,
    borderColor: PRIMARY_BLACK,
  },
  ratingButtonText: {
    color: TEXT_DARK,
    fontSize: 18,
    fontWeight: '600',
  },
  ratingButtonTextSelected: {
    color: PRIMARY_WHITE,
  },

  // Success Banner
  successBanner: {
    backgroundColor: SUCCESS_GREEN,
    padding: 16,
    marginHorizontal: 24,
    marginTop: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  successText: {
    color: PRIMARY_WHITE,
    fontWeight: '600',
    fontSize: 15,
  },

  // Response Card
  emptyCard: {
    backgroundColor: PRIMARY_WHITE,
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    boxShadow: CARD_SHADOW,
    border: '1px solid ' + BORDER_COLOR,
  },
  emptyText: {
    color: TEXT_LIGHT,
    fontSize: 14,
  },
  responseCard: {
    backgroundColor: PRIMARY_WHITE,
    borderRadius: 12,
    padding: 18,
    marginBottom: 12,
    boxShadow: CARD_SHADOW,
    border: '1px solid ' + BORDER_COLOR,
  },
  responseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    display: 'flex',
  },
  responseName: {
    color: TEXT_DARK,
    fontSize: 16,
    fontWeight: '600',
  },
  responseDate: {
    color: TEXT_LIGHT,
    fontSize: 12,
  },
  divider: {
    height: 1,
    backgroundColor: BORDER_COLOR,
    marginVertical: 10,
  },
  responseText: {
    color: TEXT_LIGHT,
    fontSize: 13,
    marginBottom: 4,
    display: 'block',
  },
  ratingsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10,
    display: 'flex',
  },
  ratingBadge: {
    backgroundColor: PRIMARY_BLACK,
    color: PRIMARY_WHITE,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    fontSize: 13,
    fontWeight: '600',
  },
  commentText: {
    color: TEXT_LIGHT,
    fontSize: 13,
    marginTop: 10,
    fontStyle: 'italic',
    display: 'block',
  },

  // Drawer
  drawerOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
  mobileDrawer: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    width: 280,
    backgroundColor: PRIMARY_BLACK,
    zIndex: 1000,
    paddingTop: 50,
  },
  drawerContainer: {
    flex: 1,
    padding: 24,
  },
  drawerLogo: {
    marginBottom: 24,
    display: 'flex',
    justifyContent: 'center',
  },
  drawerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: PRIMARY_WHITE,
    marginBottom: 24,
    margin: 0,
  },
  drawerItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    background: 'transparent',
    borderLeft: 'none',
    borderRight: 'none',
    borderTop: 'none',
    cursor: 'default',
    width: '100%',
    textAlign: 'left',
  },
  drawerItemText: {
    color: PRIMARY_WHITE,
    fontSize: 16,
  },
  drawerCloseButton: {
    position: 'absolute',
    top: 10,
    right: 15,
    padding: 5,
    background: 'transparent',
    border: 'none',
    cursor: 'default',
  },

  // Login
loginContainer: {
  flex: 1,
  backgroundColor: LIGHT_GREY,
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 24,
},
  loginCard: {
    backgroundColor: PRIMARY_WHITE,
    borderRadius: 16,
    padding: 40,
    width: '100%',
    maxWidth: 800,
    boxShadow: CARD_SHADOW,
    border: '1px solid ' + BORDER_COLOR,
  },
  loginLogo: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 24,
  },
  loginTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: TEXT_DARK,
    textAlign: 'center',
    marginBottom: 8,
    margin: 0,
  },
  loginSubtitle: {
    fontSize: 14,
    color: TEXT_LIGHT,
    textAlign: 'center',
    marginBottom: 32,
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  loginButton: {
    backgroundColor: PRIMARY_BLACK,
    color: PRIMARY_WHITE,
    padding: 16,
    borderRadius: 8,
    fontSize: 16,
    fontWeight: '600',
    border: 'none',
    cursor: 'default',
    marginTop: 8,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  signupSwitchButton: {
    marginTop: 12,
    backgroundColor: 'transparent',
    color: PRIMARY_BLACK,
    border: `1px solid ${PRIMARY_BLACK}`,
    padding: '12px 24px',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 500,
    width: '100%',
    transition: 'all 0.2s ease',
  },
  successMessage: {
    color: '#28a745',
    backgroundColor: '#d4edda',
    border: '1px solid #c3e6cb',
    padding: '12px',
    borderRadius: 4,
    marginBottom: 16,
    textAlign: 'center',
    fontSize: 14,
  },
  errorMessage: {
    color: DANGER_RED,
    fontSize: 14,
    textAlign: 'center',
    padding: 12,
    backgroundColor: '#ffe6e6',
    borderRadius: 8,
  },

  // Unauthorized
  unauthorizedCard: {
    backgroundColor: PRIMARY_WHITE,
    borderRadius: 16,
    padding: 48,
    maxWidth: 400,
    width: '100%',
    margin: '0 auto',
    boxShadow: CARD_SHADOW,
    border: '1px solid ' + BORDER_COLOR,
    alignItems: 'center',
  },
  unauthorizedIcon: {
    marginBottom: 24,
  },
  unauthorizedTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: TEXT_DARK,
    textAlign: 'center',
    marginBottom: 24,
  },

  // User & Logout
  userName: {
    color: PRIMARY_WHITE,
    fontSize: 14,
    fontWeight: '500',
    marginRight: 12,
  },
  logoutButton: {
    backgroundColor: DANGER_RED,
    color: PRIMARY_WHITE,
    padding: '8px 16px',
    borderRadius: 6,
    fontSize: 13,
    fontWeight: '600',
    border: 'none',
    cursor: 'default',
  },
};

export default App;

