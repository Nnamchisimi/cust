<?php
$API_BASE = '/api';
 ?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Serhan Kombos Otomotiv - Customer Experience Survey</title>
<link rel="icon" href="/merclogo.png">
<link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>
<div id="app" class="app-container">
  <div id="survey-view" class="survey-container">
    <header class="header header-main">
      <div class="brand-row">
        <img src="/merclogo.png" alt="Mercedes Logo" class="logo-star logo-star-lg">
        <h1 class="header-title-main" data-i18n="headerTitle">Serhan Kombos Otomotiv</h1>
        <h1 class="header-title-main2" data-i18n="headerSubtitle">Customer Experience Survey</h1>
      </div>
      <div class="header-right">
        <button id="lang-toggle" class="language-button">TR</button>
        <button id="menu-btn" class="menu-button" onclick="openDrawer()"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/></svg></button>
      </div>
    </header>

    <div id="success-banner" class="success-banner" style="display:none">
      <span data-i18n="thankYou">Thank you for your feedback!</span>
    </div>

    <div id="drawer-overlay" class="drawer-overlay" style="display:none" onclick="closeDrawer()"></div>
    <div id="mobile-drawer" class="mobile-drawer" style="display:none">
      <div class="drawer-container">
        <div class="drawer-logo"><img src="/merclogo.png" alt="Logo" class="logo-star" style="width:48px"></div>
        <h2 class="drawer-title" data-i18n="menu">Menu</h2>
        <button class="drawer-item" onclick="closeDrawer();window.location.href='/admin.php'"><span data-i18n="adminPanel">Admin Panel</span></button>
      </div>
      <button class="drawer-close-button" onclick="closeDrawer()"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
    </div>

    <div style="flex:1;overflow-y:auto">
      <div class="form-content">
        <div id="survey-form" class="form-wrapper">
          <div class="progress-container">
            <div class="progress-step" id="step1-ind">
              <div class="progress-circle" id="step1-circle">1</div>
              <span class="progress-label" id="step1-label" data-i18n="yourInfo">Your Information</span>
            </div>
            <div class="progress-line"><div class="progress-line-fill" id="progress-fill"></div></div>
            <div class="progress-step" id="step2-ind">
              <div class="progress-circle" id="step2-circle">2</div>
              <span class="progress-label" id="step2-label" data-i18n="rateExperience">Rate Your Experience</span>
            </div>
          </div>

          <div id="step1">
            <div class="form-section">
              <h2 class="section-title" data-i18n="yourInfo">Your Information</h2>
              <div class="input-row">
                <div class="input-container">
                  <span class="input-label"><span data-i18n="firstName">First Name</span> <span class="required">*</span></span>
                  <input class="input" id="firstName" placeholder="Enter first name">
                </div>
                <div class="input-container">
                  <span class="input-label"><span data-i18n="lastName">Last Name</span> <span class="required">*</span></span>
                  <input class="input" id="lastName" placeholder="Enter last name">
                </div>
              </div>
              <div class="input-row">
                <div class="input-container">
                  <span class="input-label" data-i18n="phone">Phone Number</span>
                  <input class="input" id="phone" placeholder="+90 5XX XXX XXXX">
                </div>
                <div class="input-container">
                  <span class="input-label"><span data-i18n="licensePlate">License Plate</span> <span class="required">*</span></span>
                  <input class="input" id="licensePlate" placeholder="e.g., VV001">
                </div>
              </div>
              <h2 class="section-title" style="margin-top:32px" data-i18n="serviceInfo">Service Information</h2>
              <div class="input-row">
                <div class="input-container">
                  <span class="input-label"><span data-i18n="selectBranch">Select Branch</span> <span class="required">*</span></span>
                  <select class="select" id="branch" onchange="onBranchChange()">
                    <option value="" data-i18n="selectBranch">Select Branch</option>
                    <option value="Lefkosa">Lefkosa</option>
                    <option value="Haspolat">Haspolat</option>
                    <option value="Girne">Girne</option>
                  </select>
                </div>
                <div class="input-container" id="dept-container" style="display:none">
                  <span class="input-label"><span data-i18n="selectDepartment">Select Department</span> <span class="required">*</span></span>
                  <div class="checkbox-group" id="dept-checkboxes"></div>
                </div>
              </div>
              <button class="next-button" onclick="goToStep2()">
                <span data-i18n="continueToRating">Continue to Rating</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>

          <div id="step2" style="display:none">
            <div class="form-section">
              <button class="back-button" onclick="goToStep1()">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                <span data-i18n="backToInfo">Back to Information</span>
              </button>
              <h2 class="section-title" data-i18n="rateExperience">Rate Your Experience</h2>
              <p class="survey-intro" data-i18n="surveyIntro">We kindly ask you to evaluate your most recent visit to our service by rating each question below on a scale of 1 to 5, by selecting the corresponding star. A rating of 5 represents the highest, 3 represents average and 1 represents the lowest. Thank you for choosing Kombos Automotive for your satisfaction and valuable feedback. Kombos Automotive After-Sales Services Directorate</p>
              <p class="rating-guide" data-i18n="ratingGuide">1 = Not Satisfied | 2 = Fair | 3 = Average | 4 = Good | 5 = Excellent</p>
              <div id="rating-groups"></div>
              <h2 class="section-title" style="margin-top:32px" data-i18n="additionalComments">Additional Comments</h2>
              <textarea class="input textarea" id="comments" placeholder="Share your feedback with us (optional)" rows="4"></textarea>
              <button class="submit-button" onclick="submitSurvey()">
                <span data-i18n="submitFeedback">Submit Feedback</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
