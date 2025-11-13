@echo off
chcp 65001 >nul
echo ========================================
echo   GitHub 새 계정 연결 설정
echo ========================================
echo.

echo 📝 Step 1: Git 사용자 정보 설정
echo.
set /p username="GitHub Username: "
set /p email="GitHub Email: "

git config user.name "%username%"
git config user.email "%email%"

echo ✅ 사용자 정보 설정 완료
echo    Name: %username%
echo    Email: %email%
echo.
pause

echo.
echo 📦 Step 2: Git 저장소 초기화
git init
echo ✅ Git 저장소 초기화 완료
echo.
pause

echo.
echo 📁 Step 3: 파일 스테이징
git add .
echo ✅ 모든 파일이 스테이징되었습니다
echo.
pause

echo.
echo 💾 Step 4: 첫 커밋 생성
git commit -m "feat: mobile-optimized snake game with PWA support"
echo ✅ 커밋 생성 완료
echo.
pause

echo.
echo ========================================
echo   GitHub 저장소 생성 필요
echo ========================================
echo.
echo 1. https://github.com/new 를 브라우저에서 열기
echo 2. Repository name: snake-game
echo 3. Public 선택
echo 4. Create repository 클릭
echo 5. 생성된 저장소 URL 복사
echo.
echo 예시: https://github.com/username/snake-game.git
echo.
set /p repo_url="저장소 URL 입력: "

echo.
echo 🔗 Step 5: Remote 저장소 연결
git remote add origin %repo_url%
git branch -M main
echo ✅ Remote 저장소 연결 완료
echo.

echo ========================================
echo   설정 완료!
echo ========================================
echo.
echo 이제 다음 명령어를 실행하세요:
echo.
echo   git push -u origin main
echo.
echo Personal Access Token이 필요합니다:
echo 1. https://github.com/settings/tokens
echo 2. Generate new token (classic)
echo 3. repo 권한 체크
echo 4. Generate token
echo 5. 토큰 복사
echo.
echo Push 시 Password에 토큰을 붙여넣으세요!
echo.
pause

echo.
echo 🚀 Push를 시도하시겠습니까? (Y/N)
set /p push_now="선택: "

if /i "%push_now%"=="Y" (
    echo.
    echo Pushing to GitHub...
    git push -u origin main
    echo.
    if %errorlevel%==0 (
        echo ✅ GitHub에 성공적으로 푸시되었습니다!
        echo.
        echo 🌐 다음 단계:
        echo 1. https://github.com/%username%/snake-game 확인
        echo 2. https://vercel.com 에서 저장소 import
        echo 3. 자동 배포 완료!
    ) else (
        echo ❌ Push 실패. Personal Access Token을 확인하세요.
        echo https://github.com/settings/tokens
    )
) else (
    echo.
    echo 수동으로 푸시하려면:
    echo   git push -u origin main
)

echo.
pause

