import { config } from 'dotenv';
config();

export const NODE_ENV = process.env.NODE_ENV;

export const CATEGORIES = [
  {
    name: 'Quần',
    nameEN: 'Pants',
    description:
      'Quần là loại trang phục mặc từ eo đến mắt cá chân hoặc che đến đầu gối, cao hoặc thấp hơn đầu gối tùy loại, che phủ từng chân riêng biệt (khác với váy hoặc đầm).',
    descriptionEN:
      'a piece of clothing that covers the lower part of the body from the waist to the feet, consisting of two cylinder-shaped parts, one for each leg, that are joined at the top',
    subCatgory: [
      {
        name: 'Quần Jeans',
        nameEN: 'Jeans',
        description: '',
        descriptionEN: '',
      },
      {
        name: 'Quần shorts',
        nameEN: 'Shorts',
        description: '',
        descriptionEN: '',
      },
      {
        name: 'Quần ống xuông',
        nameEN: 'Trousers',
        description: '',
        descriptionEN: '',
      },
      {
        name: 'Quần thun',
        nameEN: 'Sport pants',
        description: '',
        descriptionEN: '',
      },
    ],
  },
  {
    name: 'Áo',
    nameEN: 'Shirt',
    description: '',
    descriptionEN: '',
    subCatgory: [
      {
        name: 'Áo khoác',
        nameEN: 'Jacket',
        description: '',
        descriptionEN: '',
      },
      {
        name: 'Áo T-shirt',
        nameEN: 'T-shirt',
        description: '',
        descriptionEN: '',
      },
      {
        name: 'Áo tank top',
        nameEN: 'Tank top',
        description: '',
        descriptionEN: '',
      },
      {
        name: 'Áo dài tay',
        nameEN: 'Sport pants',
        description: '',
        descriptionEN: '',
      },
      {
        name: 'Áo blazer',
        nameEN: 'Blazer',
        description: '',
        descriptionEN: '',
      },
      {
        name: 'Áo khoác mùa đông',
        nameEN: 'Coats',
        description: '',
        descriptionEN: '',
      },
    ],
  },
  {
    name: 'Phụ kiện',
    nameEN: 'Accessories',
    description: '',
    descriptionEN: '',
    subCatgory: [
      {
        name: 'Áo khoác',
        nameEN: 'Jacket',
        description: '',
        descriptionEN: '',
      },
      {
        name: 'Áo T-shirt',
        nameEN: 'T-shirt',
        description: '',
        descriptionEN: '',
      },
      {
        name: 'Áo tank top',
        nameEN: 'Tank top',
        description: '',
        descriptionEN: '',
      },
      {
        name: 'Áo dài tay',
        nameEN: 'Sport pants',
        description: '',
        descriptionEN: '',
      },
      {
        name: 'Áo blazer',
        nameEN: 'Blazer',
        description: '',
        descriptionEN: '',
      },
      {
        name: 'Áo khoác mùa đông',
        nameEN: 'Coats',
        description: '',
        descriptionEN: '',
      },
    ],
  },
];

export const COLORS = [
  {
    name: 'Đỏ',
    nameEN: 'Red',
    description: '',
    imageName: 'C01-red.jpg',
  },
  {
    name: 'Đen',
    nameEN: 'Black',
    description: '',
    imageName: 'C02-black.jpg',
  },
  {
    name: 'Xanh dương',
    nameEN: 'Blue',
    description: '',
    imageName: 'C03-blue.jpg',
  },
  {
    name: 'Xanh lá',
    nameEN: 'Green',
    description: '',
    imageName: 'C04-green.jpg',
  },
  {
    name: 'Vàng',
    nameEN: 'Yellow',
    description: '',
    imageName: 'C05-yellow.jpg',
  },
  {
    name: 'Tím',
    nameEN: 'Purple',
    description: '',
    imageName: 'C06-purple.jpg',
  },
  {
    name: 'Xám',
    nameEN: 'Gray',
    description: '',
    imageName: 'C07-gray.jpg',
  },
  {
    name: 'Trắng',
    nameEN: 'White',
    description: '',
    imageName: 'C08-white.jpg',
  },
  {
    name: 'Cam',
    nameEN: 'Orange',
    description: '',
    imageName: 'C09-orange.jpg',
  },
  {
    name: 'Nâu',
    nameEN: 'Brown',
    description: '',
    imageName: 'C10-brown.jpg',
  },
  {
    name: 'Hồng',
    nameEN: 'Pink',
    description: '',
    imageName: 'C11-pink.jpg',
  },
  {
    name: 'Trong suốt',
    nameEN: 'Transparent',
    description: '',
    imageName: 'C12-transparent.jpg',
  },
];
