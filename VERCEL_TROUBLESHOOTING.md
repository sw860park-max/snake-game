# 🔧 Vercel 접속 문제 해결 가이드

## 🔍 문제 진단

### 1단계: 배포 상태 확인

#### Vercel 대시보드 확인
```
1. https://vercel.com/dashboard 접속
2. 프로젝트 클릭
3. "Deployments" 탭 확인
```

**확인 사항:**
- ✅ Status: "Ready" (초록색)
- ❌ Status: "Error" (빨간색) → 빌드 실패
- ⏳ Status: "Building" (주황색) → 빌드 중

---

### 2단계: 도메인 확인

#### 배포 URL 확인
```
Vercel 프로젝트 → Deployments → 최신 배포 클릭
→ "Visit" 버튼 또는 URL 복사
```

**정상 URL 형식:**
```
https://[project-name]-[random].vercel.app
또는
https://[project-name].vercel.app
```

---

### 3단계: 빌드 로그 확인

#### 빌드 성공 여부
```
Vercel → Deployments → 배포 클릭 → "Building" 탭

확인 사항:
✅ "Build Completed"
✅ "Output Directory: dist"
✅ "Route: /index.html"
```

---

## 🚨 일반적인 문제와 해결

### 문제 1: 404 Not Found

#### 원인
- SPA 라우팅 문제
- `vercel.json` rewrites 누락

#### 해결
`vercel.json` 파일 확인 및 수정:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**또는 더 상세한 설정:**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

---

### 문제 2: Blank Page (빈 화면)

#### 원인
- JavaScript 로드 실패
- Base URL 문제

#### 해결

**vite.config.ts 확인:**
```typescript
export default defineConfig({
  base: '/', // 루트에서 실행
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  // ... 나머지 설정
});
```

**index.html 확인:**
```html
<!-- 상대 경로 확인 -->
<script type="module" src="/src/main.tsx"></script>
```

---

### 문제 3: 503 Service Unavailable

#### 원인
- 배포 중
- Vercel 서버 문제

#### 해결
```
1. 5분 정도 대기
2. 브라우저 새로고침 (Ctrl + Shift + R)
3. 다른 브라우저에서 시도
4. 시크릿/프라이빗 모드 시도
```

---

### 문제 4: Assets 로드 실패

#### 증상
```
Console 에러:
- Failed to load module
- net::ERR_ABORTED 404
```

#### 해결

**1. dist 폴더 구조 확인:**
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
├── manifest.webmanifest
└── registerSW.js
```

**2. vercel.json에 정적 파일 설정:**
```json
{
  "routes": [
    {
      "src": "/(.*\\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|webp))",
      "dest": "/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

---

### 문제 5: CORS 오류

#### 증상
```
Access to ... has been blocked by CORS policy
```

#### 해결

**vercel.json에 헤더 추가:**
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET, POST, PUT, DELETE, OPTIONS"
        }
      ]
    }
  ]
}
```

---

## 🔧 완전한 vercel.json (권장)

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

---

## 🧪 테스트 방법

### 1. 로컬에서 프로덕션 빌드 테스트
```bash
# 빌드
npm run build

# 프리뷰 (로컬 서버)
npm run preview

# 브라우저에서 확인
http://localhost:4173
```

정상 작동하면 → Vercel 설정 문제
작동 안 하면 → 코드 문제

---

### 2. Vercel CLI로 재배포
```bash
# 강제 재배포
vercel --prod --force

# 빌드 로그 실시간 확인
vercel logs [deployment-url] --follow
```

---

### 3. 브라우저 개발자 도구 확인
```
F12 → Console 탭
→ 에러 메시지 확인
→ Network 탭에서 실패한 요청 확인
```

---

## 📊 체크리스트

### Vercel 설정
- [ ] vercel.json 존재
- [ ] rewrites 설정됨
- [ ] outputDirectory: "dist"
- [ ] buildCommand: "npm run build"

### 빌드 확인
- [ ] 로컬 빌드 성공 (`npm run build`)
- [ ] dist 폴더 생성됨
- [ ] index.html 존재
- [ ] assets 폴더 존재

### 배포 상태
- [ ] Vercel 대시보드에서 "Ready" 상태
- [ ] 배포 URL 복사됨
- [ ] URL 접속 시도

### 브라우저 테스트
- [ ] Chrome에서 테스트
- [ ] 시크릿 모드에서 테스트
- [ ] 캐시 삭제 후 테스트
- [ ] Console 에러 확인

---

## 🚀 빠른 해결 단계

### Step 1: vercel.json 업데이트
```bash
# 현재 디렉토리에서
cd C:\Users\sw860.park\Desktop\Cursor\SnakeGame

# vercel.json이 올바른지 확인
# (위의 완전한 vercel.json 사용)
```

### Step 2: 재빌드 및 재배포
```bash
# 로컬 빌드 테스트
npm run build
npm run preview

# 정상이면 재배포
vercel --prod --force
```

### Step 3: 캐시 클리어
```bash
# Vercel 캐시 제거
vercel rm [project-name] --yes
vercel --prod
```

---

## 🔍 디버깅 명령어

### Vercel CLI
```bash
# 배포 목록
vercel ls

# 특정 배포 정보
vercel inspect [deployment-url]

# 로그 확인
vercel logs [deployment-url]

# 환경 변수 확인
vercel env ls
```

### 로컬 테스트
```bash
# 개발 서버
npm run dev

# 프로덕션 빌드
npm run build

# 프리뷰 서버
npm run preview

# 빌드 분석
npm run build -- --mode production --debug
```

---

## 💡 자주 발생하는 실수

### 1. base URL 문제
```typescript
// ❌ 잘못됨
export default defineConfig({
  base: '/snake-game/', // GitHub Pages용
});

// ✅ Vercel용
export default defineConfig({
  base: '/', // 루트
});
```

### 2. 환경 변수
```bash
# Vercel 대시보드에서 설정
Settings → Environment Variables
→ VITE_로 시작하는 변수만 클라이언트에서 접근 가능
```

### 3. Node 버전
```json
// package.json에 추가
{
  "engines": {
    "node": ">=18.0.0"
  }
}
```

---

## 📞 추가 도움

### Vercel 공식 문서
- https://vercel.com/docs
- https://vercel.com/docs/concepts/projects/overview

### 커뮤니티
- Vercel Discord
- Stack Overflow: [vercel] 태그

### 로그 제출
```bash
# 상세 로그 출력
vercel --debug
```

---

## ✅ 해결 확인

배포가 성공하면:
```
✅ URL 접속 가능
✅ 게임 로드됨
✅ 모든 기능 작동
✅ 모바일에서도 접속 가능
✅ PWA 설치 가능
```

---

**대부분의 경우 vercel.json 설정 문제이거나 캐시 문제입니다!**

위의 완전한 vercel.json을 사용하고 `vercel --prod --force`로 재배포해보세요! 🚀

