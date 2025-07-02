# ProductDetail 화면 정의서

### 📜 개요
<img src="../images/Productdetail.JPG" alt="제품 상세 화면 이미지" width="450" height="290" />

- URL의 제품 ID를 사용하여 로컬 데이터(`../features/product/ProductData`)에서 <br>해당 제품의 상세 정보를 찾아 표시하는 화면이다.
- 사용자는 제품 정보를 확인하고 장바구니에 추가할 수 있다.

### 🔧 주요 기능
- **제품 정보 표시**: 제품 이미지, 이름, 카테고리, 가격, 설명을 화면에 보여준다.
- **뒤로가기**: 버튼 클릭 시 이전 페이지로 이동한다.
- **장바구니 담기**: 버튼 클릭 시 제품이 장바구니에 추가되고,알림 메세지 출력.

### 📥 주요 컴포넌트 및 훅
- `ProductDetail` - 제품 상세 정보를 렌더링하는 React 함수형 컴포넌트.
- `useParams` - URL에서 제품 `id` 파라미터를 추출.
- `useNavigate` - 프로그래밍 방식의 페이지 이동(뒤로가기)을 가능하게 함.

### 🔍 주요 함수
- `useParams()`: URL 경로에서 `:id`와 같이 동적으로 변하는 값을 추출할 때 사용하는 React Router 훅. 예를 들어, `/products/123` 경로에서 '123'과 같은 제품 ID를 가져온다.
- `useNavigate()`: 페이지를 이동시키기 위한 함수를 반환하는 React Router 훅.
- `handleAddToCart()`: '장바구니 담기' 버튼 클릭 시 실행되며, 제품이 장바구니에 추가되었음을 알리는 간단한 알림을 표시한다.
