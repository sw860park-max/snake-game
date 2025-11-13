# Snake Web Game — Project Instructions


## 1. Overview
HTML5/TypeScript/React 기반 Snake 웹게임. 60fps 목표, 모바일/PC 대응.


### Core Features
- 기본 뱀 이동/충돌/성장/사과 먹기
- 옵션: 속도, 보드 크기, 벽 모드(normal/wrap/obstacles)
- 랜덤 아이템(apple, bomb, slow, invincible 등)
- 미션/업적 시스템, 데일리 미션
- 로컬 프로필 저장 및 랭킹
- PWA 지원 (오프라인 플레이)


---


## 2. Stack
- React + TypeScript + Vite
- Zustand (상태관리)
- Canvas 2D (렌더링)
- Tailwind CSS (스타일)
- Vitest / Playwright (테스트)
- vite-plugin-pwa (PWA)


---


## 3. Folder Structure
/src /game engine.ts # 루프/틱 관리 
grid.ts # 좌표 유틸 rng.ts # 시드형 RNG snake.ts # 이동/성장/충돌 items.ts # 아이템 스폰/효과 missions.ts # 미션/업적 로직 /state store.ts # Zustand 스토어 /ui CanvasView.tsx Hud.tsx Menus.tsx Settings.tsx Profile.tsx /utils storage.ts input.ts

---


## 4. Game Logic Guidelines
- Fixed tick loop (10–20 TPS) + requestAnimationFrame 렌더
- 방향 반전 방지(`pendingDir` → `dir` 커밋)
- 래핑 모드: x<0 → gridW-1, y<0 → gridH-1
- 아이템 TTL 및 가중 랜덤 스폰
- Dirty rendering으로 최적화


---


## 5. Feature Implementation Order
1️⃣ Scaffold (Vite + TS + Tailwind + Zustand)
2️⃣ Snake movement, grid, basic apple & score
3️⃣ Collision + wall modes
4️⃣ Random item system (weighted spawn)
5️⃣ Settings screen (옵션 반영)
6️⃣ Missions/Achievements/Profile
7️⃣ PWA + tests (Vitest + Playwright)


---


## 6. Acceptance Checklist
- [ ] 자기몸/벽/장애물 충돌 정확
- [ ] 옵션 변경 반영 (속도/벽 모드 등)
- [ ] 랜덤 아이템 TTL, 효과 정상 작동
- [ ] 미션 진행률 표시 및 완료 토스트
- [ ] 로컬 프로필/랭킹 저장
- [ ] 평균 55fps 이상 유지
- [ ] PWA 설치 및 오프라인 동작


---


## 7. Commit Guidelines
- Use **Conventional Commits**: feat, fix, refactor, chore, test, docs
- Example: `feat(game): add wrap mode and collision handling`


---


## 8. Testing
- 최소 20개의 단위 테스트 (grid, collision, RNG, TTL 등)
- e2e (Playwright): 게임 시작, 점수 증가, 일시정지 검증


---


## 9. Deployment
- GitHub Pages, Vercel, 또는 Netlify
- `npm run build && npm run preview`


---


## 10. Optional Extensions
- 로컬 2P 모드
- 글로벌 리더보드 (백엔드 연동)
- 온라인 대전 (WebSocket)
