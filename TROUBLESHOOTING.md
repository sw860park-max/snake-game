# 🔧 Snake Game 문제 해결 가이드

## ⌨️ 키보드 입력 인식 문제

### 문제: 키를 눌러도 뱀이 움직이지 않음

#### 해결 방법 1: 브라우저 새로고침
```
1. Ctrl + Shift + R (강력 새로고침)
2. 또는 F5
```

#### 해결 방법 2: 브라우저 콘솔 확인
```
1. F12 키를 눌러 개발자 도구 열기
2. Console 탭 선택
3. 키를 눌렀을 때 다음 로그가 보이는지 확인:
   - "Key pressed: ArrowUp → Direction: UP"
   - "changeDirection called: UP screen: game isAlive: true"
   - "Direction changed to: UP"
```

#### 해결 방법 3: 게임 화면이 포커스 상태인지 확인
```
- 게임 화면을 한 번 클릭하세요
- 다른 탭이나 창이 활성화되어 있으면 키 입력이 안될 수 있습니다
```

#### 해결 방법 4: 지원되는 키 확인
**방향키:**
- ⬆️ Arrow Up
- ⬇️ Arrow Down
- ⬅️ Arrow Left
- ➡️ Arrow Right

**WASD:**
- W / w (위)
- S / s (아래)
- A / a (왼쪽)
- D / d (오른쪽)

---

## 🎮 게임 관련 문제

### 문제: Game Over 화면이 안 나타남

**수정 완료!** 최신 버전에서는 자동으로 Game Over 화면이 표시됩니다.

브라우저를 새로고침하세요:
```bash
Ctrl + Shift + R
```

### 문제: 게임 속도가 너무 빠르거나 느림

**해결:**
1. 메인 메뉴 → Settings
2. Speed 슬라이더 조절 (5-20)
3. Back → Start Game

### 문제: 뱀이 180도 회전함

**정상 동작:** 180도 회전은 차단되어 있습니다.
- 예: 오른쪽으로 이동 중일 때 왼쪽 키를 눌러도 무시됩니다

### 문제: 아이템이 안 나타남

**확인사항:**
- 첫 번째 아이템(사과)은 게임 시작 시 자동 생성
- 추가 아이템은 랜덤 확률로 생성 (최대 3개)
- 그리드가 뱀으로 가득 찬 경우 생성 불가

---

## 🖥️ 성능 관련 문제

### 문제: 게임이 느리거나 끊김

**해결 방법 1: 그리드 크기 줄이기**
```
Settings → Grid Width: 20
Settings → Grid Height: 15
```

**해결 방법 2: 브라우저 캐시 삭제**
```
Chrome: Ctrl + Shift + Delete
```

**해결 방법 3: 하드웨어 가속 활성화**
```
Chrome 설정 → 고급 → 시스템 → "하드웨어 가속 사용" 체크
```

### 문제: FPS가 낮음

**확인:**
```javascript
// 브라우저 콘솔에서 실행
console.log('FPS:', 1000 / deltaTime);
```

**목표:** 55-60 FPS

---

## 🌐 브라우저 호환성

### 지원 브라우저
- ✅ Chrome 90+
- ✅ Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+

### 지원하지 않는 브라우저
- ❌ Internet Explorer (모든 버전)

---

## 📱 모바일 관련 문제

### 문제: 터치/스와이프가 작동 안 함

**해결:**
1. 화면을 확실하게 스와이프 (최소 30px 이동)
2. 짧게 탭하지 말고 길게 스와이프
3. 브라우저 새로고침

### 문제: 화면이 너무 작음

**해결:**
```
Settings → Grid Width: 20
Settings → Grid Height: 15
```

---

## 💾 저장 관련 문제

### 문제: 점수가 저장 안 됨

**확인사항:**
1. 브라우저의 LocalStorage 활성화 확인
2. 시크릿/프라이빗 모드에서는 저장 불가
3. 쿠키 차단 설정 확인

**저장 위치:**
- Settings: `localStorage.snake_settings`
- Profile: `localStorage.snake_profile`
- Rankings: `localStorage.snake_rankings`

### 문제: 데이터 초기화

**방법 1: 브라우저 콘솔**
```javascript
localStorage.clear();
location.reload();
```

**방법 2: 수동 삭제**
```javascript
localStorage.removeItem('snake_settings');
localStorage.removeItem('snake_profile');
localStorage.removeItem('snake_rankings');
location.reload();
```

---

## 🔊 소리 관련 문제

**현재 버전:** 소리 기능은 아직 구현되지 않았습니다.
- Settings에서 Sound 옵션이 보이지만 실제 소리는 나지 않습니다
- 향후 업데이트 예정

---

## 🐛 버그 리포트

### 디버그 정보 수집

**1. 브라우저 콘솔 로그 확인**
```
F12 → Console 탭
```

**2. 게임 상태 확인**
```javascript
// 브라우저 콘솔에서 실행
console.log(window.__ZUSTAND_STORE__.getState());
```

**3. 에러 메시지 복사**
```
콘솔에 빨간색으로 표시된 에러를 복사
```

### 자주 발생하는 에러

#### `Cannot read property 'isAlive' of null`
**원인:** 게임 상태가 초기화되지 않음
**해결:** 브라우저 새로고침

#### `Failed to load module`
**원인:** 빌드 문제
**해결:**
```bash
npm run build
npm run preview
```

#### `localStorage is not defined`
**원인:** SSR 환경 또는 브라우저 제한
**해결:** 클라이언트 브라우저에서만 실행

---

## 🔄 개발 서버 관련 문제

### 문제: `npm run dev`가 실행 안 됨

**해결 1: 포트 충돌**
```bash
# 포트 5173이 사용 중인지 확인
npx kill-port 5173
npm run dev
```

**해결 2: node_modules 재설치**
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**해결 3: Node.js 버전 확인**
```bash
node --version  # 18.0.0 이상이어야 함
```

### 문제: Hot reload가 작동 안 함

**해결:**
1. 파일 저장 (Ctrl + S)
2. 브라우저 수동 새로고침 (F5)
3. 개발 서버 재시작

---

## ✅ 빠른 해결 체크리스트

문제 발생 시 순서대로 시도해보세요:

- [ ] 브라우저 새로고침 (Ctrl + Shift + R)
- [ ] 게임 화면 클릭 (포커스 확인)
- [ ] F12로 콘솔 에러 확인
- [ ] 지원되는 키 사용 (화살표 또는 WASD)
- [ ] 다른 브라우저에서 테스트
- [ ] 개발 서버 재시작
- [ ] 캐시 삭제 후 재시도

---

## 📞 추가 도움

여전히 문제가 해결되지 않으면:

1. **콘솔 로그 확인**
   - F12 → Console
   - 키를 눌렀을 때 로그가 나타나는지 확인

2. **게임 상태 확인**
   - 게임이 'game' 화면인지 확인
   - 뱀이 살아있는지 확인 (isAlive: true)

3. **브라우저 정보**
   - 사용 중인 브라우저와 버전
   - 운영체제 정보

---

**최신 업데이트:** 2024-11-13
- ✅ 키보드 입력 인식 개선
- ✅ Game Over 화면 표시 수정
- ✅ 디버그 로그 추가

