<?php $API_BASE = '/api'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Admin Panel - Serhan Kombos Otomotiv</title>
<link rel="icon" href="/merclogo.png">
<link rel="stylesheet" href="/assets/css/style.css">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
:root{--bg:#0a0a0a;--bg2:#111;--bg3:#1a1a1a;--bg4:#222;--border:#333;--border2:#444;--text:#fff;--text2:#999;--text3:#666;--text4:#555;--accent:#fff;--accent-text:#000}
.light-mode{--bg:#f5f5f5;--bg2:#fff;--bg3:#eee;--bg4:#ddd;--border:#ccc;--border2:#bbb;--text:#111;--text2:#555;--text3:#777;--text4:#999;--accent:#111;--accent-text:#fff}
*{scrollbar-width:none}
::-webkit-scrollbar{display:none}
.responses-card{scrollbar-width:thin !important}
.responses-card::-webkit-scrollbar{display:block !important;width:6px !important}
.responses-card::-webkit-scrollbar-track{background:transparent !important}
.responses-card::-webkit-scrollbar-thumb{background:var(--border) !important;border-radius:3px !important}
.responses-card::-webkit-scrollbar-thumb:hover{background:var(--border2) !important}
html,body{height:100%;width:100%;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;-webkit-font-smoothing:antialiased;background:var(--bg);color:var(--text);transition:background .3s,color .3s;overflow-x:hidden;max-width:100%;position:fixed;top:0;left:0;right:0;bottom:0}

.settings-panel{position:fixed;top:0;right:-320px;width:320px;height:100vh;background:var(--bg2);border-left:1px solid var(--border);z-index:300;transition:right .3s;overflow-y:auto;padding:24px}
.settings-panel.open{right:0}
.settings-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:299;display:none}
.settings-overlay.open{display:block}
.settings-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:28px}
.settings-header h2{font-size:16px;font-weight:700}
.settings-close{background:transparent;border:1px solid var(--border);color:var(--text2);width:32px;height:32px;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s}
.settings-close:hover{border-color:var(--border2);color:var(--text)}
.settings-group{margin-bottom:24px}
.settings-group h3{font-size:11px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:1px;margin-bottom:12px}
.theme-toggle{display:flex;gap:8px}
.theme-btn{flex:1;padding:10px;border-radius:10px;font-size:13px;font-weight:600;border:1px solid var(--border);background:transparent;color:var(--text2);cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:8px}
.theme-btn.active{background:var(--accent);color:var(--accent-text);border-color:var(--accent)}
.theme-btn:hover:not(.active){border-color:var(--border2);color:var(--text)}