const API_BASE = '<?php echo $API_BASE ?>';
let currentLang = 'en';
let currentStep = 1;
let selectedDepartments = [];
let ratings = { overallSatisfaction: null, maintenance: null, bodywork: null, appointment: null, advisor: null, workshopRepair: null, carWash: null };

const T = {
  en: {
    headerTitle:'Serhan Kombos Otomotiv',headerSubtitle:'Customer Experience Survey',
    yourInfo:'Your Information',firstName:'First Name',firstNamePlaceholder:'Enter first name',
    lastName:'Last Name',lastNamePlaceholder:'Enter last name',phone:'Phone Number',phonePlaceholder:'+90 5XX XXX XXXX',
    licensePlate:'License Plate',licensePlatePlaceholder:'e.g., VV001',serviceInfo:'Service Information',
    selectBranch:'Select Branch',selectDepartment:'Select Department',continueToRating:'Continue to Rating',
    rateExperience:'Rate Your Experience',ratingHint:'5 = Excellent | 3 = Average | 1 = Poor',
    surveyIntro:'We kindly ask you to evaluate your most recent visit to our service by rating each question below on a scale of 1 to 5, by selecting the corresponding star. A rating of 5 represents the highest, 3 represents average and 1 represents the lowest. Thank you for choosing Kombos Automotive for your satisfaction and valuable feedback. Kombos Automotive After-Sales Services Directorate',
    ratingGuide:'1 = Not Satisfied | 2 = Fair | 3 = Average | 4 = Good | 5 = Excellent',
    overallSatisfaction:'General Satisfaction',appointment:'Appointment',advisor:'Advisor',
    workshopRepair:'Workshop Repair',carWash:'Car Wash',maintenance:'Maintenance – Mechanical – Electrical',
    bodywork:'Bodywork – Paint',additionalComments:'Additional Comments',commentsPlaceholder:'Share your feedback with us (optional)',
    submitFeedback:'Submit Feedback',backToInfo:'Back to Information',
    adminPanel:'Admin Panel',menu:'Menu',takeSurvey:'Take Survey',
    thankYou:'Thank you for your feedback!',fillRequired:'Please fill in all required fields and select at least one department!',
    rateOverall:'Please rate your overall satisfaction!',noDataExport:'No data to export!',
    confirmClear:'Are you sure you want to delete all survey responses?',
    login:'Login',signup:'Sign Up',username:'Username',password:'Password',confirmPassword:'Confirm Password',
    loginButton:'Sign In',signupButton:'Sign Up',loginError:'Invalid username or password',
    signupError:'Username already exists',signupSuccess:'Account created successfully! Please login.',
    logout:'Logout',adminAccess:'Admin Access Required',unauthorized:'You do not have permission to access this page',
    goBack:'Go Back',noResponses:'No responses yet',totalResponses:'Total Responses',exportExcel:'Export to Excel',
    clearData:'Clear Data',scanToAccess:'Scan to Access Survey',surveyResponses:'Survey Responses',
    overview:'Overview',surveyDashboard:'Survey Management Dashboard'
  },
  tr: {
    headerTitle:'Serhan Kombos Otomotiv',headerSubtitle:'Müşteri Deneyimi Anketi',
    yourInfo:'Bilgileriniz',firstName:'Ad',firstNamePlaceholder:'Adınızı girin',
    lastName:'Soyad',lastNamePlaceholder:'Soyadınızı girin',phone:'Telefon Numarası',phonePlaceholder:'+90 5XX XXX XXXX',
    licensePlate:'Plaka',licensePlatePlaceholder:'örn: 01-A-001',serviceInfo:'Servis Bilgileri',
    selectBranch:'Şube Seçin',selectDepartment:'Departman Seçin',continueToRating:'Derecelendirmeye Geç',
    rateExperience:'Deneyiminizi Puanlayın',ratingHint:'5 = Mükemmel | 3 = Orta | 1 = Kötü',
    surveyIntro:'Hizmetimize en son yaptığınız ziyareti aşağıdaki soruları 1 ila 5 arasında puanlayarak değerlendirmenizi saygıyla rica ederiz. 5 en yüksek puanı, 3 ortalama puanı ve 1 en düşük puanı temsil eder. Memnuniyetiniz ve değerli geri bildirimleriniz için Kombos Otomotiv\'i seçtiğiniz için teşekkür ederiz. Kombos Otomotiv Satış Sonrası Hizmetler Müdürlüğü',
    ratingGuide:'1 = Memnun Değil | 2 = Kötü | 3 = Orta | 4 = İyi | 5 = Mükemmel',
    overallSatisfaction:'Genel Memnuniyet',appointment:'Randevu',advisor:'Danışman',
    workshopRepair:'Atölye Tamiri',carWash:'Yıkama',maintenance:'Bakım – Mekanik – Elektrik',
    bodywork:'Karoser – Boya',additionalComments:'Ek Yorumlar',commentsPlaceholder:'Görüşlerinizi bizimle paylaşın (isteğe bağlı)',
    submitFeedback:'Geri Bildirim Gönder',backToInfo:'Bilgilere Geri Dön',
    adminPanel:'Yönetici Paneli',menu:'Menü',takeSurvey:'Ankete Katıl',
    thankYou:'Geri bildiriminiz için teşekkür ederiz!',fillRequired:'Lütfen tüm zorunlu alanları doldurun ve en az bir departman seçin!',
    rateOverall:'Lütfen genel memnuniyetinizi puanlayın!',noDataExport:'İndirilecek veri yok!',
    confirmClear:'Tüm anket yanıtlarını silmek istediğinizden emin misiniz?',
    login:'Giriş',signup:'Kayıt Ol',username:'Kullanıcı Adı',password:'Şifre',confirmPassword:'Şifreyi Onayla',
    loginButton:'Giriş Yap',signupButton:'Kayıt Ol',loginError:'Kullanıcı adı veya şifre hatalı',
    signupError:'Kullanıcı adı zaten mevcut',signupSuccess:'Hesap başarıyla oluşturuldu! Lütfen giriş yapın.',
    logout:'Çıkış Yap',adminAccess:'Yönetici Erişimi Gerekli',unauthorized:'Bu sayfaya erişim izniniz yok',
    goBack:'Geri Dön',noResponses:'Henüz yanıt yok',totalResponses:'Toplam Yanıtlar',exportExcel:'Excel İndir',
    clearData:'Verileri Sil',scanToAccess:'Ankete Erişmek için Tarayın',surveyResponses:'Anket Yanıtları',
    overview:'Genel Bakış',surveyDashboard:'Anket Yönetim Dashboard'
  }
};

