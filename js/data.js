import { getRandomInteger, createIdGenerator, getRandomArrayElement, createRandomIdFromRangeGenerator } from './util.js';

const ID_PHOTO_COUNT = 25;
const PICTURE_COUNT = 25;
const AVATAR_COUNT = 6;
const LIKES_MIN_COUNT = 15;
const LIKES_MAX_COUNT = 200;

const DESCRIPTIONS = ['Действительно полезняк! А то сколько не лазишь по нету сплошное бла бла бла. Но не тут, и это радует!',
  'Очень просто на словах а в деле, многое несоответсвует, не так всё радужно!', 'Развейте тему дальше. Интересно узнать подробности!!!',
  'Актуальный блог, свежая инфа, почитываю, решил помочь и разослал пост в соц.закладки.надеюсь поднимется популярность.',
  'На каком - то сайте я уже читал почти такую же подборку инфы, но все равно спасибо', 'Интересно, но все же хотелось бы побольше узнать об этом. Понравилось фото!: -)',
  ' Автор продолжай в том же духе', 'Увлекательно! Только не могу понять как часто обновляется блог ?',
  'Ага, теперь ясно… А то я сразу и не понял где тут связь с названием…', 'Спасибо, очень интересное фото.', 'Пост навел на размышления ушел много думать …',
  'Я конечно, мало, что смыслю в посте, но постараюсь осилить.', 'Спасибо, очень интересная заметка.', 'большое спасибо!Взяла себе тоже - пригодится.',
  'Неплохой пост, но много лишнего.', 'Я, вам завидую.Ваш блог намного лучше по содержанию и дизайну чем мой. Кто вам дизайн делал ?'];

const NAMES = ['Василий', 'Петр', 'Сергей', 'Павел', 'Роман', 'Алексей', 'Светлана', 'Лизавета', 'Ева', 'Динара', 'Екатерина'];

const MESSAGE_WORDS = ['Всё отлично!',
  'В целом всё неплохо.Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент ? !'];

const generateCommentId = createIdGenerator();

const generateId = createRandomIdFromRangeGenerator(1, ID_PHOTO_COUNT);

const createMessages = () => Array.from({
  length: getRandomInteger(1, 2)
}, () => getRandomArrayElement(MESSAGE_WORDS)).join(' ');

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: createMessages(),
  name: getRandomArrayElement(NAMES)
});

const getPictures = (index) => ({
  id: generateId(),
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKES_MIN_COUNT, LIKES_MAX_COUNT),
  comments: Array.from({ length: getRandomInteger(1, 7) }, createComment)
});

const createDuplicatesPictures = () => Array.from({ length: PICTURE_COUNT }, (_, index) => getPictures(index + 1));

export { createDuplicatesPictures };
