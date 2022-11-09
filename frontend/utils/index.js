import Toast from "../components/Toast/Toast.js";

export function qs(selector) {
  return document.querySelector(selector);
}

export function qsAll(selector) {
  return Array.from(document.querySelectorAll(selector));
}

export function isClassContained(dom, selector) {
  return dom.classList.contains(selector);
}

export function createDom(tagName, attr = {}, children = []) {
  const dom = document.createElement(tagName);

  for (let [key, value] of Object.entries(attr)) {
    dom[key] = value;
  }
  children.forEach(child => dom.append(child));

  return dom;
}

export const MODAL = {
  Form(attr, children) {
    return createDom("form", attr, children);
  },
  Input(attr) {
    return createDom("input", attr);
  },
  Span(attr, children) {
    return createDom("span", attr, children);
  },

  Div(attr, children) {
    return createDom("div", attr, children);
  },
  Button(attr, children) {
    return createDom("button", attr, children);
  }
};

export function editForm(elementList) {
  return MODAL.Form(
    {},
    elementList.map(({ className, title, attr = {} }) =>
      MODAL.Div({ classname: className }, [
        MODAL.Span({}, [title]),
        MODAL.Input({ ...attr })
      ])
    )
  );
}

export function emailValidation(email) {
  const RegExp =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  if (!email) {
    new Toast("이메일 주소를 입력해주세요.");
    return false;
  }
  if (!RegExp.test(email)) {
    new Toast("올바른 이메일 형식이 아닙니다.");
    return false;
  }

  return true;
}

export function passwordValidation(password, passwordConfirm) {
  const RegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;

  if (!password) {
    new Toast("비밀번호를 입력해주세요.");
    return false;
  }
  if (!RegExp.test(password)) {
    new Toast("비밀번호는 8~16자의 영문자+숫자+특수문자로 입력해주세요.");
    return false;
  }

  return true;
}

export function passwordConfirmValidation(password, passwordConfirm) {
  if (!passwordConfirm) {
    new Toast("비밀번호 확인을 입력해주세요.");
    return false;
  }
  if (password !== passwordConfirm) {
    new Toast("비밀번호가 일치하지 않습니다.");
    return false;
  }

  return true;
}

export function nameValidation(name) {
  const RegExp = /^[가-힣]{2,15}$/;

  if (!name) {
    new Toast("성함를 입력해주세요.");
    return false;
  }
  if (!RegExp.test(name)) {
    new Toast("올바른 성함을 입력해주세요.");
    return false;
  }

  return true;
}

export function phoneValidation(phone) {
  const RegExp = /^010[1-9][0-9]{3}[0-9]{4}$/;

  if (!phone) {
    new Toast("휴대전화 번호를 입력해주세요.");
    return false;
  }
  if (!RegExp.test(phone)) {
    new Toast("올바른 휴대전화 번호를 입력해주세요.");
    return false;
  }

  return true;
}

export function detailAddressValidation(detailAddress) {
  if (!detailAddress) {
    new Toast("상세주소를 입력해주세요.");
    return false;
  }

  return true;
}
