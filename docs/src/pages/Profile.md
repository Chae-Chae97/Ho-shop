# Profile 화면 정의서
### 📜 개요
<img src="../images/Profile.JPG" alt="이미지 설명" width="400" height="300" />

- 사용자 정보를 조회하고 수정하며, 크레딧을 충전하고 구매 내역을 확인할 수 있는 페이지이다.
- 로그인한 사용자만 접근 가능하다.

### 🔧 주요 기능
- 사용자 아이디 표시
- 사용자 이름 수정 기능
- 사용자 비밀번호 변경 기능 (유효성 검사 포함)
- 현재 크레딧 잔액 표시
- 크레딧 충전 기능
- 구매 내역 조회 (PurchaseHistory 컴포넌트 사용)

### 📥 주요 컴포넌트 및 훅
- ProfilePage - 페이지 전체 로직을 담당하는 컨테이너 컴포넌트
- PurchaseHistory - 사용자의 구매 내역을 표시하는 컴포넌트
- useAuth - 사용자 인증 정보 (currentUser, logout, updateUser) 관리
- useCredit - 사용자 크레딧 정보 (credit, chargeCredit) 관리
- useState - 컴포넌트 상태 관리 (이름 수정, 비밀번호 변경, 크레딧 충전 등)

### 🔍 주요 함수
- **handleNameUpdate()**: 이름 유효성 검사 후 localStorage 및 UI 업데이트.
- **handlePasswordUpdate()**: 비밀번호 유효성 검사 및 확인 후 localStorage 및 context 업데이트.
- **updateUserInStorage(updatedUser)**: localStorage에 사용자 정보 업데이트.
- **handleCharge()**: 충전 금액 유효성 검사 후 크레딧 충전 및 UI 업데이트.

### 💾 useState 변수 및 역할
|변수|	설명|
|---|---|
|isEditingName|	이름 수정 모드 활성화/비활성화 (boolean)|
|newName|	수정할 새로운 이름 입력값|
|isEditingPassword|	비밀번호 변경 모드 활성화/비활성화 (boolean)|
|newPassword|	변경할 새로운 비밀번호 입력값|
|showPassword|	비밀번호 표시/숨기기 토글 (boolean)|
|chargeAmount|	크레딧 충전 금액 입력값|

### validate( ) 함수의 유효성 검사 기준 (handlePasswordUpdate 함수 내)
|항목|조건|정규식|
|---|---|---|
|비밀번호|	영문+숫자+특수문자 포함 8~20자|`passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;`|
|이름|	공백이 아니어야 함|`!newName.trim()`|
|충전 금액|	숫자이며 0보다 커야 함|`isNaN(amount) || amount <= 0`|