.login-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px;background:linear-gradient(135deg,var(--bg) 0%,var(--bg3) 50%,var(--bg) 100%);width:100%;box-sizing:border-box;overflow-x:hidden}
.login-header{width:100%;background:var(--bg2);border-bottom:1px solid var(--border);padding:0 24px;height:64px;display:flex;align-items:center;justify-content:space-between;position:fixed;top:0;left:0;z-index:100}
.login-header-left{display:flex;align-items:center;gap:14px}
.login-header-left img{width:32px}
.login-header-title{font-size:16px;font-weight:700;letter-spacing:-.3px}
.login-header-right{display:flex;align-items:center;gap:12px}
.login-header-home{color:var(--text2);font-size:13px;font-weight:600;text-decoration:none;padding:6px 14px;border:1px solid var(--border);border-radius:8px;transition:all .2s}
.login-header-home:hover{border-color:var(--border2);color:var(--text)}
.login-spacer{height:80px;flex-shrink:0}
.login-box{width:100%;max-width:420px;background:var(--bg2);border:1px solid var(--border);border-radius:20px;padding:40px;box-shadow:0 25px 60px rgba(0,0,0,.3)}
.login-logo{text-align:center;margin-bottom:24px}
.login-logo img{width:64px;filter:brightness(1.2)}
.login-title{font-size:24px;font-weight:800;text-align:center;margin-bottom:4px;letter-spacing:-.5px}
.login-subtitle{font-size:13px;color:var(--text3);text-align:center;margin-bottom:28px}
.form-group{margin-bottom:16px}
.form-group label{display:block;font-size:12px;font-weight:600;color:var(--text2);margin-bottom:6px;text-transform:uppercase;letter-spacing:.5px}
.form-group input{width:100%;background:var(--bg3);border:1px solid var(--border);border-radius:10px;padding:14px 16px;color:var(--text);font-size:15px;font-family:inherit;transition:all .2s}
.form-group input:focus{outline:none;border-color:var(--border2);background:var(--bg4)}
.form-group input::placeholder{color:var(--text4)}
.btn{width:100%;padding:14px;border-radius:10px;font-size:14px;font-weight:700;border:none;cursor:pointer;transition:all .2s;letter-spacing:.3px}
.btn-primary{background:var(--accent);color:var(--accent-text)}
.btn-primary:hover{opacity:.85}
.btn-primary:disabled{background:var(--bg4);color:var(--text4)}
.btn-danger{background:#dc2626;color:#fff}
.btn-danger:hover{background:#b91c1c}
.btn-outline{background:transparent;color:var(--text2);border:1px solid var(--border)}
.btn-outline:hover{border-color:var(--border2);color:var(--text)}
.btn-icon{background:transparent;border:1px solid var(--border);color:var(--text2);padding:8px;border-radius:8px;cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:center}
.btn-icon:hover{border-color:var(--border2);color:var(--text)}
.switch-text{text-align:center;margin-top:20px;font-size:13px;color:var(--text3)}
.switch-text a{color:var(--text);text-decoration:none;font-weight:600}
.switch-text a:hover{text-decoration:underline}
.msg{padding:12px;border-radius:8px;font-size:13px;margin-bottom:16px;display:none}
.msg-error{background:rgba(220,38,38,.15);color:#f87171;border:1px solid rgba(220,38,38,.3)}
.msg-success{background:rgba(34,197,94,.15);color:#4ade80;border:1px solid rgba(34,197,94,.3)}

.admin-layout{height:100%;width:100%;display:flex;flex-direction:column;overflow-x:hidden;overflow-y:auto;position:relative}
.topbar{background:var(--bg2);border-bottom:1px solid var(--border);padding:0 24px;height:64px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100;flex-shrink:0;box-sizing:border-box;width:100%}
.topbar-left{display:flex;align-items:center;gap:14px}
.topbar-left img{width:32px}
.topbar-title{font-size:16px;font-weight:700;letter-spacing:-.3px}
.topbar-right{display:flex;align-items:center;gap:12px}
.user-badge{background:var(--bg3);padding:6px 14px;border-radius:20px;font-size:12px;font-weight:600;color:var(--text2);display:flex;align-items:center;gap:6px}
.user-badge .dot{width:6px;height:6px;background:#22c55e;border-radius:50%}
.btn-logout{background:transparent;border:1px solid var(--border);color:var(--text2);padding:8px 14px;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;transition:all .2s;display:flex;align-items:center;gap:6px}
.btn-logout:hover{border-color:var(--border2);color:var(--text)}

.main{padding:24px;max-width:1400px;margin:0 auto;width:100%;box-sizing:border-box;flex:1;min-height:0;overflow-y:auto;display:flex;flex-direction:column}
.stat-row{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px}
.stat-box{background:var(--bg2);border:1px solid var(--border);border-radius:16px;padding:24px;position:relative;overflow:hidden}
.stat-box::after{content:'';position:absolute;top:0;right:0;width:80px;height:80px;border-radius:50%;opacity:.05;filter:blur(20px)}
.stat-box.total::after{background:#3b82f6}
.stat-box.lefkosa::after{background:#22c55e}
.stat-box.haspolat::after{background:#f59e0b}
.stat-box.girne::after{background:#a855f7}
.stat-label{font-size:11px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:1px;margin-bottom:8px}
.stat-number{font-size:36px;font-weight:800;letter-spacing:-1px;line-height:1}
.stat-detail{font-size:12px;color:var(--text3);margin-top:6px}
.stat-detail span{color:#22c55e;font-weight:600}
.stat-detail.amber span{color:#f59e0b}

.toolbar{display:flex;gap:12px;margin-bottom:16px;flex-wrap:wrap;flex-shrink:0}
.toolbar .btn{width:auto;padding:12px 20px;font-size:13px;display:flex;align-items:center;gap:8px}
.toolbar .btn svg{flex-shrink:0}

.section{margin-bottom:32px;display:flex;flex-direction:column;min-height:0}
.section-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;flex-shrink:0}
.section-head h2{font-size:14px;font-weight:700;color:var(--text2);text-transform:uppercase;letter-spacing:1px}
.section-head .count{font-size:12px;color:var(--text4);background:var(--bg3);padding:4px 10px;border-radius:12px}

.responses-card{background:var(--bg2);border:1px solid var(--border);border-radius:16px;padding:20px;box-shadow:0 2px 12px rgba(0,0,0,.06);min-height:300px;overflow-y:auto;max-height:60vh}

.card-list{display:flex;flex-direction:column;gap:16px}
.response-card{background:var(--bg3);border:1px solid transparent;border-radius:12px;transition:all .2s}
.response-card:hover{border-color:var(--border);background:var(--bg4)}
.card-header{display:flex;align-items:center;justify-content:space-between;padding:14px 18px;cursor:pointer;user-select:none;transition:background .2s;border-radius:12px}
.card-header:hover{background:var(--bg4)}
.response-card.open .card-header{border-radius:12px 12px 0 0}
.card-header-left{display:flex;align-items:center;gap:14px}
.card-avatar{width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,var(--bg4),var(--border2));display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;color:var(--text);flex-shrink:0}
.card-header-info{display:flex;flex-direction:column;gap:4px}
.card-header-name{font-size:15px;font-weight:700}
.card-header-meta{display:flex;gap:6px;flex-wrap:wrap}
.card-header-tag{background:var(--bg3);padding:3px 10px;border-radius:6px;font-size:11px;font-weight:500;color:var(--text2)}
.card-header-right{display:flex;align-items:center;gap:12px}
.overall-score{background:var(--bg3);padding:6px 12px;border-radius:8px;font-size:14px;font-weight:700;display:flex;align-items:center;gap:4px}
.overall-score .star{color:#f59e0b;font-size:14px}
.card-header-date{font-size:11px;color:var(--text4);font-weight:500}
.card-chevron{width:20px;height:20px;color:var(--text3);transition:transform .25s;flex-shrink:0}
.response-card.open .card-chevron{transform:rotate(180deg)}
.card-body{max-height:0;overflow:hidden;transition:max-height .3s ease}
.response-card.open .card-body{max-height:2000px}
.card-body-inner{padding:16px 18px;border-top:1px solid var(--border)}
.card-meta{display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap;padding-bottom:16px;border-bottom:1px solid var(--border)}
.meta-tag{background:var(--bg3);padding:5px 12px;border-radius:6px;font-size:11px;font-weight:500;color:var(--text2);display:flex;align-items:center;gap:4px}
.rating-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;background:var(--bg);border-radius:12px;padding:16px}
.rating-item{display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--bg2);border-radius:8px}
.rating-item .lbl{font-size:11px;color:var(--text3);font-weight:500}
.rating-item .val{font-size:13px;font-weight:700;display:flex;align-items:center;gap:4px}
.star{color:#f59e0b;font-size:14px}
.card-comment{margin-top:16px;padding:14px;background:var(--bg);border-radius:10px;font-size:13px;color:var(--text2);line-height:1.6;border-left:3px solid var(--border2)}

.empty-state{text-align:center;padding:50px 20px;color:var(--text4)}
.empty-state svg{margin-bottom:16px;opacity:.3}
.empty-state p{font-size:14px;font-weight:500}
.empty-state p span{display:block;font-size:12px;color:var(--text4);margin-top:6px;font-weight:400}

.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.7);display:flex;align-items:center;justify-content:center;z-index:200;padding:20px;display:none}
.modal{background:var(--bg2);border:1px solid var(--border);border-radius:16px;padding:32px;max-width:400px;width:100%;text-align:center;position:relative}
.modal h3{font-size:18px;font-weight:700;margin-bottom:8px}
.modal p{font-size:13px;color:var(--text3);margin-bottom:24px}
.modal-actions{display:flex;gap:12px}
.modal-actions .btn{flex:1}
.modal-close-x{position:absolute;top:12px;right:12px;background:transparent;border:1px solid var(--border);color:var(--text2);width:32px;height:32px;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;z-index:10}
.modal-close-x:hover{border-color:var(--border2);color:var(--text)}

.qr-modal{max-width:380px}
.qr-link-row{display:flex;gap:8px}
.qr-link-row input{flex:1;background:var(--bg3);border:1px solid var(--border);border-radius:10px;padding:10px 14px;color:var(--text);font-size:13px;font-family:inherit;min-width:0}
.qr-link-row input:focus{outline:none;border-color:var(--border2)}
.qr-copy-btn{width:auto;padding:10px 16px;font-size:13px;flex-shrink:0}
#qrcode-container canvas,#qrcode-container img{border-radius:12px}

@media(max-width:1024px){.stat-row{grid-template-columns:repeat(2,1fr)}}
@media(max-width:640px){
  .stat-row{grid-template-columns:1fr}
  .stat-number{font-size:28px}
  .topbar{padding:0 12px}
  .topbar-title{display:none}
  .main{padding:12px}
  .toolbar{flex-direction:column}
  .toolbar .btn{width:100%;justify-content:center}
  .login-box{padding:24px}
  .rating-grid{grid-template-columns:1fr 1fr}
  .settings-panel{width:100%;right:-100%}
  .card-header{padding:10px 12px;gap:6px}
  .card-header-left{gap:8px}
  .card-avatar{width:32px;height:32px;font-size:13px}
  .card-header-name{font-size:13px}
  .card-header-tag{font-size:10px;padding:2px 6px}
  .overall-score{font-size:12px;padding:4px 8px}
  .card-header-right{width:100%;justify-content:flex-end}
  .responses-card{padding:12px}
  .card-body-inner{padding:12px}
  .rating-grid{padding:10px;gap:6px}
  .rating-item{padding:6px 8px}
  .rating-item .lbl{font-size:10px}
  .rating-item .val{font-size:11px}
  .card-comment{padding:10px;font-size:12px}
  .modal{padding:24px}
  .modal-actions{flex-direction:column}
  .qr-link-row{flex-direction:column}
  .login-wrap{padding:12px}
  .login-header{padding:0 12px}
  .login-header-title{font-size:13px}
  .user-badge{display:none}
  .stat-box{padding:16px}
  .stat-label{font-size:10px}
  .section{margin-bottom:16px}
  .responses-card{padding:12px;min-height:400px;max-height:65vh}
}
</style>
</head>
<body>

<div class="settings-overlay" id="settings-overlay" onclick="toggleSettings()"></div>
<div class="settings-panel" id="settings-panel">
  <div class="settings-header">
    <h2 data-i18n="settings">Settings</h2>
    <button class="settings-close" onclick="toggleSettings()">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
  </div>
  <div class="settings-group">
    <h3 data-i18n="theme">Theme</h3>
    <div class="theme-toggle">
    <button class="theme-btn active" id="btn-dark" onclick="setTheme('dark')">
         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
         <span data-i18n="dark">Dark</span>
       </button>
       <button class="theme-btn" id="btn-light" onclick="setTheme('light')">
         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
         <span data-i18n="light">Light</span>
      </button>
    </div>
  </div>
</div>

<div id="login-view" class="login-wrap" style="flex-direction:column">
  <div class="login-header">
    <div class="login-header-left">
      <img src="/merclogo.png" alt="Logo">
      <span class="login-header-title">Serhan Kombos Otomotiv</span>
    </div>
    <div class="login-header-right">
      <button class="btn-icon" onclick="toggleSettings()" title="Settings">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
      </button>
      <a href="/" class="login-header-home" data-i18n="home">Home</a>
    </div>
  </div>
  <div class="login-spacer"></div>
  <div class="login-box">
    <div class="login-logo"><img src="/merclogo.png" alt="Logo"></div>
    <h1 class="login-title" data-i18n="adminPanel">Admin Panel</h1>
    <p class="login-subtitle">Serhan Kombos Otomotiv</p>
    <div id="login-error" class="msg msg-error"></div>
    <form onsubmit="handleLogin(event)">
      <div class="form-group"><label data-i18n="username">Username</label><input id="login-username" type="text" placeholder="Enter username" required></div>
      <div class="form-group"><label data-i18n="password">Password</label><input id="login-password" type="password" placeholder="Enter password" required></div>
      <button class="btn btn-primary" type="submit" id="login-btn" data-i18n="signIn">Sign In</button>
    </form>
    <p class="switch-text"><span data-i18n="needAccount">Need an account?</span> <a href="#" onclick="showSignupView()" data-i18n="signUp">Sign Up</a></p>
  </div>
</div>

<div id="signup-view" class="login-wrap" style="flex-direction:column;display:none">
  <div class="login-header">
    <div class="login-header-left">
      <img src="/merclogo.png" alt="Logo">
      <span class="login-header-title">Serhan Kombos Otomotiv</span>
    </div>
    <div class="login-header-right">
      <button class="btn-icon" onclick="toggleSettings()" title="Settings">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
      </button>
      <a href="/" class="login-header-home" data-i18n="home">Home</a>
    </div>
  </div>
  <div class="login-spacer"></div>
  <div class="login-box">
    <div class="login-logo"><img src="/merclogo.png" alt="Logo"></div>
    <h1 class="login-title" id="signup-title" data-i18n="createAccount">Create Account</h1>
    <p class="login-subtitle" id="signup-subtitle" data-i18n="requestAccess">Request admin access</p>
    <div id="signup-error" class="msg msg-error"></div>
    <div id="signup-success" class="msg msg-success"></div>
    <div id="signup-register">
      <form onsubmit="handleSignup(event)">
        <div class="form-group"><label data-i18n="username">Username</label><input id="signup-username" type="text" placeholder="Choose username" required></div>
        <div class="form-group"><label data-i18n="email">Email</label><input id="signup-email" type="email" placeholder="your@email.com" required></div>
        <div class="form-group"><label data-i18n="password">Password</label><input id="signup-password" type="password" placeholder="Min 6 characters" required></div>
        <div class="form-group"><label data-i18n="confirmPassword">Confirm Password</label><input id="signup-confirm" type="password" placeholder="Repeat password" required></div>
        <button class="btn btn-primary" type="submit" id="signup-btn" data-i18n="sendCode">Send Verification Code</button>
      </form>
    </div>
    <div id="signup-verify" style="display:none">
      <form onsubmit="handleVerify(event)">
        <div class="form-group"><label data-i18n="verificationCode">Verification Code</label><input id="signup-code" type="text" placeholder="6-digit code" maxlength="6" required></div>
        <p style="font-size:12px;color:var(--text3);margin-bottom:16px"><span data-i18n="codeSentTo">Code sent to</span> <span id="verify-email" style="color:var(--text);font-weight:600"></span></p>
        <button class="btn btn-primary" type="submit" id="verify-btn" data-i18n="verify">Verify Email</button>
      </form>
      <button class="btn btn-outline" style="margin-top:12px" onclick="handleResendCode()" data-i18n="resendCode">Resend Code</button>
    </div>
    <p class="switch-text"><span data-i18n="haveAccount">Already have an account?</span> <a href="#" onclick="showLoginView()" data-i18n="signIn">Sign In</a></p>
  </div>
</div>

<div id="admin-view" class="admin-layout" style="display:none">
  <div class="topbar">
    <div class="topbar-left">
      <img src="/merclogo.png" alt="Logo">
      <span class="topbar-title" data-i18n="surveyDashboard">Survey Dashboard</span>
    </div>
    <div class="topbar-right">
      <button id="lang-toggle" class="btn-icon" onclick="toggleAdminLang()" title="Translate" style="margin-right:4px;font-size:12px;font-weight:700">TR</button>
      <button class="btn-icon" onclick="toggleQRModal()" title="Share Survey QR" style="margin-right:4px">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="3" height="3"/><line x1="18" y1="14" x2="18" y2="18"/><line x1="14" y1="18" x2="18" y2="18"/></svg>
      </button>
      <button class="btn-icon" onclick="toggleSettings()" title="Settings">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
      </button>
      <div class="user-badge"><span class="dot"></span><span id="user-display"></span></div>
      <button class="btn-logout" onclick="handleLogout()">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 6"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        <span data-i18n="logout">Logout</span>
      </button>
    </div>
  </div>

  <div class="main">
    <div class="stat-row">
      <div class="stat-box total">
        <div class="stat-label" data-i18n="totalResponses">Total Responses</div>
        <div class="stat-number" id="total-count">0</div>
      </div>
      <div class="stat-box lefkosa">
        <div class="stat-label" data-i18n="lefkosa">Lefkosa</div>
        <div class="stat-number" id="stat-lefkosa">0</div>
        <div class="stat-detail">Avg: <span id="avg-lefkosa">0</span>/5</div>
      </div>
      <div class="stat-box haspolat">
        <div class="stat-label" data-i18n="haspolat">Haspolat</div>
        <div class="stat-number" id="stat-haspolat">0</div>
        <div class="stat-detail">Avg: <span id="avg-haspolat">0</span>/5</div>
      </div>
      <div class="stat-box girne">
        <div class="stat-label" data-i18n="girne">Girne</div>
        <div class="stat-number" id="stat-girne">0</div>
        <div class="stat-detail">Avg: <span id="avg-girne">0</span>/5</div>
      </div>
    </div>

    <div class="toolbar">
      <button class="btn btn-primary" onclick="exportData()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        <span data-i18n="exportCsv">Export Excel</span>
      </button>
      <button class="btn btn-danger" onclick="showClearModal()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        <span data-i18n="clearAll">Clear All</span>
      </button>
    </div>

    <div class="section">
      <div class="section-head">
        <h2 data-i18n="responses">Responses</h2>
        <span class="count" id="response-count">0 records</span>
      </div>
      <div class="responses-card">
        <div id="responses-list" class="card-list"></div>
      </div>
    </div>
  </div>
</div>

<div class="modal-overlay" id="qr-modal">
  <div class="modal qr-modal">
    <button class="modal-close-x" onclick="closeQRModal()">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
    <h3 data-i18n="shareSurvey">Share Survey</h3>
    <p style="font-size:13px;color:var(--text3);margin-bottom:20px" data-i18n="scanQr">Scan the QR code or copy the link below to share the customer survey.</p>
    <div id="qrcode-container" style="display:flex;justify-content:center;margin-bottom:20px"></div>
    <div class="qr-link-row">
      <input id="qr-link" type="text" readonly>
      <button class="btn btn-outline qr-copy-btn" onclick="copyQRLink()" data-i18n="copy">Copy</button>
      <button class="btn btn-outline qr-copy-btn" onclick="printQR()" type="button" style="display:flex;align-items:center;gap:4px">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
        Print
      </button>
    </div>
    <div class="modal-actions" style="margin-top:20px">
      <button class="btn btn-primary" onclick="closeQRModal()" data-i18n="done">Done</button>
    </div>
  </div>
</div>

<div class="modal-overlay" id="clear-modal">
  <div class="modal">
    <h3 data-i18n="deleteAll">Delete All Data?</h3>
    <p data-i18n="deleteConfirm">This action cannot be undone. All survey responses will be permanently deleted.</p>
    <div class="modal-actions">
      <button class="btn btn-outline" onclick="hideClearModal()" data-i18n="cancel">Cancel</button>
      <button class="btn btn-danger" onclick="clearData()" data-i18n="deleteAll">Delete All</button>
    </div>
  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js"></script>
<script src="https://cdn.sheetjs.com/xlsx-0.20.1/package/dist/xlsx.full.min.js"></script>
<script>
const API_BASE = '<?php echo $API_BASE ?>';
let currentUser = null;
let allResponses = [];
let qrInstance = null;
let adminLang = 'en';

const T = {
  en: {
    surveyDashboard: 'Survey Dashboard', totalResponses: 'Total Responses',
    lefkosa: 'Lefkosa', haspolat: 'Haspolat', girne: 'Girne',
    exportCsv: 'Export Excel', clearAll: 'Clear All', responses: 'Responses',

    exportCsv: 'Excel İndir', clearAll: 'Tümünü Sil', responses: 'Yanıtlar',
    records: 'kayıt', shareSurvey: 'Anketi Paylaş',
    scanQr: 'Müşteri anketini paylaşmak için QR kodunu tarayın veya aşağıdaki bağlantıyı kopyalayın.',
    done: 'Tamam', deleteAll: 'Tüm Veriler Silinsin mi?',
    deleteConfirm: 'Bu işlem geri alınamaz. Tüm anket yanıtları kalıcı olarak silinecektir.',
    cancel: 'İptal', noResponses: 'Henüz yanıt yok',
    surveySubtext: 'Anket yanıtları burada görünecek',
    settings: 'Ayarlar', theme: 'Tema', dark: 'Koyu', light: 'Açık',
    adminPanel: 'Yönetici Paneli', signIn: 'Giriş Yap', username: 'Kullanıcı Adı',
    enterUsername: 'Kullanıcı adı girin', password: 'Şifre', enterPassword: 'Şifre girin',
    needAccount: 'Hesabınız yok mu?', signUp: 'Kayıt Ol',
    createAccount: 'Hesap Oluştur', requestAccess: 'Yönetici erişimi isteyin',
    email: 'E-posta', yourEmail: 'ornek@email.com', confirmPassword: 'Şifreyi Onayla',
    repeatPassword: 'Şifreyi tekrar girin', sendCode: 'Doğrulama Kodu Gönder',
    verifyEmail: 'E-posta Doğrulama', enterCode: 'E-postanıza gelen kodu girin',
    verificationCode: 'Doğrulama Kodu', placeholderCode: '6 haneli kod',
    codeSentTo: 'Kod gönderildi:', verify: 'E-postayı Doğrula', resendCode: 'Kodu Tekrar Gönder',
    haveAccount: 'Zaten hesabınız var mı?', home: 'Ana Sayfa',
    logout: 'Çıkış Yap', copy: 'Kopyala', print: 'Yazdır'
  }
};

function getSurveyURL() {
  return window.location.origin + '/';
}

function toggleQRModal() {
  const modal = document.getElementById('qr-modal');
  modal.style.display = 'flex';
  const container = document.getElementById('qrcode-container');
  container.innerHTML = '';
  const link = getSurveyURL();
  document.getElementById('qr-link').value = link;
  qrInstance = new QRCode(container, {
    text: link,
    width: 200,
    height: 200,
    colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  });
}

function closeQRModal() {
  document.getElementById('qr-modal').style.display = 'none';
}

function copyQRLink() {
  const input = document.getElementById('qr-link');
  input.select();
  document.execCommand('copy');
  const btn = document.querySelector('.qr-copy-btn');
  const orig = btn.textContent;
  btn.textContent = 'Copied!';
  setTimeout(() => btn.textContent = orig, 1500);
}

function toggleSettings() {
  document.getElementById('settings-panel').classList.toggle('open');
  document.getElementById('settings-overlay').classList.toggle('open');
}

function setTheme(mode) {
  if (mode === 'light') {
    document.body.classList.add('light-mode');
    document.getElementById('btn-light').classList.add('active');
    document.getElementById('btn-dark').classList.remove('active');
  } else {
    document.body.classList.remove('light-mode');
    document.getElementById('btn-dark').classList.add('active');
    document.getElementById('btn-light').classList.remove('active');
  }
  localStorage.setItem('theme', mode);
}

(function() {
  const saved = localStorage.getItem('theme');
  if (saved) setTheme(saved);
})();

function showLoginView() {
  hideAll();
  const el = document.getElementById('login-view');
  el.style.display = 'flex';
  el.style.flexDirection = 'column';
}
function showSignupView() {
  hideAll();
  const el = document.getElementById('signup-view');
  el.style.display = 'flex';
  el.style.flexDirection = 'column';
  document.getElementById('signup-register').style.display = 'block';
  document.getElementById('signup-verify').style.display = 'none';
  document.getElementById('signup-title').textContent = T[adminLang].createAccount;
  document.getElementById('signup-subtitle').textContent = T[adminLang].requestAccess;
}
function showAdmin() {
  hideAll();
  document.getElementById('admin-view').style.display = 'flex';
}
function hideAll() {
  document.getElementById('login-view').style.display = 'none';
  document.getElementById('signup-view').style.display = 'none';
  document.getElementById('admin-view').style.display = 'none';
}

async function api(url, opts = {}) {
  opts.headers = opts.headers || {};
  opts.headers['Content-Type'] = 'application/json';
  opts.credentials = 'include';
  const res = await fetch(url, opts);
  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch { data = { error: text }; }
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  return data;
}

async function handleLogin(e) {
  e.preventDefault();
  const btn = document.getElementById('login-btn');
  btn.disabled = true; btn.textContent = '...';
  document.getElementById('login-error').style.display = 'none';
  try {
    const data = await api(`${API_BASE}/auth.php/login`, {
      method: 'POST',
      body: JSON.stringify({
        username: document.getElementById('login-username').value.trim(),
        password: document.getElementById('login-password').value
      })
    });
    currentUser = data;
    document.getElementById('user-display').textContent = data.username;
    showAdmin();
    loadResponses();
  } catch (err) {
    const el = document.getElementById('login-error');
    el.textContent = err.message;
    el.style.display = 'block';
  } finally {
    btn.disabled = false; btn.textContent = 'Sign In';
  }
}

let signupUserId = null;
let signupEmail = '';

async function handleSignup(e) {
  e.preventDefault();
  const btn = document.getElementById('signup-btn');
  btn.disabled = true; btn.textContent = '...';
  document.getElementById('signup-error').style.display = 'none';
  document.getElementById('signup-success').style.display = 'none';
  const username = document.getElementById('signup-username').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;
  const confirm = document.getElementById('signup-confirm').value;
  if (!username || !email || !password) { showSignupMsg('error', 'Please fill all fields'); btn.disabled = false; btn.textContent = 'Send Verification Code'; return; }
  if (password !== confirm) { showSignupMsg('error', 'Passwords do not match'); btn.disabled = false; btn.textContent = 'Send Verification Code'; return; }
  if (password.length < 6) { showSignupMsg('error', 'Password must be at least 6 characters'); btn.disabled = false; btn.textContent = 'Send Verification Code'; return; }
  try {
    const data = await api(`${API_BASE}/auth.php/signup`, { method: 'POST', body: JSON.stringify({ username, email, password }) });
    signupUserId = data.userId;
    signupEmail = email;
    document.getElementById('signup-register').style.display = 'none';
    document.getElementById('signup-verify').style.display = 'block';
    document.getElementById('verify-email').textContent = email;
    document.getElementById('signup-title').textContent = T[adminLang].verifyEmail;
    document.getElementById('signup-subtitle').textContent = T[adminLang].enterCode;
    showSignupMsg('success', 'Verification code sent!');
  } catch (err) { showSignupMsg('error', err.message); } finally { btn.disabled = false; btn.textContent = 'Send Verification Code'; }
}

function showSignupMsg(type, msg) {
  const el = document.getElementById('signup-' + type);
  el.textContent = msg; el.style.display = 'block';
}

async function handleVerify(e) {
  e.preventDefault();
  const btn = document.getElementById('verify-btn');
  btn.disabled = true; btn.textContent = '...';
  document.getElementById('signup-error').style.display = 'none';
  const code = document.getElementById('signup-code').value.trim();
  if (!code) { showSignupMsg('error', 'Please enter the code'); btn.disabled = false; btn.textContent = 'Verify Email'; return; }
  try {
    await api(`${API_BASE}/auth.php/verify-email`, { method: 'POST', body: JSON.stringify({ userId: signupUserId, code }) });
    showSignupMsg('success', 'Email verified! Redirecting to login...');
    setTimeout(showLoginView, 2000);
  } catch (err) { showSignupMsg('error', err.message); } finally { btn.disabled = false; btn.textContent = 'Verify Email'; }
}

async function handleResendCode() {
  document.getElementById('signup-error').style.display = 'none';
  try {
    await api(`${API_BASE}/auth.php/resend-code`, { method: 'POST', body: JSON.stringify({ email: signupEmail }) });
    showSignupMsg('success', 'New code sent!');
  } catch (err) { showSignupMsg('error', err.message); }
}

async function handleLogout() {
  try { await api(`${API_BASE}/auth.php/logout`, { method: 'POST' }); } catch(e) {}
  currentUser = null;
  allResponses = [];
  document.getElementById('login-username').value = '';
  document.getElementById('login-password').value = '';
  document.getElementById('login-error').style.display = 'none';
  showLoginView();
}

async function loadResponses() {
  try {
    const result = await api(`${API_BASE}/survey.php?action=responses`);
    allResponses = Array.isArray(result) ? result : [];
    renderAdmin();
  } catch(err) {
    if (err.message.includes('401') || err.message.includes('403') || err.message.includes('Unauthorized') || err.message.includes('No token') || err.message.includes('Invalid token')) {
      currentUser = null;
      showLoginView();
      const el = document.getElementById('login-error');
      el.textContent = 'Session expired. Please log in again.';
      el.style.display = 'block';
    }
    console.error(err);
  }
}

function renderAdmin() {
  const branches = ['Lefkosa', 'Haspolat', 'Girne'];
  document.getElementById('total-count').textContent = allResponses.length;
  document.getElementById('response-count').textContent = allResponses.length + ' records';

  branches.forEach(b => {
    const br = allResponses.filter(r => r.branch === b);
    const rated = br.filter(r => r.overallSatisfaction != null);
    const avg = rated.length > 0 ? (rated.reduce((s, r) => s + parseInt(r.overallSatisfaction, 10), 0) / rated.length).toFixed(1) : '0';
    const low = b.toLowerCase().replace('ş', 's');
    document.getElementById('stat-' + low).textContent = br.length;
    document.getElementById('avg-' + low).textContent = avg;
  });

  const list = document.getElementById('responses-list');
  if (allResponses.length === 0) {
    list.innerHTML = `<div class="empty-state">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
      <p><span data-i18n="noResponses">No responses yet</span><span data-i18n="surveySubtext">Survey submissions will appear here</span></p>
    </div>`;
    return;
  }

  const deptMap = { 'maintenance': 'Maintenance', 'bodywork': 'Bodywork' };
  list.innerHTML = allResponses.slice().reverse().map((r, idx) => {
    const dept = (r.department || '').split(',').map(d => deptMap[d.trim()] || d.trim()).join(', ');
    const ratings = [];
    if (r.overallSatisfaction) ratings.push({ l: 'Overall', v: parseInt(r.overallSatisfaction, 10) });
    if (r.appointment) ratings.push({ l: 'Appointment', v: parseInt(r.appointment, 10) });
    if (r.advisor) ratings.push({ l: 'Advisor', v: parseInt(r.advisor, 10) });
    if (r.workshopRepair) ratings.push({ l: 'Workshop', v: parseInt(r.workshopRepair, 10) });
    if (r.carWash) ratings.push({ l: 'Car Wash', v: parseInt(r.carWash, 10) });
    if (r.maintenance) ratings.push({ l: 'Maintenance', v: parseInt(r.maintenance, 10) });
    if (r.bodywork) ratings.push({ l: 'Bodywork', v: parseInt(r.bodywork, 10) });

    return `<div class="response-card" id="card-${idx}">
      <div class="card-header" onclick="toggleCard(${idx})">
        <div class="card-header-left">
          <span class="card-header-name">${r.firstName} ${r.lastName}</span>
          <div class="card-header-meta">
            <span class="card-header-tag">${r.branch}</span>
            <span class="card-header-tag">${dept}</span>
          </div>
        </div>
        <div class="card-header-right">
          <span class="card-header-date">${r.createdAt ? r.createdAt.substring(0, 10) : ''}</span>
          <svg class="card-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
      </div>
      <div class="card-body">
        <div class="card-body-inner">
          <div class="card-meta">
            ${r.licensePlate ? `<span class="meta-tag">${r.licensePlate}</span>` : ''}
            ${r.phone ? `<span class="meta-tag">${r.phone}</span>` : ''}
          </div>
          <div class="rating-grid">${ratings.map(rt => `<div class="rating-item"><span class="lbl">${rt.l}</span><span class="val"><span class="star">&#9733;</span>${rt.v}/5</span></div>`).join('')}</div>
          ${r.comments ? `<div class="card-comment">${r.comments}</div>` : ''}
        </div>
      </div>
    </div>`;
  }).join('');
}

function toggleCard(idx) {
  document.getElementById('card-' + idx).classList.toggle('open');
}

function showClearModal() { document.getElementById('clear-modal').style.display = 'flex'; }
function hideClearModal() { document.getElementById('clear-modal').style.display = 'none'; }

async function clearData() {
  hideClearModal();
  if (!confirm('Are you sure? This cannot be undone.')) return;
  try {
    await api(`${API_BASE}/survey.php?action=responses`, { method: 'DELETE' });
    allResponses = [];
    renderAdmin();
  } catch (err) { alert('Failed to clear data.'); }
}

async function exportData() {
  if (allResponses.length === 0) { alert('No data to export!'); return; }
  const data = allResponses.map(r => ({
    'Date': r.createdAt ? r.createdAt.substring(0, 10) : '',
    'First Name': r.firstName, 'Last Name': r.lastName, 'Phone': r.phone || '',
    'License Plate': r.licensePlate, 'Branch': r.branch,
    'Department': (r.department || '').split(',').map(d => ({ 'maintenance': 'Maintenance', 'bodywork': 'Bodywork' }[d.trim()] || d.trim())).join(', '),
    'Overall': r.overallSatisfaction || '', 'Appointment': r.appointment || '', 'Advisor': r.advisor || '',
    'Workshop': r.workshopRepair || '', 'Car Wash': r.carWash || '',
    'Bodywork': r.bodywork || '', 'Comments': r.comments || ''
  }));
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Survey Responses');
  const colWidths = Object.keys(data[0]).map(k => ({ wch: Math.max(k.length, 12) }));
  ws['!cols'] = colWidths;
  XLSX.writeFile(wb, `Survey_${new Date().toISOString().split('T')[0]}.xlsx`);
}

async function checkSession() {
  try {
    const data = await api(`${API_BASE}/auth.php/verify`);
    if (data.authenticated && data.role === 'admin') {
      currentUser = data;
      document.getElementById('user-display').textContent = data.username;
      showAdmin();
      loadResponses();
      return;
    }
  } catch(e) {}
  try {
    await api(`${API_BASE}/auth.php/logout`, { method: 'POST' });
  } catch(e) {}
  currentUser = null;
  showLoginView();
}

function toggleAdminLang() {
  const btn = document.getElementById('lang-toggle');
  const isEn = btn.textContent === 'TR';
  adminLang = isEn ? 'tr' : 'en';
  btn.textContent = isEn ? 'EN' : 'TR';
  const dict = T[adminLang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });
}

function printQR() {
  const link = document.getElementById('qr-link').value;
  const w = window.open('', '_blank');
  if (!w) {
    alert('Pop-up blocked. Please allow pop-ups for this site and try again.');
    return;
  }
  const qrImg = 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=' + encodeURIComponent(link);
  w.document.write('<!DOCTYPE html><html><head><meta charset="utf-8"><title>Customer Survey QR</title><style>*{margin:0;padding:0;box-sizing:border-box}body{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:20mm;font-family:Arial,sans-serif;text-align:center;background:#fff;color:#000}h2{margin-bottom:30px;font-size:28px}img{width:8cm;height:8cm;display:block}p{margin-top:20px;max-width:500px;word-break:break-all;color:#555;font-size:12px}</style></head><body><h2>Customer Survey</h2><img src="' + qrImg + '" alt="QR Code" onerror="this.src=\'\'"><p>' + link + '</p><script>window.onload=function(){setTimeout(function(){window.focus();window.print()},500)}<\/script></body></html>');
  w.document.close();
}

checkSession();
</script>
</body>
</html>
