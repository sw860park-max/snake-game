# 🚀 Vercel 배포 가이드

## ✅ 빌드 완료!

프로덕션 빌드가 성공적으로 생성되었습니다:
```
dist/index.html           2.42 kB │ gzip:  0.90 kB
dist/assets/index.css    16.92 kB │ gzip:  3.98 kB
dist/assets/index.js    178.00 kB │ gzip: 55.67 kB
```

---

## 🌐 Vercel 배포 방법

### 방법 1: Vercel CLI (추천)

#### 1단계: Vercel 로그인
```bash
vercel login
```
이메일을 입력하면 확인 메일이 발송됩니다.

#### 2단계: 프로젝트 배포
```bash
vercel --prod
```

대화형 질문에 답변:
```
? Set up and deploy? → Y (예)
? Which scope? → 개인 계정 선택
? Link to existing project? → N (아니오)
? What's your project's name? → snake-game (또는 원하는 이름)
? In which directory is your code located? → ./
? Want to override settings? → N (아니오)
```

#### 3단계: 배포 완료!
```
✅ Production: https://snake-game-xyz.vercel.app
```

---

### 방법 2: Vercel 웹사이트 (더 쉬움)

#### 1단계: GitHub에 코드 푸시
```bash
# Git 초기화 (처음이면)
git init
git add .
git commit -m "feat: mobile-optimized snake game"

# GitHub 저장소 생성 후
git remote add origin https://github.com/[username]/snake-game.git
git branch -M main
git push -u origin main
```

#### 2단계: Vercel 연동
1. https://vercel.com 접속
2. "Add New" → "Project" 클릭
3. GitHub 계정 연결
4. 저장소 선택 (`snake-game`)
5. "Deploy" 클릭

#### 3단계: 자동 배포 완료!
- 배포 URL 자동 생성
- GitHub에 푸시할 때마다 자동 재배포

---

### 방법 3: Drag & Drop (가장 쉬움)

#### 1단계: Vercel 접속
https://vercel.com → 로그인

#### 2단계: dist 폴더 드래그
1. "Add New" → "Project"
2. "Deploy from template" 대신 "Import" 탭
3. `dist` 폴더를 브라우저로 드래그 앤 드롭

#### 3단계: 즉시 배포!
URL이 생성되어 바로 접속 가능

---

## 🔧 현재 프로젝트 설정

### vercel.json (이미 생성됨)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite"
}
```

### 빌드 출력 위치
```
dist/
├── index.html
├── assets/
│   ├── index.css
│   └── index.js
├── manifest.webmanifest
└── registerSW.js
```

---

## 📱 배포 후 테스트

### 1. 데스크톱
```
Chrome → https://[your-url].vercel.app
- 키보드 컨트롤 테스트
- 60 FPS 확인
```

### 2. 모바일
```
Safari/Chrome → https://[your-url].vercel.app
- D-Pad 컨트롤 테스트
- 터치 반응 확인
- PWA 설치 테스트
```

### 3. PWA 설치
```
모바일: 공유 → "홈 화면에 추가"
데스크톱: 주소창 → 설치 아이콘
```

---

## 🎯 배포 명령어 모음

### 빌드
```bash
npm run build
```

### 로컬 미리보기
```bash
npm run preview
```

### Vercel 배포
```bash
# 개발 환경
vercel

# 프로덕션 (실제 URL)
vercel --prod
```

### 배포 확인
```bash
vercel ls
```

### 로그 확인
```bash
vercel logs [deployment-url]
```

---

## 🔄 업데이트 방법

### 코드 수정 후
```bash
# 1. 빌드
npm run build

# 2. 배포
vercel --prod
```

### GitHub 연동 시
```bash
# 1. 커밋
git add .
git commit -m "update: ..."
git push

# 2. Vercel이 자동으로 재배포
```

---

## 🌐 커스텀 도메인 설정

### Vercel 대시보드에서
1. 프로젝트 선택
2. "Settings" → "Domains"
3. "Add Domain" 클릭
4. 도메인 입력 (예: snake.yourdomain.com)
5. DNS 설정 안내 따르기

---

## 📊 배포 후 기능

### 자동 제공되는 기능
- ✅ HTTPS 자동 적용
- ✅ CDN (전 세계 배포)
- ✅ 무제한 대역폭
- ✅ Git 기반 자동 배포
- ✅ 프리뷰 배포 (PR마다)
- ✅ 분석 도구

### 환경 변수 (필요시)
```
Vercel 대시보드 → Settings → Environment Variables
```

---

## 🎉 배포 완료 체크리스트

### 빌드
- [x] `npm run build` 성공
- [x] dist 폴더 생성 확인
- [x] 빌드 크기 확인 (55.67 KB gzipped)

### Vercel 설정
- [ ] Vercel CLI 설치
- [ ] Vercel 로그인
- [ ] 프로젝트 배포
- [ ] URL 확인

### 테스트
- [ ] 데스크톱 접속 테스트
- [ ] 모바일 접속 테스트
- [ ] 게임플레이 확인
- [ ] PWA 설치 테스트

### 공유
- [ ] URL 친구에게 공유
- [ ] 소셜 미디어 공유
- [ ] README에 URL 추가

---

## 🚨 문제 해결

### "Command not found: vercel"
```bash
npm install -g vercel
```

### "Authentication required"
```bash
vercel login
```

### "Build failed"
```bash
# 로컬에서 먼저 테스트
npm run build
npm run preview
```

### "404 Not Found"
- `vercel.json` 확인
- `outputDirectory`: "dist" 확인
- 재배포: `vercel --prod --force`

---

## 📞 다음 단계

### 즉시 배포
```bash
# 현재 터미널에서
vercel login
vercel --prod
```

### 또는 웹사이트 사용
1. https://vercel.com 접속
2. GitHub 저장소 연결
3. 클릭 한 번으로 배포

---

## 💡 배포 팁

### 1. 빌드 최적화
- 이미 최적화됨 (gzip: 55.67 KB)
- 코드 스플리팅 적용됨
- Tree-shaking 적용됨

### 2. 성능
- Vercel CDN 사용
- 자동 캐싱
- Edge Network

### 3. SEO
- 메타 태그 이미 설정됨
- PWA manifest 포함
- 모바일 최적화 완료

---

## 🎯 예상 URL 형식

```
개발 배포: https://snake-game-[random].vercel.app
프로덕션: https://snake-game.vercel.app
커스텀: https://snake.yourdomain.com
```

---

**배포 준비 완료! 이제 `vercel --prod` 명령어만 실행하면 됩니다!** 🚀

또는 https://vercel.com 에서 GitHub 저장소를 연결하세요!

