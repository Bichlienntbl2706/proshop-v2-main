const products = [
  {
    name: 'The Cloudy Essential Oil',
    image: '/images/ct1_product.jpg',
    description:
      'Immerse yourself in the pleasant space of white tea, feel the freshness, along with the orange scent to experience freshness, and finally rosemary takes you to the vast steppes, giving you a feeling of freedom and peace.',
    description_vn:
      'Đắm mình trong không gian dễ chịu của trà trắng, cảm nhận sự tươi mát, cùng với hương cam để trải nghiệm sự tươi mát, và cuối cùng là hương thảo đưa bạn đến thảo nguyên bao la, cho bạn cảm giác tự do, bình yên.',
    brand: 'Flower',
    category: 'Flower',
    price: 49,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: 'First Love Essential Oil',
    image: '/images/ct2_product.jpg',
    description:
      'The sweet, intimate taste of vanilla combined with the scent of jasmine creates a work of fragrant art, blending and attracting every drop.',
    description_vn:
      'Vị ngọt ngào, gần gũi của vani kết hợp với hương hoa nhài tạo nên một tác phẩm nghệ thuật hương thơm, hòa quyện và lôi cuốn từng giọt.',
    brand: 'Flower',
    category: 'Flower',
    price: 69,
    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
  },
  {
    name: 'Fluffy Honey Essential Oil',
    image: '/images/ct3_product.jpg',
    description:
      'The scent of pure and seductive roses transports you to blooming, delicate and beautiful flower gardens. Combined with green apples like a cool spring breeze brings freshness and vitality for a constant source of inspiration, a refreshing and energetic space.',
    description_vn:
      'Hương thơm của hoa hồng thuần khiết và quyến rũ đưa bạn đến những vườn hoa nở rộ, tinh tế và xinh đẹp. Kết hợp với táo xanh như làn gió mát của mùa xuân mang lại sự tươi mát và sức sống cho nguồn cảm hứng liên tục, không gian sảng khoái và tràn đầy năng lượng.',
    brand: 'Flower',
    category: 'Flower',
    price: 79,
    countInStock: 5,
    rating: 3,
    numReviews: 12,
  },
  {
    name: 'Junia Essential Oil',
    image: '/images/ct4_product.jpg',
    description:
      'The scent of white tea, like a cool breeze from green tea gardens, brings a feeling of purity and peace. Jasmine, with its charming beauty and pleasant fragrance, softens the surrounding atmosphere and creates an elegant and luxurious space. The final scent with the fresh and dynamic scent of orange brings refreshment and appeal.',
    description_vn:
      'Hương của trà trắng, như làn gió mát từ những khu vườn trà xanh, mang lại cảm giác thanh khiết và bình yên. Hoa nhài với vẻ đẹp quyến rũ và hương thơm dễ chịu, làm dịu đi không khí xung quanh và tạo nên không gian thanh lịch và sang trọng. Hương cuối với hương thơm tươi mới và năng động của cam đem lại sự sảng khoái và lôi cuốn.',
    brand: 'Glass',
    category: 'Glass',
    price: 69,
    countInStock: 11,
    rating: 5,
    numReviews: 12,
  },
  {
    name: 'Muse Essential Oil',
    image: '/images/ct5_product.jpg',
    description:
      'The top scent of rose, pure and seductive, brings a romantic and fresh feeling like a blooming rose garden. The middle scent of peach with a sweet and enchanting scent, creating gentleness and appeal. The base note is an apple scent with a sweet and sour taste and a fresh scent, bringing freshness and vitality.',
    description_vn:
      'Hương đầu hoa hồng, tinh khôi và quyến rũ, mang đến cảm giác lãng mạn và tươi mới như một vườn hoa hồng nở rộ. Hương giữa hương đào với hương thơm ngọt ngào và mê hoặc, tạo nên sự dịu dàng và hấp dẫn. Hương cuối hương táo với vị chua chua ngọt ngọt và hương thơm tươi mới, đem lại sự tươi mới và sự sống động.',
    brand: 'Flower',
    category: 'Flower',
    price: 79,
    countInStock: 7,
    rating: 3.5,
    numReviews: 10,
  },
  {
    name: 'The Youth Essential Oil',
    image: '/images/ct6_product.jpg',
    description:
      'The top scent of white tea is like a cool breeze. The gentle scent of white tea makes the space gentle and delicate. Middle notes of apple bring freshness, excitement and excitement. The final scent combines the sweet, pleasant scent of lily and jasmine to create an unforgettable fragrance.',
    description_vn:
      'Hương đầu trà trắng như làn gió mát hương thơm nhẹ nhàng của trà trắng làm cho không gian trở nên nhẹ nhàng và tinh tế. Hương giữa của táo mang đến sự tươi mát, hứng khởi và phấn khích. Hương cuối kết hợp giữa hương thơm ngọt ngào, dễ chịu của hoa ly và hoa nhài tạo nên một hương thơm khó có thể quên.',
    brand: 'Glass',
    category: 'Glass',
    price: 69,
    countInStock: 2,
    rating: 4,
    numReviews: 12,
  },
  {
    name: 'Breeze Flavours Essential Oil',
    image: '/images/ct7_product.jpg',
    description:
      'Top notes of grapefruit with a fresh scent, bringing freshness and vitality. The middle scent of lavender, with its sweet and relaxing taste, soothes the surrounding atmosphere. The base note of mint, with its fresh and refreshing scent, brings a feeling of refreshment and mental clarity.',
    description_vn:
      'Hương đầu của bưởi với hương thơm tươi mới, đem lại sự tươi mới và sự sống động. Hương giữa lavender với vị ngọt dịu và thư thái, làm dịu đi không khí xung quanh.Hương cuối bạc hà, với hương thơm tươi mát và sảng khoái, đem lại cảm giác sảng khoái và tinh thần minh mẫn.',
    brand: 'Fruit',
    category: 'Fruit',
    price: 3.2,
    countInStock: 99,
    rating: 5,
    numReviews: 12,
  },
  {
    name: 'Home Vibe Essential Oil',
    image: '/images/ct8_product.jpg',
    description:
      'The top note is grapefruit with a fresh scent, creating a sophisticated and vibrant atmosphere. Middle note is ylang ylang, with a seductive and luxurious scent. The last scent is a combination of lotus and jasmine, with pure beauty and gentle fragrance, creating a peaceful space.',
    description_vn:
      'Hương đầu hương bưởi với hương thơm tươi mới, tạo nên không khí tinh tế và sôi động.Hương giữa ngọc lan tây, với hương thơm quyến rũ và sang trọng. Hương cuối sự kết hợp giữa hương sen và hoa nhài, với vẻ đẹp thuần khiết và hương thơm dịu dàng, tạo nên không gian yên bình.',
    brand: 'Glass',
    category: 'Glass',
    price: 69,
    countInStock: 8,
    rating: 4,
    numReviews: 12,
  },
];

export default products;
