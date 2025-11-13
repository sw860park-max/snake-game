# ⚡ GitHub 빠른 연결 가이드

## 🎯 3단계로 완료!

### 방법 1: 자동 스크립트 (가장 쉬움) ⭐

```bash
# 더블클릭으로 실행
setup-github.bat
```

스크립트가 자동으로:
1. Git 사용자 정보 설정
2. 저장소 초기화
3. 파일 커밋
4. Remote 연결
5. GitHub에 푸시

---

### 방법 2: 수동 명령어 (3분)

#### 1️⃣ Git 설정
```bash
git config --global user.name "your-username"
git config --global user.email "your-email@example.com"
```

#### 2️⃣ GitHub 저장소 생성
1. https://github.com/new
2. Repository name: `snake-game`
3. Public
4. Create repository

#### 3️⃣ 연결 & 푸시
```bash
cd C:\Users\sw860.park\Desktop\Cursor\SnakeGame

git init
git add .
git commit -m "feat: mobile snake game"
git branch -M main
git remote add origin https://github.com/[username]/snake-game.git
git push -u origin main
```

---

## 🔑 인증 방법

### Personal Access Token (권장)

**생성:**
```
GitHub → Settings → Developer settings 
→ Personal access tokens → Generate new token
→ repo 체크 → Generate token
→ 토큰 복사!
```

**사용:**
```
git push -u origin main
Username: your-username
Password: [토큰 붙여넣기]
```

---

## ✅ 완료 확인

### GitHub에서 확인
```
https://github.com/[username]/snake-game
→ 파일들이 보이면 성공!
```

### Vercel 연동
```
https://vercel.com → New Project 
→ Import Git Repository 
→ snake-game 선택 → Deploy
```

---

## 🚨 문제 해결

### "fatal: not a git repository"
```bash
git init
```

### "Authentication failed"
```bash
# Personal Access Token 재생성
https://github.com/settings/tokens
```

### "remote origin already exists"
```bash
git remote remove origin
git remote add origin [새-URL]
```

---

## 📝 모든 명령어 (복사해서 사용)

```bash
# 1. Git 설정
git config --global user.name "your-username"
git config --global user.email "your-email@example.com"

# 2. 저장소 초기화 및 커밋
cd C:\Users\sw860.park\Desktop\Cursor\SnakeGame
git init
git add .
git commit -m "feat: mobile-optimized snake game with PWA"

# 3. GitHub 연결 (저장소 URL 변경 필요)
git branch -M main
git remote add origin https://github.com/[username]/snake-game.git
git push -u origin main
```

**[username]을 실제 GitHub 사용자명으로 변경하세요!**

---

## 🎉 성공하면

### 다음 작업
- ✅ GitHub에 코드 호스팅됨
- ✅ Vercel에 자동 배포 가능
- ✅ 코드 버전 관리 시작
- ✅ 협업 준비 완료

### 앞으로 작업할 때
```bash
# 코드 수정 후
git add .
git commit -m "update: ..."
git push

# → GitHub 자동 업데이트
# → Vercel 자동 재배포
```

---

**지금 바로 시작하세요!** 

`setup-github.bat` 더블클릭 또는 위의 명령어 복사-붙여넣기! 🚀

