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
    subCatgories: [
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
        name: 'Quần thun thể thao',
        nameEN: 'Sport shorts',
        description: '',
        descriptionEN: '',
      },
      {
        name: 'Quần bóng đá',
        nameEN: 'Soccer shorts',
        description: '',
        descriptionEN: '',
      },
      {
        name: 'Quần jogger',
        nameEN: 'Jogger pants',
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
    subCatgories: [
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
      {
        name: 'Áo bóng đá',
        nameEN: 'Soccer shirt',
        description: '',
        descriptionEN: '',
      },
      {
        name: 'Áo Hoodie',
        nameEN: 'Hoodie',
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
    subCatgories: [
      {
        name: 'Thắt lưng',
        nameEN: 'Belt',
        description: '',
        descriptionEN: '',
      },
      {
        name: 'Kính thời trang',
        nameEN: 'Glasses',
        description: '',
        descriptionEN: '',
      },
      {
        name: 'Nhẫn',
        nameEN: 'Ring',
        description: '',
        descriptionEN: '',
      },
      {
        name: 'Dây chuyền',
        nameEN: 'necklace',
        description: '',
        descriptionEN: '',
      },
      {
        name: 'Trang sức',
        nameEN: 'Another jewelries',
        description: '',
        descriptionEN: '',
      },
      {
        name: 'Đồng hồ',
        nameEN: 'Watch',
        description: '',
        descriptionEN: '',
      },
      {
        name: 'Tất/Vớ',
        nameEN: 'Socks',
        description: '',
        descriptionEN: '',
      },
    ],
  },
  {
    name: 'Giày',
    nameEN: 'Shoes',
    description: '',
    descriptionEN: '',
    subCatgories: [
      {
        name: 'Giày thể thao',
        nameEN: 'Sport Shoes',
        description: '',
        descriptionEN: '',
      },
      {
        name: 'Giày đá bóng',
        nameEN: 'Soccer Shoes',
        description: '',
        descriptionEN: '',
      },
      {
        name: 'Giày boots',
        nameEN: 'Boots',
        description: '',
        descriptionEN: '',
      },
      {
        name: 'Sneaker',
        nameEN: 'Sneaker',
        description: '',
        descriptionEN: '',
      },
      {
        name: 'Giày lười',
        nameEN: 'Lazy shoes',
        description: '',
        descriptionEN: '',
      },
    ],
  },
  {
    name: 'Dép',
    nameEN: 'Sandal',
    description: '',
    descriptionEN: '',
    subCatgories: [
      {
        name: 'Quai hậu',
        nameEN: 'Sandal',
        description: '',
        descriptionEN: '',
      },
      {
        name: 'Crocs',
        nameEN: 'Crocs',
        description: '',
        descriptionEN: '',
      },
      {
        name: 'Dép kẹp',
        nameEN: 'flip flops',
        description: '',
        descriptionEN: '',
      },
    ],
  },
  {
    name: 'Mũ',
    nameEN: 'Hat',
    description: '',
    descriptionEN: '',
    subCatgories: [
      {
        name: 'Mũ lưỡi trai',
        nameEN: 'Cap',
        description: '',
        descriptionEN: '',
      },
      {
        name: 'Mũ Snapback',
        nameEN: 'Snapback',
        description: '',
        descriptionEN: '',
      },
      {
        name: 'Mũ Tennis',
        nameEN: 'Visor Cap',
        description: '',
        descriptionEN: '',
      },
      {
        name: 'Mũ rộng vành',
        nameEN: 'Floppy Hat',
        description: '',
        descriptionEN: '',
      },
      {
        name: 'Mũ nồi',
        nameEN: 'Beret',
        description: '',
        descriptionEN: '',
      },
    ],
  },
  {
    name: 'Túi',
    nameEN: 'Bag',
    description: '',
    descriptionEN: '',
    subCatgories: [
      {
        name: 'Túi thể thao',
        nameEN: 'Sport bag',
        description: '',
        descriptionEN: '',
      },
      {
        name: 'Túi dây rút',
        nameEN: 'Drawstring bag',
        description: '',
        descriptionEN: '',
      },
      {
        name: 'Túi bao tử',
        nameEN: 'Stomach bag',
        description: '',
        descriptionEN: '',
      },
      {
        name: 'Balo',
        nameEN: 'Backpack',
        description: '',
        descriptionEN: '',
      },
      {
        name: 'Túi đeo chéo',
        nameEN: 'Crossbody bag',
        description: '',
        descriptionEN: '',
      },
      {
        name: 'Ví',
        nameEN: 'Wallet',
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
export const SIZES = [
  {
    name: 'M',
    nameEN: 'M',
    description: 'Chiều cao 1m60 - 1m64 / Cân nặng 55 - 60 (KG)',
  },
  {
    name: 'L',
    nameEN: 'L',
    description: 'Chiều cao 1m65 - 1m69 / Cân nặng 61 - 68 (KG)',
  },
  {
    name: 'XL',
    nameEN: 'xL',
    description: 'Chiều cao 1m70 - 1m74 / Cân nặng 69 - 73 (KG)',
  },
  {
    name: '2XL',
    nameEN: '2XL',
    description: 'Chiều cao 1m75 - 1m80 / Cân nặng 74 - 78 (KG)',
  },
  {
    name: '3XL',
    nameEN: '3XL',
    description: 'Chiều cao 1m65 - 1m85 / Cân nặng 79 - 82 (KG)',
  },
  {
    name: '4XL',
    nameEN: '4XL',
    description: 'Chiều cao 1m65 - 1m85 / Cân nặng 80 - 90 (KG)',
  },
];
export const MATERIALS = [
  {
    name: 'Jeans (Bò)',
    nameEN: 'Jeans',
    description:
      'Vải jeans còn được biết đến với cái tên là vải bò, được sản xuất từ chất liệu cotton Duck và bông thô, mang đến sự trẻ trung và năng động. Loại vải này được dệt từ 2 sợi xanh chàm (1 sợi có chất liệu là Cotton Duck và sợi còn lại là bông thô), có màu xanh đặc trưng.',
    imageName: 'M01-jeans.jpg',
  },
  {
    name: 'Kaki',
    nameEN: 'Khaki',
    description:
      'Vải kaki hay còn được gọi với tên tiếng anh là Khaki. Đây là chất liệu vải được ưa chuộng và sử dụng rộng rãi trong ngành may mặc. Vải kaki có thể được dệt từ cotton 100% hoặc sợi cotton đan chéo với sợi tổng hợp. Vải có tính chất nổi bật là bền, mát, không nhăn, co giãn tốt. Loại vải này có mình vải khá cứng và dày.',
    imageName: 'M02-kaki.jpg',
  },
  {
    name: 'Cotton',
    nameEN: 'Cotton',
    description:
      'Vải cotton là loại vải thường được sử dụng nhiều nhất trong may mặc. Được dệt từ các sợi tự nhiên được tạo ra từ cây bông vải kết hợp với thành phần hóa học khác đã giúp vải cotton nhẹ hơn, có độ bền và co giãn cao, cũng như thấm hút mồ hôi tốt. Chính vì những đặc điểm này, mà cotton rất được ưa chuộng để may áo thun hay bộ quần áo cần tính thoải mái, thấm hút nhanh khi cần vận động.',
    imageName: 'M03-cotton.jpg',
  },
  {
    name: 'Kate',
    nameEN: 'Kate',
    description:
      'Vải kate là vải sợi tổng hợp được pha giữa cotton và polyester. Vải vừa có sự mềm mịn, thoáng mát của cotton cùng độ bền, ít nhăn và không bị phai màu của polyester, nên được thị trường rất ưa chuộng và thường được sử dụng để sản xuất đồng phục học sinh, áo công sở hay chăn ga gối nệm.',
    imageName: 'M04-kate.jpg',
  },
  {
    name: 'Vải nỉ (flet)',
    nameEN: 'flet',
    description:
      'Vải nỉ là sự kết hợp hoàn hảo giữa sợi vải thông thường và sợi len. Bề mặt vải tạo nên cảm giác mềm mịn với một lớp lông mỏng bao phủ bên ngoài.Vải nỉ có độ bền cao, không bị bạc màu, không nhàu và có khả năng giữ ấm tốt, tạo nhiệt cho cơ thể nên rất được ưa chuộng để sử dụng cho các sản phẩm mùa đông.',
    imageName: 'M05-flet.jpg',
  },
  {
    name: 'Vải len',
    nameEN: 'Woolen',
    description:
      'Vải len là loại vải được dệt từ sợi và sản xuất chủ yếu từ lông động vật như lông cừu, dê hay thỏ,… Đặc trưng của vải len là co giãn, đàn hồi hồi lớn, tạo cảm giác mềm mại, thoải mái, không gây khó chịu khi mặc và có khả năng giữ nhiệt rất tốt nên những chiếc áo len là item không thể thiếu vào mùa đông hay khi trời trở lạnh.',
    imageName: 'M06-woolen.jpg',
  },
  {
    name: 'Vải thô (canvas)',
    nameEN: 'Canvas',
    description:
      'Vải thô hay còn gọi là vải bạt, được dệt từ những nguyên liệu tự nhiên như bông và gai, có khả năng co giãn bốn chiều rất tốt.Đặc điểm nổi bật của loại vải này là có bề mặt phẳng mịn, mộc mạc và thoáng mát cùng khả năng thấm hút mồ hôi tốt. Bởi thế mà trên thị trường, các sản phẩm từ vải thô rất được ưa chuộng, nhất là giới trẻ và các chị em phụ nữ.',
    imageName: 'M07-canvas.jpg',
  },
  {
    name: 'Vải voan (chiffon)',
    nameEN: 'Chiffon',
    description:
      'Vải voan hay còn gọi là vải chiffon là một trong những loại vải phổ biến rất được phái nữ ưa chuộng. Mặc dù được tạo nên từ sợi tổng hợp nhân tạo nhưng vải voan lại mang đến cảm nhận hoàn toàn khác: mềm mịn, mỏng nhẹ và cực kỳ bay bổng. Với ưu điểm ấy mà vải voan thường được các nhà thiết kế sử dụng để tạo nên những mẫu váy bồng bềnh, thướt tha. Các mẫu thiết kế từ vải voan cũng tạo cảm giác mềm mại, toát lên vẻ đẹp dịu dàng của người mặc.',
    imageName: 'M08-chiffon.jpg',
  },
  {
    name: 'Vải lanh (linen)',
    nameEN: 'Linen',
    description:
      'Giống với tên gọi của nó, vải lanh hay linen được dệt nên bởi những sợi nhỏ từ thân cây lanh. Quy trình tạo nên vải lanh là hoàn toàn thủ công, các sợi vải được dệt rất chặt tay và khá to.Những sản phẩm chủ đạo từ vải lanh là đồ mặc thường ngày ở nhà của các chị em phụ nữ bởi chúng có độ bóng tự nhiên cao, có tính bền khi chịu được co giản, ít bị mài mòn cũng như mang lại sự thoải mái, nhẹ nhàng khi mặc. Tuy nhiên, điểm trừ cho vải lanh là dễ bị nhăn, có nếp gấp khi giặt máy và dễ bị hư hỏng bởi nấm mốc, mồ hôi hay chất tẩy.',
    imageName: 'M09-linen.jpg',
  },
  {
    name: 'Vải đũi (tussar hoặc tussah)',
    nameEN: 'Tussah',
    description:
      'Nếu bạn là người thích sự giản dị, theo đuổi phong cách nhẹ nhàng thì các sản phẩm từ vải đũi là một lựa chọn hợp lý. Là loại vải xốp, nhẹ và thoáng mát, vải đũi mang lại cho người mặc cảm giác bình dị, mộc mạc nhưng vẫn toát lên cá tính, nét đẹp riêng. Được sản xuất hoàn toàn tự nhiên nên chất liệu vải đũi có tác dụng làm mát hiệu quả, phù hợp trong thời tiết nóng nực của mùa hè. Một điểm trừ là vải đũi dễ bị nhăn và tạo nếp gấp khi sử dụng.',
    imageName: 'M10-tussar.jpg',
  },
  {
    name: 'Vải lụa (silk)',
    nameEN: 'Silk',
    description:
      'Vải lụa – được đánh giá là một trong những loại vải cao cấp nhất, sang trọng nhất thời xưa. Chúng thường được sử dụng trong những thiết kế sang trọng, lịch sự của tầng lớp quý tộc, có địa vị xã hội. Ngày nay thì nét đẹp của nó vẫn vẹn nguyên như vậy: mềm mại, nhẹ nhàng tựa như vẻ đẹp người phụ nữ sang trọng mà quý phái. Chất liệu chính của vải lụa được dệt từ các loại tơ và đặc biệt là tơ tằm nên rất thoải mái khi mặc.',
    imageName: 'M11-silk.jpg',
  },
  {
    name: 'Vải ren (lace)',
    nameEN: 'Lace',
    description:
      'Vải ren hay còn gọi là vải Lace, là một loại vải đặc biệt được tạo nên bằng cách bện, xoắn, lặp để tạo nên một tấm vải có lỗ hở và khoảng trống không khít như những loại vải thông thường. Vải ren rất dễ để nhận diện khi có kết cấu thưa và nhiều lổ hổng khác nhau.',
    imageName: 'M12-lace.jpg',
  },
  {
    name: 'Vải ni lông (nylon)',
    nameEN: 'Nylon',
    description:
      'Vải nylon loại vải thuộc nhóm Polyamide được chế tạo từ các loại hóa chất, nó cũng được dệt từ các sợi tổng hợp mà nên..  Chất liệu của vải ni lông không được đánh giá cao bởi chúng không thể phân hủy trong môi trường.',
    imageName: 'M13-nylon.jpg',
  },
  {
    name: 'Vải tuyết mưa',
    nameEN: 'VPNS',
    description:
      'Vải tuyết mưa được dệt nên từ nhiều loại sợi khác nhau như Viscose, Polyester Nylon và sợi Spandex.Vải vô cùng chắc chắn, có độ co giãn phù hợp, không quá dày và quá mỏng, thấm hút mồ hôi tốt và tạo được sự thoáng mát cho người đọc. Độ bền của vải cũng được đánh giá cao, ít bị nhăn hay bám bụi khi mặc.',
    imageName: 'M14-vpns.jpg',
  },
  {
    name: 'Vải tuyết mưa',
    nameEN: 'VPNS',
    description:
      'Vải tuyết mưa được dệt nên từ nhiều loại sợi khác nhau như Viscose, Polyester Nylon và sợi Spandex.Vải vô cùng chắc chắn, có độ co giãn phù hợp, không quá dày và quá mỏng, thấm hút mồ hôi tốt và tạo được sự thoáng mát cho người đọc. Độ bền của vải cũng được đánh giá cao, ít bị nhăn hay bám bụi khi mặc.',
    imageName: 'M14-vpns.jpg',
  },
  {
    name: 'Vải visco (viscose hoặc rayon)',
    nameEN: 'Viscose / Rayon',
    description:
      'Vải visco hay viscose hay rayon được làm từ sợi Xenlulose ở trong các loại cây như tre, đậu nành hoặc mía.Vải này có ưu điểm là khả năng kháng khuẩn tốt, an toàn cho cơ thể và da người khỏi vi khuẩn. Đồng thời, vải mềm, không tích điện, và rất dễ nhuộm màu nên trên thị trường hiện nay có đa dạng loại mẫu mã và màu sắc của các thiết kế vải visco. Vải có giá thành thấp nên thường được sử dụng thay thế lụa, may chăn ga gối nệm.',
    imageName: 'M16-viscose.jpg',
  },
  {
    name: 'Vải spandex (elastan hoặc lycra)',
    nameEN: 'Spandex / Elastan / Lycra',
    description:
      'Vải spandex là một kiểu vải dệt từ sợi tổng hợp được tạo thành từ Polyme nhờ vào quá trình kéo khô. Vải có độ đàn hồi cao và khả năng kéo dãn rất tốt. Thường được kết hợp với sợi Cotton để tạo nên vải thun có độ có giãn lớn, mỏng nhẹ và mang đến sự thoáng mát cho người mặc. Những sản phẩm từ vải spandex cũng được đánh giá tích cực cùng tính thẩm mỹ cao.',
    imageName: 'M17-spandex.jpg',
  },
  {
    name: 'Vải modal',
    nameEN: 'Modal',
    description:
      'Được xem là một loại vải khá đặc biệt, vải modal có nguồn gốc từ gỗ của cây sồi, chúng được tạo ra nhờ quá trình kết tinh Cellulose của cây sồi.Vải có độ bền màu cao, không bị co rút hay biến dạng khi sử dụng, cũng như có khả năng thoáng khí và hút ẩm tốt nên thường mang đến cảm giác thoải mái, dễ chịu cho người mặc. Vì có xuất xứ hoàn toàn tự nhiên nên vải modal rất hiếm trên thị trường thời trang cùng với giá thành cao hơn tất cả các loại vải khác. Chính bởi số lượng vải modal hạn chế mà các sản phẩm từ vải modal cũng trở nên khan hiếm.',
    imageName: 'M18-modal.jpg',
  },
  {
    name: 'Vải tencel (lyocell)',
    nameEN: 'Tencel / Lyocell',
    description:
      'Vải tencel hay lyocell được biết đến là một loại vải sinh học, quy trình sản xuất phức tạp. Để tạo nên vải tencel cần phải lấy chiết xuất từ những cây gỗ ngoài thiên nhiên có lượng cellulose thuộc họ nhà tre như như cây gỗ bạch đàn. Với những đặc điểm từ thiên nhiên nên vải tencel mang đến sự an toàn cho sức khỏe, không gây ô nhiễm môi trường, thấm hút mồ hội tốt và không bị nhăn khi giặt máy. Vải tencel cũng nằm trong số các loại vải phổ biến có mức giá cao trên thị trường bởi nguồn gốc tự nhiên của nó.',
    imageName: 'M19-tencel.jpg',
  },
  {
    name: 'Vải bamboo',
    nameEN: 'Bamboo',
    description:
      'Nghe đến tên gọi thì chắc hẳn ai cũng biết được rằng vải bamboo được tạo nên từ xơ của cây tre kết hợp một số chất liệu khác để tạo nên loại vải bamboo bền đẹp hơn. Vải bamboo được sử dụng chủ yếu trong thiết kế quần áo, đầm váy hay đồ của trẻ em bởi khả năng thấm hút cao, có khả năng kháng khuẩn, khử mùi và có thể chống lại tia UV bảo vệ sức khỏe. Và giá vải bamboo cũng khá cao nên ta thường thấy vải bamboo được ứng dụng cho thời trang trung cấp.Vải có độ bền cao nhưng có thể bị co lại sau khi giặt và vải cũng lâu khô hơn.',
    imageName: 'M20-bamboo.jpg',
  },
  {
    name: 'Vải hoa văn (jacquard)',
    nameEN: 'Jacquard',
    description:
      'Là một người có gu thời trang ấn tượng thì bạn sẽ không thể bỏ qua những thiết kế của vải hoa văn. Để tạo nên vải jacquard thì trải qua quá trình thủ công từ dệt, thêu trực tiếp hoa văn và hoạ tiết lên các tấm vải thành phẩm. Vì thế mà các sản phẩm sử dụng vải hoa văn đều rất nổi bật, ấn tượng cùng màu sắc và kiểu dáng đa dạng càng làm tăng vẻ đẹp của người mặc.',
    imageName: 'M20-bamboo.jpg',
  },
  {
    name: 'Vải hoa văn (jacquard)',
    nameEN: 'Jacquard',
    description:
      'Là một người có gu thời trang ấn tượng thì bạn sẽ không thể bỏ qua những thiết kế của vải hoa văn. Để tạo nên vải jacquard thì trải qua quá trình thủ công từ dệt, thêu trực tiếp hoa văn và hoạ tiết lên các tấm vải thành phẩm. Vì thế mà các sản phẩm sử dụng vải hoa văn đều rất nổi bật, ấn tượng cùng màu sắc và kiểu dáng đa dạng càng làm tăng vẻ đẹp của người mặc.',
    imageName: 'M20-bamboo.jpg',
  },
  {
    name: 'Vải denim',
    nameEN: 'Denim',
    description:
      'Vải denim bắt nguồn từ nước Pháp trong những năm cuối thế kỷ 18. Chúng được tạo nên từ quy trình dài khi được dệt từ chất liệu bông cứng với những sợi đan chéo lại với nhau. Hiện nay vải denim còn kết hợp với các sợi polyester hoặc lycra để tạo nên những chất liệu vải tốt hơn, chống nhăn hiệu quả hơn. Những sản phẩm từ vải denim phần lớn là quần nên chúng có độ bền cao, thể hiện cá tính và phong cách khác lạ của người mặc.',
    imageName: 'M22-denim.jpg',
  },
  {
    name: 'Vải giả da simili',
    nameEN: 'Simili',
    description:
      'Có nguồn gốc từ nước Đức trong chiến tranh thế giới, vải giả da simili được cấu tạo từ các lớp lót làm dệt từ sợi polyester và lớp nhựa PVC. Có hình dạng giống như lớp da thật, vải giả da simili có khả năng chống nước cực tốt, độ bền của áo cũng cao khi thời gian sử dụng có thể kéo dài mấy năm. Trong thời trang thì các thiết kế từ vải giả da simili mang tính thẩm mỹ rất cao, sang trọng và lịch sự. Loại phải này còn phù hợp với nhiều đối tượng ở các độ tuổi khác nhau.',
    imageName: 'M23-simili.jpg',
  },
];