function t(key) { return T[currentLang][key] || key; }

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (T[currentLang][key]) el.textContent = T[currentLang][key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (T[currentLang][key]) el.placeholder = T[currentLang][key];
  });
}

document.getElementById('lang-toggle').addEventListener('click', function() {
  currentLang = currentLang === 'en' ? 'tr' : 'en';
  this.textContent = currentLang === 'en' ? 'TR' : 'EN';
  applyTranslations();
  updateRatingLabels();
});

function openDrawer() { document.getElementById('drawer-overlay').style.display='block'; document.getElementById('mobile-drawer').style.display='flex'; }
function closeDrawer() { document.getElementById('drawer-overlay').style.display='none'; document.getElementById('mobile-drawer').style.display='none'; }

function onBranchChange() {
  const branch = document.getElementById('branch').value;
  const container = document.getElementById('dept-container');
  const checkboxes = document.getElementById('dept-checkboxes');
  selectedDepartments = [];
  if (!branch) { container.style.display='none'; return; }
  container.style.display='block';
  let depts = [{id:'maintenance',name:t('maintenance')}];
  if (branch === 'Haspolat') depts.push({id:'bodywork',name:t('bodywork')});
  checkboxes.innerHTML = depts.map(d => `<label class="checkbox-label"><input type="checkbox" value="${d.id}" onchange="toggleDept('${d.id}')"><span class="checkbox-text">${d.name}</span></label>`).join('');
}

