# 🔗 GitHub 새 계정 연결 가이드

## 📋 단계별 가이드

### 1️⃣ Git 사용자 정보 설정

새로운 GitHub 계정 정보로 설정:

```bash
# 전역 설정 (모든 프로젝트에 적용)
git config --global user.name "Your GitHub Username"
git config --global user.email "your-email@example.com"

# 또는 이 프로젝트만 설정
git config user.name "Your GitHub Username"
git config user.email "your-email@example.com"
```

**예시:**
```bash
git config --global user.name "john-doe"
git config --global user.email "john.doe@gmail.com"
```

---

### 2️⃣ Git 저장소 초기화

```bash
# Snake 게임 폴더에서
cd C:\Users\sw860.park\Desktop\Cursor\SnakeGame

# Git 초기화
git init

# .gitignore 확인 (이미 존재)
# node_modules, dist, .vercel 등이 제외됨
```

---

### 3️⃣ GitHub에 새 저장소 만들기

#### 웹에서 생성
1. https://github.com 접속 (새 계정으로 로그인)
2. 오른쪽 위 "+" → "New repository"
3. Repository 정보 입력:
   - **Repository name**: `snake-game` (또는 원하는 이름)
   - **Description**: "Mobile-optimized Snake game with PWA support"
   - **Public/Private**: Public 선택 (공개)
   - **README, .gitignore, license**: 체크 안 함 (이미 있음)
4. "Create repository" 클릭

---

### 4️⃣ 로컬 파일 커밋

```bash
# 모든 파일 추가
git add .

# 첫 커밋
git commit -m "feat: mobile-optimized snake game with PWA support"
```

**또는 더 자세한 커밋 메시지:**
```bash
git commit -m "feat: complete snake game

- Mobile-optimized UI with D-Pad controls
- Responsive canvas and grid
- Touch and swipe gestures
- PWA support for offline play
- Missions and achievements system
- Local ranking leaderboard
- 3 game modes (normal, wrap, obstacles)
- 5 power-up items
- Network access enabled
- Vercel deployment ready"
```

---

### 5️⃣ GitHub 저장소 연결

```bash
# 원격 저장소 추가 (GitHub에서 복사한 URL 사용)
git remote add origin https://github.com/[username]/snake-game.git

# 기본 브랜치를 main으로 설정
git branch -M main

# GitHub에 푸시
git push -u origin main
```

**예시:**
```bash
git remote add origin https://github.com/john-doe/snake-game.git
git branch -M main
git push -u origin main
```

---

### 6️⃣ GitHub 인증

#### 방법 A: Personal Access Token (권장)

**토큰 생성:**
1. GitHub → Settings → Developer settings
2. Personal access tokens → Tokens (classic)
3. "Generate new token" → "Generate new token (classic)"
4. 설정:
   - Note: "Snake Game Deployment"
   - Expiration: 90 days (또는 원하는 기간)
   - 권한: `repo` 전체 체크
5. "Generate token" 클릭
6. **토큰 복사** (다시 볼 수 없음!)

**사용:**
```bash
# Push 시 비밀번호 대신 토큰 입력
git push -u origin main
Username: your-username
Password: [붙여넣기: ghp_xxxxxxxxxxxx]
```

#### 방법 B: GitHub CLI (더 쉬움)

```bash
# GitHub CLI 설치
winget install --id GitHub.cli

# 인증
gh auth login

# 대화형 선택:
# - GitHub.com
# - HTTPS
# - Login with web browser
# → 브라우저에서 코드 입력

# 저장소 푸시
git push -u origin main
```

#### 방법 C: SSH Key

```bash
# SSH 키 생성
ssh-keygen -t ed25519 -C "your-email@example.com"

# 공개 키 복사
cat ~/.ssh/id_ed25519.pub

# GitHub → Settings → SSH and GPG keys
# → New SSH key → 붙여넣기

# Remote URL을 SSH로 변경
git remote set-url origin git@github.com:[username]/snake-game.git
git push -u origin main
```

---

## 🔧 기존 Git 설정 제거 (필요시)

### 전역 사용자 정보 확인
```bash
git config --global --list
```

### 기존 설정 제거
```bash
# 전역 사용자 정보 제거
git config --global --unset user.name
git config --global --unset user.email

# 크리덴셜 제거
git config --global --unset credential.helper
```

