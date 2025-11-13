# 🚀 Snake Game - 빠른 배포 가이드

## 📋 목차
1. [로컬 네트워크 접속 (5분)](#1-로컬-네트워크-접속-5분)
2. [인터넷 공개 - Vercel (10분)](#2-인터넷-공개---vercel-10분)
3. [다른 PC에 환경 구축 (10분)](#3-다른-pc에-환경-구축-10분)

---

## 1. 로컬 네트워크 접속 (5분)

같은 Wi-Fi나 LAN에 연결된 다른 기기에서 접속

### ✅ 이미 설정 완료!

`vite.config.ts`에 네트워크 접속 설정이 추가되었습니다.

### 사용 방법

#### A. 간단한 방법 (추천)
```bash
# Windows에서 더블클릭
start-network.bat
```

스크립트가 자동으로:
- 현재 PC의 IP 주소 표시
- 서버 시작
- 접속 방법 안내

#### B. 수동 방법
```bash
# 1. 서버 시작
npm run dev

# 2. IP 주소 확인
ipconfig
# 예: 192.168.0.100

# 3. 다른 기기에서 접속
# http://192.168.0.100:5173
```

### 방화벽 설정 (필요시)

**Windows 방화벽에서 포트 5173 허용:**

```powershell
# PowerShell을 관리자 권한으로 실행
New-NetFirewallRule -DisplayName "Vite Dev Server" -Direction Inbound -Protocol TCP -LocalPort 5173 -Action Allow
```

또는 Windows 보안 센터에서 수동 설정

### 접속 테스트

**같은 네트워크의 다른 기기에서:**
- PC: 브라우저에서 `http://[IP주소]:5173`
- 모바일: 브라우저에서 `http://[IP주소]:5173`
- 태블릿: 동일

---

## 2. 인터넷 공개 - Vercel (10분)

전 세계 어디서나 접속 가능한 URL 생성

### 방법 A: 자동 배포 (추천)

```bash
# 더블클릭으로 실행
deploy-vercel.bat
```

스크립트가 자동으로:
1. Vercel CLI 설치 확인
2. 프로젝트 빌드
3. Vercel에 배포
4. 공개 URL 제공

### 방법 B: 수동 배포

```bash
# 1. Vercel CLI 설치 (처음 한 번만)
npm install -g vercel

# 2. 로그인
vercel login

# 3. 배포
vercel --prod
```

### 결과

```
✅ Deployed to production!

🔗 https://snake-game-xyz123.vercel.app
```

이제 누구나 이 URL로 게임을 플레이할 수 있습니다!

### 업데이트 방법

코드를 수정한 후:

```bash
# 다시 배포
deploy-vercel.bat

# 또는
vercel --prod
```

자동으로 업데이트됩니다!

---

## 3. 다른 PC에 환경 구축 (10분)

### 필요사항

- Node.js 18 이상
- Git (선택사항)

### 방법 A: Git 클론 (추천)

```bash
# 1. GitHub에 푸시 (원본 PC에서)
cd C:\Users\sw860.park\Desktop\Cursor\SnakeGame
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/snake-game.git
git push -u origin main

# 2. 다른 PC에서 클론
git clone https://github.com/YOUR_USERNAME/snake-game.git
cd snake-game

# 3. 의존성 설치
npm install

# 4. 실행
npm run dev
```

### 방법 B: ZIP 파일

```bash
# 1. 원본 PC에서
# 프로젝트 폴더를 ZIP으로 압축 (node_modules 제외)

# 2. 다른 PC에서 압축 해제 후
cd snake-game
npm install
npm run dev
```

### 방법 C: 온라인 배포 후 코드 가져오기

```bash
# Vercel에서 배포 후
vercel pull

# 또는 GitHub에서
git clone [repository-url]
npm install
npm run dev
```

---

## 🎯 시나리오별 추천

### 시나리오 1: 친구와 빨리 공유하고 싶어요
→ **Vercel 배포** (10분)
- URL 하나로 누구나 접속
- 무료
- HTTPS 자동 적용

### 시나리오 2: 같은 사무실/집에서 여러 기기로 테스트
→ **로컬 네트워크** (5분)
- 개발하면서 즉시 확인
- 설정 간단
- 인터넷 필요 없음

### 시나리오 3: 회사/학교 컴퓨터에서도 작업하고 싶어요
→ **Git + 배포** (15분)
- 코드 버전 관리
- 어디서나 동일한 환경
- 백업 자동

### 시나리오 4: 포트폴리오로 사용하고 싶어요
→ **GitHub Pages + README** (20분)
- 영구 호스팅
- 커스텀 도메인 가능
- 프로페셔널한 URL

---

## 📱 모바일에서 접속

### 로컬 네트워크
```
1. PC와 모바일이 같은 Wi-Fi 연결
2. 모바일 브라우저에서: http://[PC-IP]:5173
3. 터치/스와이프로 조작
```

### 인터넷 배포
```
1. Vercel URL 접속
2. 홈 화면에 추가 (PWA)
3. 앱처럼 사용 가능!
```

---

## 🔧 문제 해결

### "This site can't be reached" (로컬 네트워크)
- [ ] 방화벽 확인
- [ ] IP 주소 확인 (`ipconfig`)
- [ ] 같은 네트워크인지 확인
- [ ] 서버가 실행 중인지 확인

### "404 Not Found" (Vercel)
- [ ] 빌드 성공했는지 확인
- [ ] `vercel.json` 파일 있는지 확인
- [ ] 다시 배포: `vercel --prod --force`

### "Module not found"
- [ ] `npm install` 실행
- [ ] Node.js 버전 확인 (18+)
- [ ] `package-lock.json` 삭제 후 재설치

---

## 📊 배포 옵션 비교

| 방법 | 시간 | 비용 | 접근성 | 용도 |
|------|------|------|--------|------|
| 로컬 네트워크 | 5분 | 무료 | 같은 네트워크 | 개발/테스트 |
| ngrok | 2분 | 무료* | 전 세계 | 빠른 데모 |
| Vercel | 10분 | 무료 | 전 세계 | 프로덕션 |
| Netlify | 10분 | 무료 | 전 세계 | 프로덕션 |
| GitHub Pages | 15분 | 무료 | 전 세계 | 포트폴리오 |
| Docker | 20분 | 비용 | 설정에 따라 | 엔터프라이즈 |

*ngrok 무료는 URL이 매번 바뀜

---

## ✅ 완료 체크리스트

### 로컬 네트워크 설정
- [x] `vite.config.ts` 수정 완료
- [ ] 방화벽 포트 5173 허용
- [ ] `start-network.bat` 실행
- [ ] 다른 기기에서 접속 테스트

### Vercel 배포
- [ ] Vercel 계정 생성
- [ ] `deploy-vercel.bat` 실행
- [ ] 배포 URL 확인
- [ ] 친구에게 링크 공유

### 다른 PC 환경 구축
- [ ] Node.js 18+ 설치
- [ ] 코드 가져오기 (Git/ZIP)
- [ ] `npm install` 실행
- [ ] `npm run dev` 실행

---

## 🎓 추가 학습 자료

더 자세한 내용은:
- `NETWORK_ACCESS.md` - 모든 배포 옵션 상세 가이드
- `README.md` - 프로젝트 전체 문서
- `TROUBLESHOOTING.md` - 문제 해결 가이드

---

**이제 Snake 게임을 어디서나 즐기세요!** 🐍🎮🌍