function toggleDept(id) {
  if (selectedDepartments.includes(id)) selectedDepartments = selectedDepartments.filter(d=>d!==id);
  else selectedDepartments.push(id);
}

function buildRatingGroups() {
  const container = document.getElementById('rating-groups');
  const branch = document.getElementById('branch').value;
  let fields = [
    {key:'overallSatisfaction',label:t('overallSatisfaction'),required:true},
    {key:'appointment',label:t('appointment')},
    {key:'advisor',label:t('advisor')},
    {key:'workshopRepair',label:t('workshopRepair')},
    {key:'carWash',label:t('carWash')}
  ];
  if (branch === 'Haspolat' && selectedDepartments.includes('bodywork')) {
    fields.push({key:'bodywork',label:t('bodywork')});
  }
  container.innerHTML = fields.map(f => `
    <div class="rating-group">
      <span class="rating-label">${f.label}${f.required?' <span class="required">*</span>':''}</span>
      <div class="logo-rating-container">
        ${[1,2,3,4,5].map(n => `
          <div class="rating-button-wrapper">
            <button class="logo-rating-button ${ratings[f.key] && ratings[f.key] >= n ? 'selected' : ''}" onclick="setRating('${f.key}',${n})" type="button">
              <img src="/merclogo.png" alt="star" style="width:36px;height:auto;filter:${ratings[f.key] && ratings[f.key] >= n ? 'none' : 'grayscale(1) opacity(0.5)'}">
            </button>
            <span class="rating-number">${n}</span>
          </div>`).join('')}
      </div>
    </div>`).join('');
}

function updateRatingLabels() {
  buildRatingGroups();
}

function setRating(key, val) {
  ratings[key] = ratings[key] === val ? null : val;
  buildRatingGroups();
}

function goToStep1() {
  currentStep = 1;
  document.getElementById('step1').style.display='block';
  document.getElementById('step2').style.display='none';
  document.getElementById('step1-circle').classList.add('progress-circle-active');
  document.getElementById('step2-circle').classList.remove('progress-circle-active');
  document.getElementById('step1-label').classList.add('progress-label-active');
  document.getElementById('step2-label').classList.remove('progress-label-active');
  document.getElementById('progress-fill').style.width='0%';
}

function goToStep2() {
  const fn = document.getElementById('firstName').value.trim();
  const ln = document.getElementById('lastName').value.trim();
  const lp = document.getElementById('licensePlate').value.trim();
  const br = document.getElementById('branch').value;
  if (!fn || !ln || !lp || !br || selectedDepartments.length === 0) { alert(t('fillRequired')); return; }
  currentStep = 2;
  document.getElementById('step1').style.display='none';
  document.getElementById('step2').style.display='block';
  document.getElementById('step2-circle').classList.add('progress-circle-active');
  document.getElementById('step2-label').classList.add('progress-label-active');
  document.getElementById('progress-fill').style.width='100%';
  buildRatingGroups();
}

async function submitSurvey() {
  if (!ratings.overallSatisfaction) { alert(t('rateOverall')); return; }
  const data = {
    date: new Date().toISOString(),
    firstName: document.getElementById('firstName').value.trim(),
    lastName: document.getElementById('lastName').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    licensePlate: document.getElementById('licensePlate').value.trim(),
    branch: document.getElementById('branch').value,
    department: selectedDepartments,
    overallSatisfaction: ratings.overallSatisfaction,
    maintenance: ratings.maintenance,
    bodywork: ratings.bodywork,
    appointment: ratings.appointment,
    advisor: ratings.advisor,
    workshopRepair: ratings.workshopRepair,
    carWash: ratings.carWash,
    comments: document.getElementById('comments').value.trim()
  };
  try {
    const res = await fetch(`${API_BASE}/survey.php?action=responses`, {
      method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(data)
    });
    if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.error || 'Failed'); }
  } catch(e) { alert('Failed to submit. Please try again.'); return; }
  document.getElementById('firstName').value = '';
  document.getElementById('lastName').value = '';
  document.getElementById('phone').value = '';
  document.getElementById('licensePlate').value = '';
  document.getElementById('branch').value = '';
  document.getElementById('dept-container').style.display='none';
  selectedDepartments = [];
  ratings = { overallSatisfaction: null, maintenance: null, bodywork: null, appointment: null, advisor: null, workshopRepair: null, carWash: null };
  document.getElementById('comments').value = '';
  goToStep1();
  const banner = document.getElementById('success-banner');
  banner.style.display='flex';
  setTimeout(() => banner.style.display='none', 4000);
}
</script>
</body>
</html>
