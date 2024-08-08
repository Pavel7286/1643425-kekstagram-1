import { renderBigPicture } from './big-picture.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

const renderPictures = (pictures) => {
  const createPhotoFragment = document.createDocumentFragment();

  pictures.forEach(({ url, likes, comments, id }) => {

    const pictureElements = pictureTemplate.cloneNode(true);
    pictureElements.querySelector('.picture__img').src = url;
    pictureElements.querySelector('.picture__likes').textContent = likes;
    pictureElements.querySelector('.picture__comments').textContent = comments.length;
    pictureElements.dataset.pictureId = id;
    createPhotoFragment.appendChild(pictureElements);
  });

  container.appendChild(createPhotoFragment);
};

const onPictureClick = (evt, pictures) => {
  const availabilityPhoto = evt.target.closest('[data-picture-id]');

  if (!availabilityPhoto) {
    return;
  }

  const photos = pictures.find((item) => item.id === +availabilityPhoto.dataset.pictureId);
  renderBigPicture(photos);
};

const renderGallery = (pictures) => {
  renderPictures(pictures);
  container.addEventListener('click', (evt) => onPictureClick(evt, pictures));
};

export { renderGallery };
