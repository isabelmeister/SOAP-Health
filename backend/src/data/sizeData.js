const sizes = [
  { id: 'sm', name: 'Small', basePrice: 8 },
  { id: 'md', name: 'Medium', basePrice: 10 },
  { id: 'lg', name: 'Large', basePrice: 12 },
  { id: 'xlg', name: 'Extra Large', basePrice: 14 },
];

const findSizeById = (sizeId) => sizes.find(s => s.id === sizeId);
const getAllSizes = () => [...sizes];

module.exports = {
  sizes,
  findSizeById,
  getAllSizes
};