### 새 정보로 재설정
```bash
git config --global user.name "new-username"
git config --global user.email "new-email@example.com"
```

---

## 📝 완전한 설정 스크립트

### setup-github.bat 생성

```batch
@echo off
echo ========================================
echo   GitHub 새 계정 연결
echo ========================================
echo.

echo [1/5] Git 사용자 정보 설정
set /p username="GitHub Username: "
set /p email="GitHub Email: "

git config user.name "%username%"
git config user.email "%email%"

echo.
echo [2/5] Git 저장소 초기화
git init

echo.
echo [3/5] 파일 스테이징
git add .

echo.
echo [4/5] 첫 커밋 생성
git commit -m "feat: mobile-optimized snake game with PWA support"

echo.
echo [5/5] Remote 저장소 연결
echo GitHub에서 저장소를 먼저 생성하세요:
echo https://github.com/new
echo.
set /p repo_url="저장소 URL (https://github.com/username/repo.git): "

git remote add origin %repo_url%
git branch -M main

echo.
echo 설정 완료! 이제 다음 명령어를 실행하세요:
echo   git push -u origin main
echo.
pause
```

---

## ✅ 체크리스트

### Git 설정
- [ ] Git 사용자 이름 설정
- [ ] Git 이메일 설정
- [ ] Git 저장소 초기화
- [ ] .gitignore 확인

### GitHub
- [ ] 새 계정으로 로그인
- [ ] 새 저장소 생성
- [ ] 저장소 URL 복사
- [ ] Personal Access Token 생성 (또는 SSH Key)

### 연결
- [ ] Remote 저장소 추가
- [ ] 파일 커밋
- [ ] 브랜치를 main으로 설정
- [ ] GitHub에 푸시

### 확인
- [ ] GitHub에서 파일 확인
- [ ] 커밋 히스토리 확인
- [ ] README 표시 확인

---

## 🚀 Vercel 연동 (추가)

GitHub 연결 후 Vercel 자동 배포:

```bash
# Vercel 대시보드에서
1. New Project
2. Import Git Repository
3. snake-game 선택
4. Deploy

# 이제 GitHub에 푸시할 때마다 자동 배포!
```

---

## 🔍 문제 해결

### "Authentication failed"
```bash
# Personal Access Token 재생성
# GitHub → Settings → Developer settings → Personal access tokens

# 또는 Credential Manager에서 제거
제어판 → 자격 증명 관리자 → Windows 자격 증명 → github.com 제거
```

### "Repository not found"
```bash
# Remote URL 확인
git remote -v

# 잘못된 경우 수정
git remote set-url origin https://github.com/[correct-username]/[correct-repo].git
```

### "Permission denied"
```bash
# 저장소 소유자 확인
# 저장소가 본인 계정에 있는지 확인

# SSH 키 권한 확인 (SSH 사용 시)
ssh -T git@github.com
```

### "fatal: not a git repository"
```bash
# Git 초기화
git init
git add .
git commit -m "initial commit"
```

---

## 📚 유용한 Git 명령어

### 상태 확인
```bash
git status              # 변경사항 확인
git log --oneline       # 커밋 히스토리
git remote -v           # Remote 저장소 확인
git branch -a           # 브랜치 목록
```

### 변경사항 관리
```bash
git add .               # 모든 파일 추가
git add [file]          # 특정 파일만 추가
git commit -m "msg"     # 커밋
git push                # 푸시
git pull                # 풀
```

### Remote 관리
```bash
git remote add origin [url]         # Remote 추가
git remote remove origin            # Remote 제거
git remote set-url origin [new-url] # URL 변경
```

---

## 🎯 다음 단계

### 1. GitHub 저장소 생성
→ https://github.com/new

### 2. 설정 스크립트 실행
→ `setup-github.bat`

### 3. GitHub에 푸시
→ `git push -u origin main`

### 4. Vercel 연동
→ https://vercel.com/new

---

**이제 Snake 게임이 GitHub에 호스팅됩니다!** 🎉

코드를 수정하고 푸시할 때마다:
- ✅ GitHub에 자동 저장
- ✅ Vercel이 자동 재배포
- ✅ 변경사항이 즉시 반영

**전 세계와 게임을 공유하세요!** 🌍🐍

