# 🔄 Vercel 재배포 가이드

## ✅ 수정 완료!

다음 설정이 업데이트되었습니다:

### 1. `vercel.json` 개선
- ✅ version: 2 추가
- ✅ headers 설정 (캐싱, 보안)
- ✅ rewrites 설정 (SPA 라우팅)

### 2. `vite.config.ts` 개선
- ✅ base: '/' 명시
- ✅ build 설정 추가
- ✅ sourcemap 비활성화 (성능)

### 3. 빌드 완료
```
✓ 60 modules transformed
dist/index.html           2.42 kB │ gzip:  0.90 kB
dist/assets/index.css    16.92 kB │ gzip:  3.98 kB
dist/assets/index.js    178.00 kB │ gzip: 55.67 kB
```

---

## 🚀 재배포 방법

### 방법 1: Vercel CLI (추천)

```bash
# 강제 재배포
vercel --prod --force
```

대기 후 새 URL 확인!

---

### 방법 2: Git Push (자동)

```bash
# 변경사항 커밋
git add .
git commit -m "fix: vercel config for external access"
git push

# Vercel이 자동으로 재배포
```

---

### 방법 3: Vercel 웹사이트

```
1. https://vercel.com/dashboard
2. 프로젝트 선택
3. "Redeploy" 버튼 클릭
4. "Redeploy" 확인
```

---

## 🧪 테스트 방법

### 1. 로컬 테스트 (먼저 확인)
```bash
npm run preview
```
→ http://localhost:4173 접속
→ 정상 작동 확인

### 2. Vercel URL 테스트
```
배포 완료 후:
→ Vercel에서 제공한 URL 접속
→ 다른 기기에서도 접속 테스트
```

### 3. 모바일 테스트
```
스마트폰에서:
→ URL 입력
→ D-Pad 컨트롤 확인
→ 터치 반응 확인
```

---

## 🔍 문제가 계속되면

### 1. 캐시 문제
```bash
# 브라우저 캐시 삭제
Ctrl + Shift + Del

# 시크릿 모드에서 접속
Ctrl + Shift + N (Chrome)

# 다른 브라우저에서 테스트
Edge, Firefox 등
```

### 2. Vercel 캐시 클리어
```bash
# 프로젝트 제거 후 재배포
vercel rm [project-name] --yes
vercel --prod
```

### 3. 브라우저 개발자 도구 확인
```
F12 → Console
→ 에러 메시지 확인
→ Network 탭에서 실패한 요청 확인
```

---

## 📋 체크리스트

### 설정 파일
- [x] `vercel.json` 업데이트됨
- [x] `vite.config.ts` 업데이트됨
- [x] 로컬 빌드 성공

### 재배포
- [ ] `vercel --prod --force` 실행
- [ ] 또는 Git push
- [ ] 배포 완료 대기 (1-2분)

### 테스트
- [ ] 새 URL 접속
- [ ] 게임 로드 확인
- [ ] 모든 기능 작동 확인
- [ ] 모바일 테스트

---

## 💡 예상 결과

### 배포 성공 시
```
✅ https://[your-project].vercel.app
→ 게임이 정상적으로 로드됨
→ PC/모바일 모두 접속 가능
→ 모든 기능 작동
```

### 주요 개선사항
- ✅ SPA 라우팅 개선 (404 방지)
- ✅ 캐싱 최적화 (로딩 속도 향상)
- ✅ 보안 헤더 추가
- ✅ 빌드 설정 최적화

---

## 🚨 여전히 문제가 있다면

### 확인 사항

1. **Vercel 대시보드 확인**
   ```
   https://vercel.com/dashboard
   → 프로젝트 상태 "Ready"인지 확인
   ```

2. **빌드 로그 확인**
   ```
   Deployments → 최신 배포 클릭
   → "Building" 탭에서 에러 확인
   ```

3. **도메인 설정 확인**
   ```
   Settings → Domains
   → 올바른 도메인 설정 확인
   ```

4. **Framework Preset 확인**
   ```
   Settings → General
   → Framework Preset: "Vite" 확인
   → Output Directory: "dist" 확인
   ```

---

## 📞 추가 지원

### 로그 확인
```bash
# 실시간 로그
vercel logs [deployment-url] --follow

# 최근 로그
vercel logs [deployment-url]
```

### 디버그 모드
```bash
# 상세 정보 출력
vercel --debug --prod
```

### 환경 확인
```bash
# Node 버전
node --version  # 18.0.0 이상 필요

# npm 버전
npm --version

# Vercel CLI 버전
vercel --version
```

---

## ✨ 성공 후 할 일

### 1. URL 공유
```
친구들에게 공유:
https://[your-project].vercel.app
```

### 2. PWA 설치
```
모바일: "홈 화면에 추가"
데스크톱: 주소창의 설치 아이콘
```

### 3. 커스텀 도메인 (선택)
```
Vercel → Settings → Domains
→ 본인 도메인 연결
```

---

## 🎯 빠른 명령어

### 즉시 재배포
```bash
cd C:\Users\sw860.park\Desktop\Cursor\SnakeGame
vercel --prod --force
```

### 상태 확인
```bash
vercel ls
vercel inspect [url]
```

### 로컬 테스트
```bash
npm run build
npm run preview
```

---

**이제 재배포하세요!** 🚀

```bash
vercel --prod --force
```

또는

```bash
git add .
git commit -m "fix: improve vercel config"
git push
```

**접속 문제가 해결될 것입니다!** ✨

