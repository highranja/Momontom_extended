const
    login               = document.getElementById('login'), // 로그인 영역 요소
    email               = login.querySelector('#email'),
    pw                  = login.querySelector('#pw'),    
    regBtn              = login.querySelector('.register_btn a'),
    register            = document.getElementById('register'),   // 회원가입 영역 요소
    emailReg            = register.querySelector('#email_reg'),   // 아이디
    emailRegTxt         = register.querySelector('label[for="email_reg"]'),
    pwReg               = register.querySelector('#pw_reg'),   // 비밀번호
    pwRegTxt            = register.querySelector('label[for="pw_reg"]'),
    pwConfirm           = register.querySelector('#pw_confirm'),   // 비밀번호 확인
    pwConfirmTxt        = register.querySelector('label[for="pw_confirm"]'),
    registerUtil        = register.querySelector('.register_util'),
    back                = registerUtil.querySelector('button.back'),
    signUp              = registerUtil.querySelector('button.sign_up'),
    imgBg               = document.querySelector('img.bgImage');

const 
    USER_ID = 'Id',
    USER_PW = 'pw',
    currentUsed = 'currentUsed'; 
    
let     
    sw = 1,
    idList = [],
    pwList = [];

// 로그인 영역
function loginId(){
    const currentUser = localStorage.getItem(USER_ID),
        currentPassword = localStorage.getItem(USER_PW);
    if(email.value === currentUser && pw.value === currentPassword){
        alert(`${currentUser}님 MOMONTOM에 오신 걸 환영합니다.`);
        login.classList.add('off');
        document.querySelector('.wrap').classList.add('on');
        document.querySelector('body').classList.add('momontom');
        localStorage.setItem(currentUsed,'사용허가');        
    }else{
        email.value = '';
        pw.value = '';
        alert('없는 아이디 또는 비밀번호입니다.');
    }
}
login.addEventListener('submit',function(e){
    e.preventDefault();
    loginId();
});

// 로그인 성공한 적 있을 시
function userMomon(){
    if(localStorage.getItem(currentUsed) === '사용허가'){
        login.classList.add('off');
        document.querySelector('.wrap').classList.add('on');
        document.querySelector('body').classList.add('momontom');
    }
}
window.onload = userMomon();









//특수문자 유효성 검사
function checkSpecial(str) {
    var special_pattern = /[`~!#$%^&*|\\\'\";:\/?]/gi;
    if(special_pattern.test(str) === true) { 
        return true; 
    } else { 
        return false; 
    } 
}

// 회원가입 영역 유효성 검사
function registerId(){    
    if(emailReg.value.length <= 20 && // 20자 이내로
         emailReg.value.includes('@') && // @ 와 .com 을 붙여서        
         emailReg.value.endsWith('.com') && 
         !checkSpecial(emailReg.value)) { // 특수문자 @와 .을 제외한 특수문자 사용하지말기
        idList.push(emailReg.value);
        emailRegTxt.querySelector('.error').innerHTML = '';       

    }else if(!emailReg.value.includes('@') || !emailReg.value.endsWith('.com') ){
        emailReg.value ='';    
        emailRegTxt.querySelector('.error').innerHTML = 'email@naver.com 형식으로 맞춰서 입력해주세요.';

    }else if(emailReg.value.length > 20){
        emailReg.value ='';    
        emailRegTxt.querySelector('.error').innerHTML = '아이디를 20자 내로 입력해주세요.'; 

    }else if(checkSpecial(emailReg.value)){
        emailReg.value ='';    
        emailRegTxt.querySelector('.error').innerHTML = '"@", "."을 제외한 특수문자는 입력하지 마세요.';
    }
}

function registerPw(){
    if(pwReg.value.length <= 16 && pwReg.value.length >= 8){              
        pwRegTxt.querySelector('.error').innerHTML = "";  
    }else{
        pwReg.value ='';
        pwRegTxt.querySelector('.error').innerHTML = '8~16자내로 입력해주세요';
    }
}

function registerPwConfirm(){
    if(pwConfirm.value === pwReg.value){
        pwList.push(pwReg.value);
        pwConfirmTxt.querySelector('.error').innerHTML = '비밀번호가 일치합니다.';
    }else{
        pwConfirm.value ='';
        pwConfirmTxt.querySelector('.error').innerHTML = '비밀번호가 일치하지 않습니다.';
    }
   
}

emailReg.addEventListener('focusout',registerId);
pwReg.addEventListener('focusout',registerPw);
pwConfirm.addEventListener('focusout',registerPwConfirm);

// 회원가입 정보 저장하기
function saveId(text){
    localStorage.setItem(USER_ID,text);
}
function savePw(text){
    localStorage.setItem(USER_PW,text);
}
function saveThings(){
    if(idList[0] && pwList[0]){
        saveId(idList.pop());
        savePw(pwList.pop());
        backHome();
        alert('회원가입되셨습니다. 로그인해주세요!');
    }else{        
        return false;
    }    
}
register.addEventListener('submit',function(e){
    e.preventDefault();
    saveThings();
});


// 회원가입에서 로그인영역
regBtn.addEventListener('click',function(){
    register.classList.add('on');
    login.classList.add('off');
});

function backHome(){
    emailReg.value ='';
    pwReg.value ='';
    emailRegTxt.querySelector('.error').innerHTML = '';  
    pwRegTxt.querySelector('.error').innerHTML = ""; 
    pwConfirm.value ='';
    pwConfirmTxt.querySelector('.error').innerHTML = "";
    register.classList.remove('on');
    login.classList.remove('off');
}
back.addEventListener('click',backHome);