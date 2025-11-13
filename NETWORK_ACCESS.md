# 🌐 Snake Game - 네트워크 접속 가이드

## 📡 방법 1: 로컬 네트워크 접속 (같은 Wi-Fi/LAN)

### 1️⃣ 개발 서버 실행

**현재 PC에서:**
```bash
cd C:\Users\sw860.park\Desktop\Cursor\SnakeGame
npm run dev
```

기본적으로 `localhost:5173`에서만 접근 가능합니다.

### 2️⃣ 네트워크 접속 허용

**vite.config.ts 수정:**

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  server: {
    host: '0.0.0.0', // 모든 네트워크 인터페이스에서 접속 허용
    port: 5173,
    strictPort: true,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // ... 나머지 설정
    })
  ],
  // ... 나머지 설정
});
```

### 3️⃣ 방화벽 허용

**Windows 방화벽 설정:**
1. `Win + R` → `firewall.cpl`
2. "고급 설정" 클릭
3. "인바운드 규칙" → "새 규칙"
4. 포트: TCP 5173
5. 연결 허용

**또는 명령어로:**
```powershell
# 관리자 권한으로 PowerShell 실행
New-NetFirewallRule -DisplayName "Vite Dev Server" -Direction Inbound -Protocol TCP -LocalPort 5173 -Action Allow
```

### 4️⃣ IP 주소 확인

**현재 PC의 IP 주소 확인:**
```bash
# Windows
ipconfig

# 결과 예시:
# IPv4 Address: 192.168.0.100
```

또는:
```powershell
# PowerShell에서
(Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.InterfaceAlias -like "*Wi-Fi*" -or $_.InterfaceAlias -like "*Ethernet*"}).IPAddress
```

### 5️⃣ 다른 PC에서 접속

**같은 네트워크의 다른 PC/모바일에서:**
```
http://192.168.0.100:5173
```
(실제 IP로 변경)

---

## 🚀 방법 2: 프로덕션 빌드 + 정적 서버

### 단계 1: 빌드
```bash
npm run build
```

### 단계 2: 간단한 HTTP 서버로 서빙

**옵션 A: serve 사용**
```bash
# 전역 설치
npm install -g serve

# dist 폴더 서빙
serve -s dist -l 5173

# 네트워크 접속 허용
serve -s dist -l 0.0.0.0:5173
```

**옵션 B: http-server 사용**
```bash
# 전역 설치
npm install -g http-server

# dist 폴더 서빙
http-server dist -p 5173 -a 0.0.0.0
```

**옵션 C: Python 사용**
```bash
# Python 3
cd dist
python -m http.server 5173

# 모든 네트워크에서 접속
python -m http.server 5173 --bind 0.0.0.0
```

### 단계 3: 접속
```
http://[서버IP]:5173
```

---

## 🌍 방법 3: 인터넷 공개 배포

### A. Vercel (추천 - 무료)

#### 1. Vercel 계정 생성
https://vercel.com

#### 2. Git 저장소 연결

**Git 초기화 (처음이면):**
```bash
cd C:\Users\sw860.park\Desktop\Cursor\SnakeGame
git init
git add .
git commit -m "feat: initial Snake game"
```

**GitHub에 푸시:**
```bash
# GitHub에서 새 저장소 생성 후
git remote add origin https://github.com/[username]/snake-game.git
git branch -M main
git push -u origin main
```

#### 3. Vercel에서 배포
```bash
# Vercel CLI 설치
npm install -g vercel

# 배포
vercel

# 프로덕션 배포
vercel --prod
```

또는 Vercel 웹사이트에서:
1. "New Project" 클릭
2. GitHub 저장소 선택
3. "Deploy" 클릭

**배포 URL 예시:**
```
https://snake-game-xyz123.vercel.app
```

---

### B. Netlify (무료)

#### 1. Netlify Drop 사용 (가장 간단)

```bash
# 빌드
npm run build

# https://app.netlify.com/drop 에서
# dist 폴더를 드래그 앤 드롭
```

#### 2. Netlify CLI 사용

```bash
# CLI 설치
npm install -g netlify-cli

# 로그인
netlify login

# 배포
netlify deploy

# 프로덕션 배포
netlify deploy --prod
```

---

### C. GitHub Pages (무료)

#### 1. vite.config.ts 수정
```typescript
export default defineConfig({
  base: '/snake-game/', // 저장소 이름
  // ... 나머지 설정
});
```

#### 2. 배포 스크립트 추가

**package.json:**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "deploy": "npm run build && gh-pages -d dist"
  },
  "devDependencies": {
    "gh-pages": "^6.1.0"
  }
}
```

