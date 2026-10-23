// vehicles.js - Data source array for SamKen Motors available inventory
const vehicles = [
  {
    id: "toyota-hilux-28-gd6",
    title: "Toyota Hilux 2.8 GD-6 Legend Double Cab",
    price: 950000,
    currency: "K",
    fuel: "Diesel",
    color: "White",
    status: "Available",
    location: "Sourced to Order",
    imagesCount: 7,
    features: [
      "2.8 GD-6 diesel, Legend double cab",
      "White exterior paint work",
      "Chrome nudge bar and roll bar",
      "Soft tonneau cover",
      "Heavy-duty tow bar",
      "Side steps and functional bonnet guard",
      "Integrated parking sensors",
      "All-terrain tyres"
    ],
    whatsappLink: "https://wa.me/260977882762?text=Hi,%20I'm%20interested%20in%20the%20Toyota%20Hilux%202.8%20GD-6%20Legend"
  },
  {
    id: "honda-fit-automatic",
    title: "Honda Fit (Automatic)",
    price: 120000,
    basePriceWithoutAndroid: 110000,
    currency: "K",
    fuel: "Petrol",
    color: "Bright Red",
    status: "In Stock",
    location: "Lusaka",
    imagesCount: 7,
    features: [
      "Automatic transmission",
      "Bright red, clean body finish",
      "Android-powered touchscreen music system (maps, Bluetooth, and phone apps)",
      "Reverse camera for easy, stress-free parking",
      "Comfortable leather-style seats",
      "Good fuel economy and low running costs",
      "Viewing available: come and see it, test it, and drive it"
    ],
    whatsappLink: "https://wa.me/260977882762?text=Hi,%20I'm%20interested%20in%20the%20Red%20Honda%20Fit%20in%20Lusaka"
  },
  {
    id: "volvo-fl-dropside",
    title: "Volvo FL Dropside Truck (Available to Order)",
    price: "Price on request",
    currency: "",
    fuel: "Diesel",
    color: "White",
    status: "Available to Order",
    location: "South Africa",
    imagesCount: 2,
    features: [
      "Volvo FL series rigid truck chassis",
      "Dropside body configuration with steel headboard and mesh guard",
      "Manual gearbox system",
      "Heavy-duty front bull bar",
      "315/80R22.5 sizing tyres, spare wheel included",
      "Large-capacity diesel tank",
      "Clean cab interior with comfortable seats, heater/fan, and good dashboard status",
      "South African registered, exceptionally well kept",
      "Ideal for transport business, building materials, farm produce, general cargo, and deliveries"
    ],
    whatsappLink: "https://wa.me/260977882762?text=Hi,%20I%20want%20a%20written%20quote%20for%20the%20Volvo%20FL%20Dropside%20Truck"
  },
  {
    id: "tandem-axle-dropside",
    title: "Tandem-Axle Dropside Truck 6x4 (Available to Order)",
    price: "Price on request",
    currency: "",
    fuel: "Diesel",
    color: "White",
    status: "Available to Order",
    location: "South Africa",
    imagesCount: 2,
    features: [
      "Tandem rear axle (6x4 configuration) for extra high load capacity",
      "Long dropside body framework equipped with high cargo rails",
      "Freshly painted, clean white bodywork finish",
      "Reflective safety compliance strips and rear chevron board",
      "Rear underrun safety bumper and fitted mudflaps",
      "Good, reliable tyres all around the vehicle",
      "South African registered, well kept structural condition",
      "Built for heavy loads: building materials, cement, farm produce, general cargo, and long-distance transport"
    ],
    whatsappLink: "https://wa.me/260977882762?text=Hi,%20I%20want%20a%20written%20quote%20for%20the%20Tandem-Axle%20Dropside%206x4%20Truck"
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = vehicles;
}
