import { isEscapeKey } from './util.js';
const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const body = document.querySelector('body');
const commentsLoader = document.querySelector('.comments-loader');
const socialCommentCount = document.querySelector('.social__comment-count');
const socialComment = document.querySelector('.social__comment');
const socialCommentsContainer = document.querySelector('.social__comments');

const MAX_COMMENTS = 5;
let commentsShown = 0;

const renderComments = (comments) => {
  const createCommentFragment = document.createDocumentFragment();

  comments.forEach(({ avatar, name, message }) => {

    const commentElements = socialComment.cloneNode(true);
    commentElements.querySelector('.social__picture').src = avatar;
    commentElements.querySelector('.social__picture').alt = name;
    commentElements.querySelector('.social__text').textContent = message;

    createCommentFragment.appendChild(commentElements);
  });

  socialCommentsContainer.appendChild(createCommentFragment);
};

const renderBigPhoto = (data) => {
  document.querySelector('.big-picture__img').querySelector('img').src = data.url;
  document.querySelector('.likes-count').textContent = data.likes;
  document.querySelector('.comments-count').textContent = data.comments.length;
  document.querySelector('.social__caption').textContent = data.description;
  socialCommentsContainer.innerHTML = ' ';
  renderComments(data.comments);
};

const openUserModal = () => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const createComments = (data) => {
  commentsShown += MAX_COMMENTS;
  if (commentsShown >= data.comments.length) {
    commentsLoader.classList.add('hidden');
    commentsShown = data.comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }
  debugger;
  const fragmentComments = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const commentElement = renderComments(Object.entries(data.comments[i]));
    fragmentComments.append(commentElement);
  }
  socialCommentsContainer.innerHTML = '';
  socialCommentsContainer.append(fragmentComments);
};

const renderBigPicture = (data) => {

  openUserModal();
  createComments(data);
  renderBigPhoto(data);
};


//закрытие модалки
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

const closeUserModal = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

bigPictureCancel.addEventListener('click', () => {
  closeUserModal();
});
export { renderBigPicture };