#### 3. 배포
```bash
# gh-pages 설치
npm install --save-dev gh-pages

# 배포
npm run deploy
```

**접속 URL:**
```
https://[username].github.io/snake-game/
```

---

### D. Railway (무료 티어)

```bash
# Railway CLI 설치
npm install -g @railway/cli

# 로그인
railway login

# 프로젝트 초기화
railway init

# 배포
railway up
```

---

## 🔧 방법 4: ngrok (임시 공개 URL)

외부 접속을 빠르게 테스트하고 싶을 때 사용

### 1. ngrok 설치
https://ngrok.com/download

### 2. 사용법
```bash
# 개발 서버 실행
npm run dev

# 다른 터미널에서
ngrok http 5173
```

### 3. 결과
```
Forwarding: https://abc123.ngrok.io → http://localhost:5173
```

**장점:**
- 즉시 사용 가능
- HTTPS 자동 제공
- 임시 URL

**단점:**
- 무료 버전은 URL이 매번 바뀜
- 개발 서버가 실행 중이어야 함

---

## 📦 방법 5: Docker 컨테이너

### Dockerfile 생성
```dockerfile
# Build stage
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # PWA 관련
    location /manifest.webmanifest {
        add_header Cache-Control "public, max-age=0";
    }
    
    location /sw.js {
        add_header Cache-Control "public, max-age=0";
    }
}
```

### 빌드 및 실행
```bash
# 이미지 빌드
docker build -t snake-game .

# 컨테이너 실행
docker run -d -p 8080:80 snake-game

# 접속
http://localhost:8080
```

---

## 🖥️ 다른 PC에 같은 환경 만들기

### A. 소스 코드 공유

#### 방법 1: Git (추천)
```bash
# 원본 PC에서
cd C:\Users\sw860.park\Desktop\Cursor\SnakeGame
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/[username]/snake-game.git
git push -u origin main

# 다른 PC에서
git clone https://github.com/[username]/snake-game.git
cd snake-game
npm install
npm run dev
```

#### 방법 2: ZIP 파일
```bash
# 필요한 파일만 압축 (node_modules 제외)
# 다른 PC에서 압축 해제 후
npm install
npm run dev
```

### B. Docker 이미지 공유

```bash
# 원본 PC에서
docker build -t snake-game .
docker save snake-game > snake-game.tar

# 다른 PC로 파일 복사 후
docker load < snake-game.tar
docker run -d -p 8080:80 snake-game
```

---

## ✅ 빠른 시작 체크리스트

### 로컬 네트워크 접속 (5분)
- [ ] vite.config.ts에 `host: '0.0.0.0'` 추가
- [ ] 방화벽 포트 5173 허용
- [ ] `npm run dev` 실행
- [ ] IP 주소 확인 (`ipconfig`)
- [ ] 다른 PC에서 `http://[IP]:5173` 접속

### 인터넷 공개 (10분)
- [ ] 코드를 GitHub에 푸시
- [ ] Vercel 가입 및 저장소 연결
- [ ] 자동 배포 완료
- [ ] 공개 URL로 접속

### 다른 PC에 환경 구축 (10분)
- [ ] Node.js 18+ 설치
- [ ] Git으로 클론 또는 ZIP 다운로드
- [ ] `npm install` 실행
- [ ] `npm run dev` 실행

---

## 🎯 추천 방법

| 상황 | 추천 방법 | 소요 시간 |
|------|----------|----------|
| 빠른 테스트 | ngrok | 2분 |
| 같은 Wi-Fi에서 | 로컬 네트워크 | 5분 |
| 친구와 공유 | Vercel/Netlify | 10분 |
| 영구 호스팅 | GitHub Pages | 15분 |
| 회사/학교 | Docker | 20분 |

---

## 📝 예시: Vercel 배포 (전체 과정)

```bash
# 1. Git 저장소 생성
cd C:\Users\sw860.park\Desktop\Cursor\SnakeGame
git init
git add .
git commit -m "feat: Snake game initial version"

# 2. GitHub에 푸시
# GitHub에서 새 저장소 생성 (snake-game)
git remote add origin https://github.com/YOUR_USERNAME/snake-game.git
git branch -M main
git push -u origin main

# 3. Vercel 배포
npm install -g vercel
vercel login
vercel

# 완료! URL 받음: https://snake-game-xyz.vercel.app
```

---

이제 어디서든 게임을 플레이할 수 있습니다! 🎮🌍

