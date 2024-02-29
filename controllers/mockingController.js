exports.getMockingProducts = (req, res) => {
    const mockedProducts = generateMockedProducts();
    res.json(mockedProducts);
  };
  
  function generateMockedProducts() {

    return Array.from({ length: 100 }, (_, index) => ({
      _id: `mockedProductId${index + 1}`,
      name: `Mocked Product ${index + 1}`,
      price: Math.random() * 100,
      stock: Math.floor(Math.random() * 100),
    }));
  }  