const { PrismaClient } = require("../src/generated/prisma");
const { createHash } = require("crypto");

const prisma = new PrismaClient();

async function main() {
  // ========== 1. Create Admin User ==========
  const adminEmail = "admin@odaygallery.com";
  const adminPassword = "admin123";

  let admin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!admin) {
    const hashedPassword = createHash("sha256")
      .update(adminPassword)
      .digest("hex");

    admin = await prisma.user.create({
      data: {
        name: "Admin Oday",
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
      },
    });
    console.log(`✅ Admin user created: ${adminEmail} / ${adminPassword}`);
  } else {
    console.log(`ℹ️  Admin user already exists: ${adminEmail}`);
  }

  // ========== 2. Create Regular Users ==========
  const usersData = [
    { name: "Budi Santoso", email: "budi@email.com", password: "user123" },
    { name: "Siti Rahmawati", email: "siti@email.com", password: "user123" },
    { name: "Ahmad Rifai", email: "ahmad@email.com", password: "user123" },
    { name: "Dewi Lestari", email: "dewi@email.com", password: "user123" },
    { name: "Rudi Hartono", email: "rudi@email.com", password: "user123" },
  ];

  const createdUsers = [];
  for (const userData of usersData) {
    let user = await prisma.user.findUnique({
      where: { email: userData.email },
    });
    if (!user) {
      const hashedPassword = createHash("sha256")
        .update(userData.password)
        .digest("hex");
      user = await prisma.user.create({
        data: {
          name: userData.name,
          email: userData.email,
          password: hashedPassword,
          role: "user",
        },
      });
      console.log(`✅ User created: ${userData.email}`);
    } else {
      console.log(`ℹ️  User already exists: ${userData.email}`);
    }
    createdUsers.push(user);
  }

  // ========== 3. Create Products ==========
  const productsData = [
    {
      name: "Guppy Albino Full Red (AFR)",
      material: "Pure Strain",
      category: "Live Fish",
      scale: "Size M",
      badge: "Premium",
      price: 75000,
      stock: 25,
      year: 2026,
      colorPattern: "Red Albino",
      imageUrl: "/products/guppy-afr.jpg",
    },
    {
      name: "Neon Tetra Premium Blue",
      material: "Standard",
      category: "Live Fish",
      scale: "Size S",
      badge: null,
      price: 7000,
      stock: 100,
      year: 2026,
      colorPattern: "Blue Neon",
      imageUrl: "/products/neon-tetra.jpg",
    },
    {
      name: "Wild Betta Mahachaiensis",
      material: "Top Grade",
      category: "Live Fish",
      scale: "Size L",
      badge: "Limited",
      price: 450000,
      stock: 5,
      year: 2026,
      colorPattern: "Wild Green",
      imageUrl: "/products/betta-mahachai.jpg",
    },
    {
      name: "Anubias Nana Petit",
      material: "Potted",
      category: "Aquascape Plant",
      scale: "Size M",
      badge: null,
      price: 35000,
      stock: 30,
      year: 2026,
      colorPattern: "Green",
      imageUrl: "/products/anubias-nana.jpg",
    },
    {
      name: "Discus Heckel Red",
      material: "Premium Grade",
      category: "Live Fish",
      scale: "Size XL",
      badge: "Premium",
      price: 850000,
      stock: 3,
      year: 2026,
      colorPattern: "Red Spotted",
      imageUrl: "/products/discus-heckel.jpg",
    },
    {
      name: "Java Moss Mat",
      material: "Tissue Culture",
      category: "Aquascape Plant",
      scale: "30x30cm",
      badge: null,
      price: 45000,
      stock: 20,
      year: 2026,
      colorPattern: "Dark Green",
      imageUrl: "/products/java-moss.jpg",
    },
    {
      name: "Channa Auranti (Golden Snakehead)",
      material: "Wild Caught",
      category: "Live Fish",
      scale: "Size M",
      badge: "Limited",
      price: 350000,
      stock: 8,
      year: 2026,
      colorPattern: "Golden Yellow",
      imageUrl: "/products/channa-auranti.jpg",
    },
    {
      name: "Crystal Red Shrimp",
      material: "Grade SSS",
      category: "Shrimp",
      scale: "Size S",
      badge: "Premium",
      price: 25000,
      stock: 50,
      year: 2026,
      colorPattern: "Red & White",
      imageUrl: "/products/crs-shrimp.jpg",
    },
    {
      name: "Aquascape CO2 Diffuser Set",
      material: "Glass",
      category: "Equipment",
      scale: "60cm",
      badge: null,
      price: 125000,
      stock: 15,
      year: 2026,
      colorPattern: "Clear Glass",
      imageUrl: "/products/co2-diffuser.jpg",
    },
    {
      name: "LED Aquarium Light 60cm",
      material: "Full Spectrum RGB",
      category: "Equipment",
      scale: "60cm",
      badge: "New",
      price: 275000,
      stock: 10,
      year: 2026,
      colorPattern: "Black",
      imageUrl: "/products/led-light.jpg",
    },
  ];

  const createdProducts = [];
  for (const productData of productsData) {
    const existing = await prisma.product.findFirst({
      where: { name: productData.name },
    });
    if (!existing) {
      const product = await prisma.product.create({ data: productData });
      createdProducts.push(product);
      console.log(`✅ Product created: ${product.name}`);
    } else {
      createdProducts.push(existing);
      console.log(`ℹ️  Product already exists: ${existing.name}`);
    }
  }

  // ========== 4. Create 10 Sample Orders ==========
  const existingOrders = await prisma.order.count();
  if (existingOrders > 0) {
    console.log(
      `ℹ️  ${existingOrders} orders already exist, skipping seed orders.`,
    );
    return;
  }

  const orderTemplates = [
    {
      userIdx: 0,
      status: "delivered",
      items: [
        { productIdx: 0, qty: 1 },
        { productIdx: 1, qty: 10 },
      ],
      daysAgo: 14,
    },
    {
      userIdx: 1,
      status: "shipped",
      items: [{ productIdx: 2, qty: 1 }],
      daysAgo: 10,
      resi: "OdayExpress-99120481",
    },
    {
      userIdx: 2,
      status: "processing",
      items: [{ productIdx: 3, qty: 3 }],
      daysAgo: 5,
    },
    {
      userIdx: 3,
      status: "pending",
      items: [
        { productIdx: 4, qty: 1 },
        { productIdx: 7, qty: 5 },
      ],
      daysAgo: 1,
    },
    {
      userIdx: 4,
      status: "delivered",
      items: [
        { productIdx: 5, qty: 2 },
        { productIdx: 8, qty: 1 },
      ],
      daysAgo: 20,
    },
    {
      userIdx: 0,
      status: "shipped",
      items: [{ productIdx: 6, qty: 1 }],
      daysAgo: 7,
      resi: "JNE-0088776655",
    },
    {
      userIdx: 1,
      status: "processing",
      items: [
        { productIdx: 9, qty: 1 },
        { productIdx: 8, qty: 1 },
      ],
      daysAgo: 3,
    },
    {
      userIdx: 2,
      status: "pending",
      items: [{ productIdx: 0, qty: 2 }],
      daysAgo: 0,
    },
    {
      userIdx: 3,
      status: "delivered",
      items: [
        { productIdx: 7, qty: 10 },
        { productIdx: 1, qty: 20 },
      ],
      daysAgo: 30,
    },
    {
      userIdx: 4,
      status: "shipped",
      items: [{ productIdx: 4, qty: 1 }],
      daysAgo: 12,
      resi: "SiCepat-7766554433",
    },
  ];

  for (let i = 0; i < orderTemplates.length; i++) {
    const tmpl = orderTemplates[i];
    const user = createdUsers[tmpl.userIdx];
    const orderDate = new Date();
    orderDate.setDate(orderDate.getDate() - tmpl.daysAgo);

    // Calculate totals
    let subtotal = 0;
    const orderItemsData = tmpl.items.map((item) => {
      const product = createdProducts[item.productIdx];
      const price = product.price * item.qty;
      subtotal += price;
      return {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: item.qty,
        variant: product.material ?? null,
      };
    });

    const shippingCost = 15000;
    const total = subtotal + shippingCost;

    const orderNumber = `ODA-${String(20260600 + i).padStart(8, "0")}`;

    await prisma.order.create({
      data: {
        orderNumber,
        userId: user.id,
        customerName: user.name,
        customerPhone: `0812${String(10000000 + i * 1111111).slice(0, 8)}`,
        customerAddress: `Jl. Aquascape No. ${i + 1}`,
        customerCity: ["Jakarta", "Bandung", "Surabaya", "Yogyakarta", "Bali"][
          i % 5
        ],
        customerPostalCode: String(10000 + i * 1000),
        subtotal,
        shippingCost,
        total,
        status: tmpl.status,
        resi: tmpl.resi ?? null,
        createdAt: orderDate,
        items: {
          create: orderItemsData,
        },
      },
    });

    console.log(
      `📦 Order created: ${orderNumber} - ${tmpl.status} - ${user.name}`,
    );
  }

  console.log("\n🎉 Seed completed successfully!");
  console.log(`   - ${createdUsers.length + 1} users (incl. admin)`);
  console.log(`   - ${createdProducts.length} products`);
  console.log(`   - ${orderTemplates.length} sample orders`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
