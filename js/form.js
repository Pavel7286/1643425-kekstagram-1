import { showAlert, isEscapeKey } from './util.js';
import { resetScale } from './scale.js';
import { sendData } from './api.js';
import { resetEffect } from './effects.js';

const form = document.querySelector('.img-upload__form');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const uploadCancel = document.querySelector('#upload-cancel');
const textHashtags = form.querySelector('.text__hashtags');
const textDescription = form.querySelector('.text__description');


const QUANTITY_HASHTAG = 5;
const HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;

const resetInput = () => {
  textHashtags.value = '';
  textDescription.value = '';
  imgUploadInput.value = '';
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'img-upload__error'
});

const checkValidityMessages = (field) => {

  const hashtags = field.trim().split(/\s/);
  if (hashtags.length > QUANTITY_HASHTAG) {
    return false;
  }
  if (hashtags.some((element) => !element.match(HASHTAG))) {
    return false;
  }
  if (hashtags.length > new Set(hashtags).size) {
    return false;
  }

  return true;
};

const closeUserModal = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  resetScale();
  resetInput();
};

const openUserModal = () => {
  resetEffect();
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);

};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && textHashtags !== document.activeElement && textDescription !== document.activeElement) {
    evt.preventDefault();
    closeUserModal();
  }
}

const initPictureForm = () => {
  pristine.addValidator(textHashtags,
    checkValidityMessages,
    'Хештег начинается со знака #, разделяются пробелами, не повторяются, максимальное количество хештегов - 5'
  );

  uploadCancel.addEventListener('click', () => {
    closeUserModal();
  });

  imgUploadInput.addEventListener('change', (evt) => {
    evt.preventDefault();
    openUserModal();
  });
};

const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .catch((err) => {
          showAlert(err.message);
        });
    }
  });
};

export { initPictureForm, setUserFormSubmit, closeUserModal };
